import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import errorHandler from "@/lib/errorHandler";
import { useAppSelector } from "@/lib/store";

import PixelEventsHooks, { EventsEnum } from "@/components/pixel-custom-events";


interface ActionState { isLoading?: boolean; isSuccess?: boolean }
interface FormI { email: string }

const useCampaign = (event: string) => {
  const { token } = useAppSelector(state => state.user);
  const [stateCreate, setStateCreate] = useState<ActionState>();
  const { trackEvent } = PixelEventsHooks();
  const isLoading = stateCreate?.isLoading;
  const isSuccess = stateCreate?.isSuccess;
  const schema = yup
    .object({
      email: yup.string().email().required(),
    })
    .required();
  const defaultValues: FormI = {
    email: ''
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    control,
    reset,
  } = useForm<FormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const create = async ({ email }: FormI) => {
    try {
      setStateCreate({ isLoading: true });
      const data = {
        email,
        event,
      }
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/campaign`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      await trackEvent(EventsEnum.Lead, { campaignEmail: email, event });
      setStateCreate({ isLoading: false, isSuccess: true });
    } catch (error) {
      setStateCreate({ isLoading: false, isSuccess: false });
      errorHandler(error);
    }
  };

  const handleCreate = handleSubmit(create);

  return {
    handleCreate,
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

export default useCampaign;
