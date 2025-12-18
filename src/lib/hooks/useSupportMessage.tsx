import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import errorHandler from "@/lib/errorHandler";

interface ActionState { isLoading?: boolean; isSuccess?: boolean }
interface FormI {
  email: string;
  name: string;
  subject: string;
  message: string;
  token?: string; // 🟢 tambahkan token di tipe data
}

const useSupportMessage = () => {
  const [stateCreate, setStateCreate] = useState<ActionState>();
  const isLoading = stateCreate?.isLoading;
  const isSuccess = stateCreate?.isSuccess;

  const schema = yup
    .object({
      email: yup.string().email().required(),
      name: yup.string().required(),
      subject: yup.string().required(),
      message: yup.string().required(),
    })
    .required();

  const defaultValues: FormI = {
    email: "",
    name: "",
    subject: "",
    message: "",
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm<FormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  // 🟢 ubah agar create menerima token secara manual
  const create = async (data: FormI, token?: string) => {
    try {
      setStateCreate({ isLoading: true });
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/support`, {
        ...data,
        token, // kirim token ke backend
      });
      setStateCreate({ isLoading: false, isSuccess: true });
      toast.info("Message sent!");
      reset({});
    } catch (error) {
      errorHandler(error);
      setStateCreate({ isLoading: false, isSuccess: false });
    }
  };

  // 🟢 expose handleCreate agar bisa menerima token dari luar
  const handleCreate = (data: FormI, token?: string) => create(data, token);

  return {
    handleCreate,
    isLoading,
    register,
    errors,
    control,
    isSuccess,
    reset,
  };
};

export default useSupportMessage;
