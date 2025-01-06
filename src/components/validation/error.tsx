'use client';

import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface ValidationErrorProps {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const ValidationError = ({ error }: ValidationErrorProps) => {
  return error ? (
    <div className="text-red-400 italic text-sm text-right">
      {error?.message?.toString()}
    </div>
  ) : null;
};

export default ValidationError;
