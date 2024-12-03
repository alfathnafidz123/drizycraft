'use client';

import { IoClose } from "@react-icons/all-files/io5/IoClose";
import moment from "moment";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import useCouponUpsert from "@/lib/hooks/useCouponUpsert";

import Button from "@/components/buttons/Button";
import CInput from "@/components/Input";
import ValidationError from "@/components/validation/error";

import { CouponI } from "@/interfaces/coupon.interface";

const UpsertCouponModal = ({
  open,
  handleClose,
  data,
}: {
  open: boolean;
  handleClose: (refetch?: boolean) => void;
  data?: CouponI;
}) => {
  const { handleCreate, handleUpdate, errors, register, control, isLoading, isSuccess, reset } =
    useCouponUpsert(data?.id);

  useEffect(() => {
    if (isSuccess) {
      handleClose(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        code: data.code,
        expiredAt: moment(data.expiredAt).format("YYYY-MM-DD"),
        percentage: data.percentage,
      });
    }
  }, [data?.id]);

  return (
    <>
      {open && (
        <div
          onClick={() => handleClose(false)}
          className='fixed left-0 top-0 z-20 h-full w-full bg-black bg-opacity-50'
        ></div>
      )}
      {open &&
        <div className='fixed top-0 z-50 transform overflow-hidden w-1/2 rounded-xl bg-white shadow-lg max-md:flex max-md:h-screen max-md:w-full max-md:items-center max-md:justify-center max-md:overflow-y-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 p-2'>
          <div className="flex flex-row justify-between text-xl font-katide-semibold">
            {data ? "Update Coupon" : "Create New Coupon"}
            <IoClose onClick={() => handleClose()} />
          </div>
          <div className="overflow-scroll">
            <form
              className="p-2 flex flex-col gap-4"
              onSubmit={data ? handleUpdate : handleCreate}
            >
              <div>
                <label
                  htmlFor="merchantID"
                  className="font-semibold text-[#262626]"
                >
                  Coupon Name
                </label>
                <CInput
                  {...register("name")}
                  type="text"
                />
                <ValidationError error={errors.name} />
              </div>
              <div>
                <label
                  htmlFor="merchant"
                  className="font-semibold text-[#262626]"
                >
                  Coupon Code
                </label>
                <Controller control={control} name="code" render={({ field: { onChange, value } }) =>
                  <CInput value={value} onChange={(e) => onChange(e.target.value.toUpperCase())} />
                } />
                <ValidationError error={errors.code} />
              </div>
              <div>
                <label
                  htmlFor="merchant"
                  className="font-semibold text-[#262626]"
                >
                  Percentage
                </label>
                <CInput type="number" {...register("percentage")} />
                <ValidationError error={errors.percentage} />
              </div>
              <div>
                <label
                  htmlFor="merchant"
                  className="font-semibold text-[#262626]"
                >
                  Expired At
                </label>
                <CInput type="date" {...register("expiredAt")} />
                <ValidationError error={errors.expiredAt} />
              </div>
              <div className="w-full flex flex-row justify-end gap-4 col-span-5 mt-10">
                <Button
                  type="reset"
                  variant="outline"
                  isLoading={isLoading}
                  // className="border-red-300 border px-3 py-1 rounded-lg text-red-400"
                  onClick={() => handleClose()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                // className="bg-[#61A9FA] hover:bg-[#61A9FA]/90 px-3 py-1 rounded-lg text-white"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default UpsertCouponModal;
