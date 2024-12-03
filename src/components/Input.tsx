import React, { ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form/dist/types";

import ValidationError from "./validation/error";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> &
{
  error?: FieldError;
};

const CInputInner = (
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className="w-full">
      <input
        {...props}
        ref={ref}
        className={`w-full ${props?.error ? "!border-red-400" : ""} bg-white rounded-lg`}
      />
      <ValidationError error={props?.error} />
    </div>
  );
};

const CInput = forwardRef(CInputInner) as (
  props: InputProps & { ref?: ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof CInputInner>;

export default CInput;
