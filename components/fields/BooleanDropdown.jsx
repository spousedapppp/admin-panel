import React from "react";

const BooleanDropdown = ({ isPremium, setIsPremium }) => {
  const handleChange = (event) => {
    const value = event.target.value === "true"; // Convert string to boolean
    setIsPremium(value);
  };

  return (
    <select
      className="rounded-[6px] border bg-transparent px-[16px] py-4 text-sm"
      value={isPremium}
      onChange={handleChange}
      required
    >
      <option value="">Select</option>
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  );
};

export default BooleanDropdown;
