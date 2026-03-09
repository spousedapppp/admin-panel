"use client";
import { chevronDown } from "@/svgs";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

const TableDropdown = (props) => {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
   options.filter((option) => {
      if (option.value === props.selected) {
        setSelected(option);
      }
    })
    
  },[propsshow]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative flex w-full cursor-pointer flex-row items-center gap-x-3 bg-transparent px-2 py-[3px] text-left">
          <p className="block truncate text-[13px] font-semibold">
            {selected.label}
          </p>

          {chevronDown}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="border-grayBorder bg-white absolute right-0 mt-1 flex w-fit flex-col gap-y-3 overflow-auto rounded-xl border-2 px-5 py-2.5 transition-all">
            {props.options.map((option, id) => (
              <Listbox.Option
                key={id}
                className={({ active }) =>
                  `relative cursor-default select-none ${
                    active ? "text-primary" : "text-headingText"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default TableDropdown;
