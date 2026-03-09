"use client";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";

const Filters = (props) => {
  const [selected, setSelected] = useState(props.options[0]);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(selected.value);
    }
  }, [selected, props]);

  useEffect(() => {
    if (selected.value === "show-all") {
      setSelected(props.options[0]);
    }
  }, [selected, props.options]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="relative flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left shadow-soft transition-all duration-200 hover:border-gray-300 hover:shadow-md cursor-pointer min-w-[120px]">
          <span className="block truncate text-xs font-medium text-headingText">
            {selected.label}
          </span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-auto flex-shrink-0 text-gray-400">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          enter="transition ease-out duration-150"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
        >
          <Listbox.Options className="absolute right-0 z-10 mt-1.5 w-full min-w-[160px] overflow-auto rounded-xl border border-gray-100 bg-white py-1.5 shadow-card-hover focus:outline-none">
            {props.options.map((option, id) => (
              <Listbox.Option
                key={id}
                className={({ active }) =>
                  `relative cursor-pointer select-none px-3 py-2 text-xs transition-colors duration-100 ${
                    active ? "bg-primary/[0.06] text-primaryDark" : "text-gray-600"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold text-primaryDark" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-primaryDark flex-shrink-0">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Filters;
