import React from "react";

const NumberField = ({ value, onChange }) => {
  return (
    <input
      type="number"
      className="rounded-[6px] border bg-transparent px-[16px] py-4 text-sm"
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default NumberField;
