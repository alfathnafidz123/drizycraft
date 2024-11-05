import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const errorHandler = (error: unknown) => {
  const err = error as AxiosError;
  const errorData: any = err.response?.data;
  const messageType = typeof errorData.message;
  if (messageType === 'object') {
    errorData.message.forEach((item: any) => {
      toast.error(item);
    });
  }
  if (messageType === 'string') {
    toast.error((errorData.message as string) ?? 'Unknown error');
  }
};

export default errorHandler;
