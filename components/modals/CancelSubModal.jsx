"use client";
import { closeSvg, trashSvg } from "@/svgs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteUserButton from "../buttons/DeleteUserButton";
import { setCancelSubOption } from "@/redux/slices/cancelSubSlice";

const CancelSubModal = () => {
  const dispatch = useDispatch();
  const View = useSelector((state) => state.cancelSub.value);
  const data = useSelector((state) => state.cancelSub.data);

  function closeModal() {
    dispatch(setCancelSubOption(false));
  }

  return (
    <Transition appear show={View} as={Fragment}>
      <Dialog as="div" className="relative z-[40000]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[459px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex w-full flex-row items-center justify-end">
                  <div className="cursor-pointer p-1" onClick={closeModal}>
                    {closeSvg}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-y-[22px]">
                  <div className="flex h-[129px] w-[129px] items-center justify-center rounded-[16px] bg-deletecolor">
                    {trashSvg}
                  </div>
                  <div className="flex flex-col items-center gap-y-[9px]">
                    <Dialog.Title
                      as="h3"
                      className="text-[28px] font-semibold text-headingText"
                    >
                      Cancel Subscription
                    </Dialog.Title>
                    <p className="mx-14 text-center">
                      Are you sure you want to remove <b>{data.name}”</b>{" "}
                      Subscription?
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="flex flex-col gap-y-[26px]">
                    {/* buttons */}
                    <div className="flex flex-col items-center justify-between gap-y-4">
                      <button
                        onClick={closeModal}
                        className="w-[80%] rounded-[5px] border border-black border-opacity-10 py-[10px] font-medium focus:outline-none"
                      >
                        Cancel
                      </button>
                      <DeleteUserButton
                        text="Yes, I am Sure"
                        onClick={closeModal}
                      />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CancelSubModal;
