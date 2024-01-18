import React, { forwardRef, useId } from "react";
interface InputProps {
  type: string;
  label?: string;
  className?: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any;
}
const Input = forwardRef(function Input(
  { type = "text", label, className, placeholder, ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const id = useId();
  return (
    <div className="w-auto p-2 mb-3 text-left">
      {label && (
        <label className="text-[#FAF3DD] block mr-3 text-lg font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={className}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
});

export default Input;
