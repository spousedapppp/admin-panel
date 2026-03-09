"use client";
import { closeSvg, loadingSvg, trashSvg } from "@/svgs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteUserOption,
  deleteTheUser,
} from "@/redux/slices/deleteUserSlice";
import DeleteUserButton from "../buttons/DeleteUserButton";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteUserModal = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.deleteUser.value);
  const data = useSelector((state) => state.deleteUser.data);
  const status = useSelector((state) => state.deleteUser.status);
  const router = useRouter();
  const pathname = usePathname();

  const closeModal = () => {
    dispatch(setDeleteUserOption(false));
  };

  const handleDelete = async () => {
    try {
      const result = await dispatch(deleteTheUser(data._id));
      if (result) {
        toast.success("User deleted successfully");
        window.location.reload();
        closeModal();
      }
      pathname !== "/users" && router.back();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Transition appear show={view} as={Fragment}>
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
              <Dialog.Panel className="w-[440px] transform overflow-hidden rounded-2xl bg-white p-7 text-left align-middle shadow-2xl transition-all">
                <div className="flex w-full flex-row items-center justify-end">
                  <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" onClick={closeModal}>
                    {closeSvg}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-y-5">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-red-50">
                    {trashSvg}
                  </div>
                  <div className="flex flex-col items-center gap-y-2">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold text-headingText"
                    >
                      Delete User
                    </Dialog.Title>
                    <p className="mx-10 text-center text-sm text-gray-500">
                      Are you sure you want to delete <b className="text-headingText">{data.fullName}</b>{" "}
                      permanently?
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex flex-col gap-y-5">
                    {/* buttons */}
                    <div className="flex flex-col items-center justify-between gap-y-3">
                      <button
                        onClick={closeModal}
                        className="w-[80%] rounded-xl border border-gray-200 py-2.5 font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 focus:outline-none"
                      >
                        Cancel
                      </button>
                      <DeleteUserButton
                        text={
                          status === "loading" ? (
                            <div className="flex items-center justify-center gap-2">
                              {loadingSvg}
                              Deleting...
                            </div>
                          ) : (
                            "Yes, I am Sure"
                          )
                        }
                        onClick={handleDelete}
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

export default DeleteUserModal;
