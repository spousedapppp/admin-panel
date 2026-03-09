"use client";
import { closeSvg, chevronDown, loadingSvg } from "@/svgs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import EmailField from "../fields/EmailField";
import ModalButton from "../buttons/ModalButton";
import { useDispatch, useSelector } from "react-redux";
import { setEditUserOption, editUser } from "@/redux/slices/editUserSlice";
import NameField from "../fields/NameField";
import SelectStatus from "../fields/SelectStatus";
import NumberField from "../fields/NumberField";
import BooleanDropdown from "../fields/BooleanDropdown";
import PasswordFields from "../fields/PasswordFields";
import toast from "react-hot-toast";

const EditUserModal = () => {
  const dispatch = useDispatch();
  const View = useSelector((state) => state.editUser.value);
  const user = useSelector((state) => state.editUser.data);
  const status = useSelector((state) => state.editUser.status);

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [boostNumber, setBoostNumber] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [instantChats, setInstantChat] = useState(0);
  const [likes, setLikes] = useState(0);
  const [selected, setSelected] = useState("");
  const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(true);
  const [isAccountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.fullName);
      setEmail(user.email);
      setBoostNumber(user.boostCount);
      setIsPremium(user.proAccount);
      setInstantChat(user.instantChats);
      setLikes(user.likes);
      setSelected(user.accountStatus);
    }
  }, [user]);

  function closeModal() {
    dispatch(setEditUserOption(false));
  }

  const handleUpdate = async () => {
    if (!name || !email || !selected) {
      setError("All Fields are necessary");
      return;
    }

    setError("");

    const userData = {
      fullName: name,
      email: email,
      password: password,
      proAccount: isPremium,
      boostCount: boostNumber,
      instantChats: instantChats,
      likes: likes,
      accountStatus: selected,
    };

    try {
      const result = await dispatch(editUser({ userId: user._id, userData }));
      if (result) {
        toast.success("User updated successfully");
        window.location.reload();
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to update user");
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-7 text-left align-middle shadow-2xl transition-all">
                <div className="flex w-full flex-row items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-headingText"
                  >
                    Edit User
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
                    Make changes and tap Update
                  </p>
                </div>

                {error && <div className="mt-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}

                <div className="max-h-[70vh] overflow-y-auto">
                  {/* Personal Information Section */}
                  <div className="flex flex-col">
                    <div
                      className="flex cursor-pointer flex-row items-center justify-between"
                      onClick={() => setPersonalInfoOpen(!isPersonalInfoOpen)}
                    >
                      <h4 className="text-lg font-semibold">
                        Personal Information
                      </h4>
                      <div
                        className={`transform transition-transform ${isPersonalInfoOpen ? "rotate-180" : ""}`}
                      >
                        {chevronDown}
                      </div>
                    </div>
                    <Transition
                      show={isPersonalInfoOpen}
                      enter="transition-max-height ease-in-out duration-500"
                      enterFrom="max-h-0"
                      enterTo="max-h-screen"
                      leave="transition-max-height ease-in-out duration-500"
                      leaveFrom="max-h-screen"
                      leaveTo="max-h-0"
                    >
                      <div className="overflow-hidden">
                        <div className="mt-4 flex flex-col gap-y-4">
                          <div className="flex flex-col gap-y-1.5">
                            <p>Full Name</p>
                            <NameField
                              isLogin={false}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col gap-y-1">
                            <p>Email</p>
                            <EmailField
                              isLogin={false}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>

                  {/* Account Settings Section */}
                  <div className="mt-6 flex flex-col">
                    <div
                      className="flex cursor-pointer flex-row items-center justify-between"
                      onClick={() =>
                        setAccountSettingsOpen(!isAccountSettingsOpen)
                      }
                    >
                      <h4 className="text-lg font-semibold">
                        Account Settings
                      </h4>
                      <div
                        className={`transform transition-transform ${isAccountSettingsOpen ? "rotate-180" : ""}`}
                      >
                        {chevronDown}
                      </div>
                    </div>
                    <Transition
                      show={isAccountSettingsOpen}
                      enter="transition-max-height ease-in-out duration-500"
                      enterFrom="max-h-0"
                      enterTo="max-h-screen"
                      leave="transition-max-height ease-in-out duration-500"
                      leaveFrom="max-h-screen"
                      leaveTo="max-h-0"
                    >
                      <div className="overflow-hidden">
                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="flex flex-col gap-y-1">
                            <p>Account Status</p>
                            <SelectStatus
                              selected={selected}
                              setSelected={setSelected}
                            />
                          </div>
                          <div className="flex flex-col gap-y-1">
                            <p>Boosts</p>
                            <NumberField
                              value={boostNumber}
                              onChange={(e) => setBoostNumber(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col gap-y-1">
                            <p>Premium</p>
                            <BooleanDropdown
                              isPremium={isPremium}
                              setIsPremium={setIsPremium}
                            />
                          </div>
                          <div className="flex flex-col gap-y-1">
                            <p>Instant Chats</p>
                            <NumberField
                              value={instantChats}
                              onChange={(e) => setInstantChat(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col gap-y-1">
                            <p>Likes</p>
                            <NumberField
                              value={likes}
                              onChange={(e) => setLikes(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>

                  {/* Not Recommended Section */}
                  <div className="mt-6 flex flex-col">
                    <h4 className="text-lg font-semibold">Not Recommended</h4>
                    <div className="mt-4 flex flex-col gap-y-1">
                      <p>Password</p>
                      <PasswordFields
                        isLogin={false}
                        value={password}
                        placeHolder={
                          "Enter New Password or Leave Empty for Default"
                        }
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-row items-center justify-between gap-x-3">
                  <button
                    onClick={closeModal}
                    className="w-[48%] rounded-xl border border-gray-200 py-2.5 font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
                  >
                    Discard
                  </button>
                  <ModalButton
                    isDisabled={status === "loading"}
                    text={
                      status === "loading" ? (
                        <div className="flex items-center justify-center gap-2">
                          {loadingSvg}
                          Updating...
                        </div>
                      ) : (
                        "Update"
                      )
                    }
                    onClick={handleUpdate}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditUserModal;
