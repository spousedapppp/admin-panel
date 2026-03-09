"use client";
import { closeSvg } from "@/svgs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import ModalButton from "../buttons/ModalButton";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationOption } from "@/redux/slices/notificationSlice";
import TextField from "../fields/TextField";
import TextArea from "../fields/TextArea";
import { sendNotification } from "@/api/api";
import toast from "react-hot-toast";

const NotificationModal = () => {
  const dispatch = useDispatch();
  const View = useSelector((state) => state.notification.value);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  function closeModal() {
    dispatch(setNotificationOption(false));
    setTitle("");
    setContent("");
  }

  const handleSend = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    setLoading(true);
    try {
      const res = await sendNotification({ title: title.trim(), content: content.trim() });
      toast.success(res.message || "Notification sent successfully");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
  };

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
              <Dialog.Panel className="w-[459px] transform overflow-hidden rounded-2xl bg-white p-7 text-left align-middle shadow-2xl transition-all">
                <div className="flex w-full flex-row items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-headingText"
                  >
                    Send Notification
                  </Dialog.Title>
                  <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" onClick={closeModal}>
                    {closeSvg}
                  </div>
                </div>
                <div className="mt-1.5">
                  <p className="text-sm text-gray-500">
                    Send a notification to all users
                  </p>
                </div>

                <div className="mt-5">
                  <div className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-1.5">
                      <p className="text-sm font-medium text-gray-500">Title</p>
                      <TextField
                        placeholder="Enter title"
                        isLogin={false}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-y-1.5">
                      <p className="text-sm font-medium text-gray-500">Content</p>
                      <TextArea
                        placeholder="Write your notification content here"
                        isLogin={false}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>

                    {/* buttons */}
                    <div className="flex flex-row items-center justify-between gap-x-3">
                      <button
                        onClick={handleClear}
                        disabled={loading}
                        className="w-[48%] rounded-xl border border-gray-200 py-2.5 font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50"
                      >
                        Clear
                      </button>
                      <ModalButton
                        text={loading ? "Sending..." : "Send"}
                        onClick={handleSend}
                        disabled={loading}
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

export default NotificationModal;
