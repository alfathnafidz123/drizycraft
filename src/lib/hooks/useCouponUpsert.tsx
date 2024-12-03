import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import errorHandler from "@/lib/errorHandler";
import { useAppSelector } from "@/lib/store";

import { CouponPayloadI } from "@/interfaces/coupon.interface";

interface ActionState { isLoading?: boolean; isSuccess?: boolean }

const useCouponUpsert = (id?: string) => {
  const { token } = useAppSelector(state => state.user);
  const [stateCreate, setStateCreate] = useState<ActionState>();
  const [stateUpdate, setStateUpdate] = useState<ActionState>();
  const isLoading = stateCreate?.isLoading || stateUpdate?.isLoading;
  const isSuccess = stateCreate?.isSuccess || stateUpdate?.isSuccess;
  const schema = yup
    .object({
      name: yup.string().required(),
      code: yup.string().matches(/^\S+$/, 'Space not allowed').required(),
      percentage: yup.number().required().min(0).max(100),
      expiredAt: yup.date().required(),
    })
    .required();
  const defaultValues: CouponPayloadI = {
    name: "",
    code: "",
    percentage: 0,
    expiredAt: new Date(),
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    control,
    reset,
  } = useForm<CouponPayloadI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const create = async (data: CouponPayloadI) => {
    try {
      setStateCreate({ isLoading: true });
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/my/coupon`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setStateCreate({ isLoading: false, isSuccess: true });
    } catch (error) {
      errorHandler(error);
    }
  };

  const update = async (data: CouponPayloadI) => {
    try {
      setStateUpdate({ isLoading: true });
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/my/coupon/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setStateUpdate({ isLoading: false, isSuccess: true });
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleCreate = handleSubmit(create);
  const handleUpdate = handleSubmit(update);

  return {
    handleCreate,
    handleUpdate,
    isLoading,
    register,
    errors,
    watch,
    defaultValues,
    control,
    isSuccess,
    reset,
  };
};

export default useCouponUpsert;
