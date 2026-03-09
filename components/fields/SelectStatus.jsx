import { chevronDown } from "@/svgs";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const statusSort = ["active", "suspended"];

const SelectStatus = (props) => {

  return (
    <Listbox value={props.selected} onChange={props.setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="w-full rounded-[6px] text-start text-sm border border-black border-opacity-10 bg-transparent px-[16px] py-4 text-black transition-colors duration-200 ease-in-out focus:border-black focus:border-opacity-10  focus:outline-none">
          <span className="block truncate">{props.selected}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            {chevronDown}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-[1000] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {statusSort.map((status, statusIdx) => (
              <Listbox.Option
                key={statusIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={status}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {status}
                    </span>
                    {/* {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null} */}
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

export default SelectStatus;
