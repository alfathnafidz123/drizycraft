'use client';
import { IoPencil } from "@react-icons/all-files/io5/IoPencil";
import { IoTrash } from "@react-icons/all-files/io5/IoTrash";
import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

import errorHandler from "@/lib/errorHandler";
import { useAppSelector } from "@/lib/store";

import UpsertCouponModal from "@/components/affiliator/create.modal";
import Button from "@/components/buttons/Button";
import { Columns, Table } from "@/components/table";
import Pagination from "@/components/table/pagination";

import { CouponI, GetCouponResI } from "@/interfaces/coupon.interface";
import { PagingI } from "@/interfaces/paging.interfaces";

export default function CouponPage() {
  const [params, setParams] = useState<PagingI>({
    page: 1,
    limit: 10,
  });
  const [showCreate, setShowCreate] = useState<{ show: boolean; data?: CouponI }>({ show: false });
  const { token } = useAppSelector(state => state.user);
  const [data, setData] = useState<GetCouponResI>();
  const [isLoading, setIsloading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const header: Columns<CouponI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "name",
      label: "Coupon Name",
    },
    { fieldId: "code", label: "Code" },
    { fieldId: "status", label: "Status" },
    { fieldId: "code", label: "Discount", render: (item) => `${item.percentage}%` },
    { fieldId: "expiredAt", label: "Expired Date", render: (item) => moment(item.expiredAt).format("MMMM DD, YYYY") },
    {
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <div className="flex flex-row justify-center gap-2">
          <Button
            isLoading={deleteLoading}
            variant="outline"
            onClick={() => {
              setShowCreate({ show: true, data })
            }}
            leftIcon={IoPencil}
          >
            Edit
          </Button>
          <Button
            isLoading={deleteLoading}
            color="error"
            onClick={() => handleDelete(data.id)}
            leftIcon={IoTrash}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      setDeleteLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/my/coupon/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      refetch();
    } catch (error) {
      errorHandler(error);
    } finally {
      setDeleteLoading(false);
    }
  }

  const refetch = () => {
    setParams(prev => ({ ...prev, page: 1 }));
    getMyCoupons();
  }

  const getMyCoupons = useCallback(async () => {
    try {
      setIsloading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/my/coupon`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(res.data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsloading(false);
    }
  }, [params, token]);

  useEffect(() => {
    getMyCoupons();
  }, [params.page, params.limit, token, getMyCoupons]);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg lg:text-2xl text-[#262626] font-semibold">
          Coupon Management
        </h3>
        <button
          onClick={() => setShowCreate({ show: true })}
          className="bg-[#61A9FA] hover:bg-[#61A9FA]/90 px-3 py-1 rounded-lg text-white"
        >
          Create Coupon
        </button>
      </div>
      <Table
        data={data?.coupons}
        columns={header}
        loading={isLoading}
      />
      <Pagination
        currentPage={params.page}
        totalPages={Math.ceil((data?.meta.total ?? 0) / params.limit)}
        onPageChange={(page) => {
          setParams((prev) => ({ ...prev, page }));
        }}
      />
      <UpsertCouponModal
        open={showCreate.show}
        handleClose={(needRefetch) => {
          setShowCreate({ show: false });
          if (needRefetch) {
            refetch();
          }
        }}
        data={showCreate.data}
      />
    </>
  )
}