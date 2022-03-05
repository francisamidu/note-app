import React, { ChangeEventHandler } from "react";

type CustomSelectProps = {
  className?: string;
  text: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};
const CustomSelect = (props: CustomSelectProps) => {
  const items = ["Date(ASC)", "Date(DESC)"];
  const { text, onChange, className } = props;
  return (
    <div
      className={`custom-selector flex flex-row items-center text-md ${className}`}
    >
      <span className="font-bold w-1/2 mb-1">{text}</span>
      <div className="relative flex flex-row items-center">
        <select
          className="bg-white rounded cursor-pointer capitalize w-full border-[1px] border-[#ddd] py-1 px-3 outline-none"
          onChange={onChange}
        >
          <option value="" className="placeholder-gray-500">
            Select
          </option>
          {items.map((size: any, index: number) => (
            <option
              key={index}
              value={size}
              data-value={index == 0 ? "ASC" : "DESC"}
            >
              {size}
            </option>
          ))}
        </select>
        {/* <BiChevronDown className="absolute custom-arrow right-4 text-gray-500 text-2xl" /> */}
      </div>
    </div>
  );
};

export default CustomSelect;
