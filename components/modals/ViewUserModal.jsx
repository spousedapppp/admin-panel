"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setViewUserOption } from "@/redux/slices/viewUserSlice";
import { getUser } from "@/api/api";
import Image from "next/image";
import moment from "moment";

const ViewUserModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.viewUser.value);
  const userData = useSelector((state) => state.viewUser.data);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userData?._id) {
      setLoading(true);
      getUser(userData._id)
        .then((res) => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }
  }, [isOpen, userData?._id]);

  const close = () => {
    dispatch(setViewUserOption(false));
    setUser(null);
  };

  const childrenTag =
    user?.children === "Yes"
      ? "Want Children"
      : user?.children === "No"
        ? "No Children"
        : user?.children === "Maybe"
          ? "Maybe Want Children"
          : null;

  const aboutTags = [user?.education, user?.starSign, user?.maritalStatus, childrenTag].filter(Boolean);

  const religiosityTags = user
    ? [
        user.religion,
        user.smoking === "No" ? "Non Smoker" : user.smoking ? "Smoker" : null,
        user.drink === "No" ? "Doesn't Drink" : user.drink ? "Drinks" : null,
      ].filter(Boolean)
    : [];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[50000]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white shadow-2xl transition-all max-h-[90vh] overflow-hidden flex flex-col">
                {loading ? (
                  <ModalSkeleton />
                ) : user ? (
                  <>
                    {/* Header */}
                    <div className="relative flex-shrink-0">
                      <div className="h-28 bg-gradient-to-r from-sidebarBackground via-gray-900 to-sidebarBackground" />
                      <button
                        onClick={close}
                        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <div className="absolute -bottom-12 left-6">
                        <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden shadow-lg bg-gray-100">
                          <Image
                            src={user.photos?.[0] || "/profile.png"}
                            alt={user.fullName}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="px-6 pt-16 pb-2 flex-shrink-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-headingText">{user.fullName}</h2>
                          <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {user.profession && (
                            <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                              {user.profession}
                            </span>
                          )}
                          <span
                            className={`rounded-lg px-3 py-1 text-xs font-medium ${
                              user.proAccount
                                ? "bg-primary/10 text-primaryDark border border-primary/20"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {user.proAccount ? "Upgraded" : "Free"}
                          </span>
                          <span
                            className={`rounded-lg px-3 py-1 text-xs font-medium capitalize ${
                              user.accountStatus?.toLowerCase() === "active"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                : user.accountStatus?.toLowerCase() === "suspended"
                                  ? "bg-red-50 text-red-500 border border-red-200"
                                  : "bg-amber-50 text-amber-600 border border-amber-200"
                            }`}
                          >
                            {user.accountStatus}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Joined {moment(user.createdAt).format("MMM D, YYYY")} ({moment(user.createdAt).fromNow()})
                      </p>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-6 pb-6 pt-3 space-y-4">
                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {user.Age && (
                          <StatCard label="Age" value={`${user.Age} yrs`} />
                        )}
                        {user.height && (
                          <StatCard label="Height" value={`${user.height.ft} ft (${user.height.cm} cm)`} />
                        )}
                        {user.location && (
                          <StatCard label="Location" value={user.location} />
                        )}
                        {user.ethnicGroup && (
                          <StatCard label="Ethnicity" value={user.ethnicGroup} />
                        )}
                      </div>

                      {/* Biography */}
                      {user.biography && (
                        <Section title="Biography">
                          <p className="text-sm leading-relaxed text-gray-500">{user.biography}</p>
                        </Section>
                      )}

                      {/* About Me */}
                      {aboutTags.length > 0 && (
                        <Section title="About">
                          <div className="flex flex-wrap gap-2">
                            {aboutTags.map((tag, i) => (
                              <Tag key={i}>{tag}</Tag>
                            ))}
                          </div>
                        </Section>
                      )}

                      {/* Religiosity */}
                      {religiosityTags.length > 0 && (
                        <Section title="Lifestyle">
                          <div className="flex flex-wrap gap-2">
                            {religiosityTags.map((tag, i) => (
                              <Tag key={i}>{tag}</Tag>
                            ))}
                          </div>
                        </Section>
                      )}

                      {/* Interests */}
                      {user.interests && Object.keys(user.interests).length > 0 && (
                        <Section title="Interests">
                          {Object.entries(user.interests).map(([category, items]) =>
                            items.length > 0 ? (
                              <div key={category} className="mb-3 last:mb-0">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                  {category.replace(/([a-z])([A-Z])/g, "$1 $2")}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {items.map((item, i) => (
                                    <span
                                      key={i}
                                      className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-amber-700 border border-primary/20"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : null
                          )}
                        </Section>
                      )}

                      {/* Personality */}
                      {user.personalityTraits?.length > 0 && (
                        <Section title="Personality Traits">
                          <div className="flex flex-wrap gap-2">
                            {user.personalityTraits.map((trait, i) => (
                              <span
                                key={i}
                                className="rounded-lg bg-violet-50 border border-violet-100 px-3 py-1.5 text-xs font-medium text-violet-600"
                              >
                                {trait}
                              </span>
                            ))}
                          </div>
                        </Section>
                      )}

                      {/* Gallery */}
                      {user.photos?.filter(Boolean).length > 0 && (
                        <Section title="Photos">
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {user.photos.filter(Boolean).map((photo, i) => (
                              <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                                <Image
                                  src={photo}
                                  alt={`Photo ${i + 1}`}
                                  fill
                                  className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                            ))}
                          </div>
                        </Section>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="p-10 text-center text-gray-400">Failed to load user data</div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Section = ({ title, children }) => (
  <div className="rounded-xl bg-gray-50/70 border border-gray-100 p-4">
    <p className="text-sm font-semibold text-headingText mb-3">{title}</p>
    {children}
  </div>
);

const Tag = ({ children }) => (
  <span className="rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
    {children}
  </span>
);

const StatCard = ({ label, value }) => (
  <div className="rounded-xl bg-gray-50/70 border border-gray-100 p-3 text-center">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">{label}</p>
    <p className="text-sm font-semibold text-headingText truncate">{value}</p>
  </div>
);

const ModalSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-28 bg-gray-200" />
    <div className="px-6 pt-16 pb-4">
      <div className="h-6 w-40 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-56 bg-gray-100 rounded" />
    </div>
    <div className="px-6 pb-6 space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl" />
        ))}
      </div>
      <div className="h-24 bg-gray-100 rounded-xl" />
      <div className="h-20 bg-gray-100 rounded-xl" />
    </div>
  </div>
);

export default ViewUserModal;
