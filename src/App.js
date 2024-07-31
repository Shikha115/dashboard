import "./assets/css/app.css";
import React, { Suspense, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/authStore";
import useDataStore from "./store/dataStore";
import ToastComponent from "./components/ToastComponent";
import Location from "./components/Location";
import ProtectedRoute from "./components/protectedRoute";

const Login = React.lazy(() => import("./screens/Authentication/Login"));
const Register = React.lazy(() => import("./screens/Authentication/Register"));
const ForgotPassword = React.lazy(() =>
  import("./screens/Authentication/ForgotPassword")
);
const ManageBank = React.lazy(() => import("./screens/ManageBank"));
const Lead = React.lazy(() => import("./screens/leads/Lead"));
const Order = React.lazy(() => import("./screens/orders/Order"));
const MyLeads = React.lazy(() => import("./screens/MyLeads"));
const Users = React.lazy(() => import("./screens/Users/Users"));

const ViewUser = React.lazy(() => import("./screens/Users/ViewUser"));
const Logout = React.lazy(() => import("./screens/Authentication/Logout"));
const ManageCategory = React.lazy(() => import("./screens/ManageCategory"));
const RemoveAccount = React.lazy(() => import("./screens/RemoveAccount"));
const Notification = React.lazy(() => import("./screens/Notification"));
const DeleteAccount = React.lazy(() => import("./screens/DeleteAccount"));
const PrivacyPolicy = React.lazy(() => import("./screens/PrivacyPolicy"));
const TermCondition = React.lazy(() => import("./screens/TermCondition"));
// const Landing = React.lazy(() => import("./screens/Landing"));
const Dashboard = React.lazy(() => import("./screens/Dashboard"));
const MyOffer = React.lazy(() => import("./screens/MyOffer"));
const NotFound = React.lazy(() => import("./screens/NotFound"));
const ManageBanner = React.lazy(() => import("./screens/Banner"));
const ManageSponsor = React.lazy(() => import("./screens/sponsor/Sponsor"));
const Home2 = React.lazy(() => import("./screens/Home2"));

function App() {
  const {
    getProfileWeb,
    loading,
    setLoading,
    defaultSidebar,
    setDefaultSidebar,
    theme,
    getTheme,
  } = useAuthStore();
  const { getAllBank, getAllCategory, category } = useDataStore();

  useEffect(() => {
    getTheme();
    getData();
    // console.log(defaultSidebar, "defaultSidebar");
  }, []);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      setDefaultSidebar("condensed");
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    let tokenVal = localStorage.getItem("token");
    // return;
    if (tokenVal) {
      await getProfileWeb(tokenVal);
    }
    getAllCategory(category);
    // getAllBank();
    setLoading(false);
  };
  return (
    <>
      <ToastComponent />
      <BrowserRouter>
        <section
          className={`wrapper ${loading ? "overflow-hidden" : ""}`}
          id={`${defaultSidebar ? defaultSidebar : ""} `}
          mode={theme ? theme : ""}
        >
          <Location />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/my-leads" element={<MyLeads />} />
            </Routes>
          </Suspense>
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;
