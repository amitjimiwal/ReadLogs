import React, { forwardRef } from "react";
interface Props {
  name: string;
  options: { id: string |number; name: string }[];
  defaultText: string;
  defaultValue: string;
}
const Select: React.FC<Props> = forwardRef(
  (
    { name, defaultText, options, defaultValue },
    ref: React.Ref<HTMLSelectElement>
  ) => {
    return (
      <div className="w-full sm:w-auto">
        <select
          id={name}
          aria-label="Default select example"
          className=" p-2 sm:p-4 border border-gray-300 rounded-lg focus:outline-none text-gray-500 bg-white"
          defaultValue="0"
          ref={ref}
        >
          <option
            value={defaultValue}
            disabled
            className="text-sm sm:text-lg"
            selected
          >
            {defaultText}
          </option>
          {options?.map((option) => (
            <option
              value={option.id}
              className="text-sm sm:text-lg hover:bg-heading"
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
