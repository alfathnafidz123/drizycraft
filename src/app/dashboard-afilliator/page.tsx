'use client';

import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

import errorHandler from "@/lib/errorHandler";
import { useAppSelector } from "@/lib/store";

import { Columns, Table } from "@/components/table";

import { ClickI, ResGetClickI, ResTransactionI, Transaction } from "@/interfaces/affiliate.interface";

export default function DashboardAfilliator() {
  const { token, dataUser } = useAppSelector(state => state.user);
  const [thisMonthVisit, setThisMonthVisit] = useState<ResGetClickI>();
  const [allVisit, setAllVisit] = useState(0);
  const [allEarnings, setAllEarnings] = useState(0);
  const [thisMonthEarnings, setThisMonthEarnings] = useState<ResTransactionI>();
  const [tableLoading, setTableLoading] = useState(false);
  const [tableClickLoading, setTableClickLoading] = useState(false);

  const headerEarning: Columns<Transaction>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "id",
      label: "Product",
      render: (item) => item.product.name,
    },
    {
      fieldId: "price",
      label: "Price",
      render: (item) => `$${item.price / 100}`,
    },
    {
      fieldId: "c",
      label: "Commission Rate",
      render: (item) => `${item.c}%`,
    },
    {
      fieldId: "id",
      label: "Commission",
      render: (item) => `$${(item.price * (item.c / 100)) / 100}`
    }
  ];

  const headerClick: Columns<ClickI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "id",
      label: "Visit Date",
      render: (item) => moment(item.clickDate).format('MMMM DD, YYYY'),
    },
    {
      fieldId: "id",
      label: "Link",
      render: (item) => `${process.env.NEXT_PUBLIC_SHORTLINK_URL}/${item.shortLink.shortUrl}`,
    },
    {
      fieldId: "ipAddress",
      label: "IP Address",
    },
  ];

  const getAllEarnings = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/earning/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllEarnings(res.data.sum);
    } catch (error) {
      errorHandler(error);
    }
  }

  const getThisMonthEarnings = async () => {
    try {
      setTableLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/earning/this-month`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setThisMonthEarnings(res.data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setTableLoading(false);
    }
  }

  const getAllClickCount = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SHORTLINK_URL}/afilliate/count-all-click`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllVisit(res.data.count);
    } catch (error) {
      errorHandler(error);
    }
  }

  const getMonthlyClickCount = async () => {
    try {
      setTableClickLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SHORTLINK_URL}/afilliate/count-this-month`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setThisMonthVisit(res.data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setTableClickLoading(false);
    }
  }

  useEffect(() => {
    getMonthlyClickCount();
    getAllClickCount();
    getAllEarnings();
    getThisMonthEarnings();
  }, []);

  return (
    <main>
      <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 w-ful flex flex-col">
            <div className="flex flex-col items-center justify-center gap-4 py-6">
              <p className="text-xs">Total Earnings</p>
              <p className="text-2xl font-bold">${allEarnings}</p>
            </div>
            <div className="px-4 flex flex-row justify-between items-center border-y border-gray-200 py-1">
              <p className="text-sm font-katide-semibold">Total Paid</p>
              <p>${allEarnings}</p>
            </div>
            <div className="px-4 flex flex-row justify-between items-center border-y border-gray-200 py-1">
              <p className="text-sm font-katide-semibold">Total Refunded</p>
              <p>$0</p>
            </div>
            <div className="px-4 flex flex-row justify-between items-center border-t border-gray-200 py-1">
              <p className="text-sm font-katide-semibold">Balance</p>
              <p>${allEarnings - 0}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 w-ful flex flex-col">
            <div className="flex flex-col items-center justify-center gap-4 py-6">
              <p className="text-xs">Commission rate</p>
              <p className="text-2xl font-bold">{dataUser?.affiliate.commissionRate ?? 0}%</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 py-6 border-t border-gray-200">
              <p className="text-xs">Conversion rate</p>
              <p className="text-2xl font-bold">0%</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 w-ful flex flex-col">
            <div className="flex flex-col items-center justify-center gap-4 py-6">
              <p className="text-xs">Visits</p>
              <p className="text-2xl font-bold">{allVisit}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 py-6 border-t border-gray-200">
              <p className="text-xs">Visits this month</p>
              <p className="text-2xl font-bold">{thisMonthVisit?.count.count ?? 0}</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="font-katide-semibold text-xl">This Month Commissions</div>
          <Table columns={headerEarning} data={thisMonthEarnings?.transactions} loading={tableLoading} />
        </div>
        <div className="mt-5">
          <div className="font-katide-semibold text-xl">This Month Visits</div>
          <Table columns={headerClick} data={thisMonthVisit?.count.clicks} loading={tableClickLoading} />
        </div>
      </>
    </main>
  )
}