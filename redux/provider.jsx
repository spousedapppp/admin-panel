"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import Main from "@/components/layout/Main";
import NewUserModal from "@/components/modals/NewUserModal";
import DeleteUserModal from "@/components/modals/DeleteUserModal";
import EditUserModal from "@/components/modals/EditUserModal";
import CancelSubModal from "@/components/modals/CancelSubModal";
import SidebarModal from "@/components/modals/SidebarModal";
import NotificationModal from "@/components/modals/NotificationModal";
import ViewUserModal from "@/components/modals/ViewUserModal";
import { getToken } from "./slices/userSlice";
import { fetchData as fetchLoggedInUser } from "./slices/loggedInUser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AppShell = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUser());
  }, [dispatch]);

  return (
    <>
      <NewUserModal />
      <DeleteUserModal />
      <EditUserModal />
      <CancelSubModal />
      <SidebarModal />
      <NotificationModal />
      <ViewUserModal />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1a1a2e",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          },
          success: {
            iconTheme: { primary: "#FFCC21", secondary: "#1a1a2e" },
          },
          error: {
            iconTheme: { primary: "#EF4444", secondary: "#1a1a2e" },
          },
        }}
      />

      <div className="relative flex h-screen w-full flex-row overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <div className="bg-primaryBackground flex-1 overflow-y-auto overflow-x-hidden">
            <Main>{children}</Main>
          </div>
        </div>
      </div>
    </>
  );
};

const Providers = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    const token = getToken();

    if (
      token == undefined &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/forgot-password" &&
      pathname !== "/reset-password" &&
      pathname !== "/verify-account"
    ) {
      window.location.href = "/login";
    }

    if (
      token &&
      (pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/forgot-password" ||
        pathname === "/reset-password" ||
        pathname === "/verify-account")
    ) {
      window.location.href = "/";
    }
  }, []);

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/verify-account"
  ) {
    return (
      <Provider store={store}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1a1a2e",
              color: "#fff",
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            },
            success: {
              iconTheme: { primary: "#FFCC21", secondary: "#1a1a2e" },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#1a1a2e" },
            },
          }}
        />
        <div className="relative flex w-full flex-col">
          <main className="w-full">{children}</main>
        </div>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <AppShell>{children}</AppShell>
      </Provider>
    );
  }
};

export default Providers;
