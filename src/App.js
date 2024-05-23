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
const Lead = React.lazy(() => import("./screens/Lead"));
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
  } = useAuthStore();
  const { getAllBank, getAllCategory, category } = useDataStore();

  useEffect(() => {
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
    getAllBank();
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
              <Route path="/" element={<Home2 />} exact />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute
                    path="/dashboard"
                    Component={Dashboard}
                    header={true}
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/delete-account" element={<RemoveAccount />} />
              <Route path="/delete-account/:id" element={<DeleteAccount />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/term-condition" element={<TermCondition />} />
              <Route
                path="/manage-bank"
                element={
                  <ProtectedRoute
                    path="/manage-bank"
                    Component={ManageBank}
                    header={true}
                  />
                }
              />
              <Route
                path="/manage-category"
                element={
                  <ProtectedRoute
                    path="/manage-category"
                    Component={ManageCategory}
                    header={true}
                  />
                }
              />
              <Route
                path="/manage-banner"
                element={
                  <ProtectedRoute
                    path="/manage-banner"
                    Component={ManageBanner}
                    header={true}
                  />
                }
              />{" "}
              <Route
                path="/manage-sponsor"
                element={
                  <ProtectedRoute
                    path="/manage-sponsor"
                    Component={ManageSponsor}
                    header={true}
                  />
                }
              />
              {category?.map((item, index) => {
                if (!item?.status) {
                  return null;
                }
                return (
                  <Route
                    key={index}
                    path={`/offer/${item?._id}`}
                    element={
                      <ProtectedRoute
                        path={`/offer/${item?._id}`}
                        Component={MyOffer}
                        header={true}
                      />
                    }
                  />
                );
              })}
              <Route path="/my-leads" element={<MyLeads />} />
              <Route
                path="/users"
                element={
                  <ProtectedRoute
                    path="/users"
                    Component={Users}
                    header={true}
                  />
                }
              />
              <Route
                path="/lead"
                element={
                  <ProtectedRoute path="/lead" Component={Lead} header={true} />
                }
              />
              <Route
                path="/users/view"
                element={
                  <ProtectedRoute
                    path="/users/view"
                    Component={ViewUser}
                    header={true}
                  />
                }
              />
              <Route
                path="/notification"
                element={
                  <ProtectedRoute
                    path="/notification"
                    Component={Notification}
                    header={true}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;
