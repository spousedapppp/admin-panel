"use client";
import { closeSvg, loadingSvg } from "@/svgs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import EmailField from "../fields/EmailField";
import PasswordFields from "../fields/PasswordFields";
import ModalButton from "../buttons/ModalButton";
import NumberField from "../fields/NumberField";
import BooleanDropdown from "../fields/BooleanDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setNewUserOption, addUser } from "@/redux/slices/newUserSlice";
import TextField from "../fields/TextField";
import toast from "react-hot-toast";

const NewUserModal = () => {
  const dispatch = useDispatch();
  const View = useSelector((state) => state.newUser.value);
  const status = useSelector((state) => state.newUser.status);
  // const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [boostNumber, setBoostNumber] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [instantChats, setInstantChat] = useState(0);
  const [likes, setLikes] = useState(0);

  const [validationError, setValidationError] = useState("");

  function closeModal() {
    dispatch(setNewUserOption(false));
  }

  const cleaner = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setBoostNumber(0);
    setIsPremium(false);
    setInstantChat(0);
    setLikes(0);
  };

  const handleAddUser = async () => {
    if (!fullName || !email || !password) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    const newUser = {
      fullName,
      email,
      password,
      boostCount: boostNumber,
      proAccount: isPremium,
      instantChats,
      likes,
    };

    try {
      const result = await dispatch(addUser(newUser)).unwrap();
      if (result) {
        toast.success("User added successfully");
        window.location.reload();
        closeModal();
        cleaner();
      }
    } catch (error) {
      toast.error(error?.error || "Failed to add user");
    }
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
              <Dialog.Panel className="max-h-[90vh] w-[459px] transform overflow-y-auto rounded-2xl bg-white p-7 text-left align-middle shadow-2xl transition-all">
                <div className="flex w-full flex-row items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-headingText"
                  >
                    Add User
                  </Dialog.Title>
                  <div
                    className="cursor-pointer rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100"
                    onClick={closeModal}
                  >
                    {closeSvg}
                  </div>
                </div>
                <div className="mt-1.5">
                  <p className="text-sm text-gray-500">
                    Fill in user details and tap Add. User can change password after login.
                  </p>
                </div>

                <div className="mt-5">
                  <div className="flex flex-col gap-y-4">
                    {validationError && (
                      <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{validationError}</div>
                    )}

                    <div className="flex flex-col gap-y-1.5">
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <TextField
                        isLogin={false}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={"Full Name"}
                      />
                    </div>

                    <div className="flex flex-col gap-y-1">
                      <p>Email</p>
                      <EmailField
                        isLogin={false}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-y-1">
                      <p>Password</p>
                      <PasswordFields
                        isLogin={false}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col gap-y-1">
                        <p>Boosts Number</p>
                        <NumberField
                          value={boostNumber}
                          onChange={(e) =>
                            setBoostNumber(
                              Number(e.target.value) > 0 ? e.target.value : 0,
                            )
                          }
                        />
                      </div>

                      <div className="flex flex-col gap-y-1">
                        <p>Premium Account</p>
                        <BooleanDropdown
                          value={isPremium}
                          setIsPremium={setIsPremium}
                        />
                      </div>

                      <div className="flex flex-col gap-y-1">
                        <p>Instant Chats</p>
                        <NumberField
                          value={instantChats}
                          onChange={(e) =>
                            setInstantChat(
                              Number(e.target.value) > 0 ? e.target.value : 0,
                            )
                          }
                        />
                      </div>

                      <div className="flex flex-col gap-y-1">
                        <p>Likes</p>
                        <NumberField
                          value={likes}
                          onChange={(e) =>
                            setLikes(
                              Number(e.target.value) > 0 ? e.target.value : 0,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* buttons */}
                  <div className="mt-6 flex flex-row items-center justify-between gap-x-3">
                    <button
                      onClick={closeModal}
                      className="w-[48%] rounded-xl border border-gray-200 py-2.5 font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
                    >
                      Discard
                    </button>
                    <ModalButton
                      onClick={handleAddUser}
                      isDisabled={status === "loading"}
                      text={
                        status === "loading" ? (
                          <div className="flex items-center justify-center gap-2">
                            {loadingSvg}
                            Adding...
                          </div>
                        ) : (
                          "Add"
                        )
                      }
                    ></ModalButton>
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

export default NewUserModal;
