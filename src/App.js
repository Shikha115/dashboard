import "./assets/css/app.css";
import "./utils/http"; // installs the auth interceptors before any request
import React, { Suspense, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { bootstrapSession } from "./utils/http";
import useDataStore from "./store/dataStore";
import ToastComponent from "./components/ToastComponent";
import Location from "./components/Location";
import ProtectedRoute from "./components/protectedRoute";
import Profile from "./screens/Profile";

const Login = React.lazy(() => import("./screens/Authentication/Login"));
const Register = React.lazy(() => import("./screens/Authentication/Register"));
const ForgotPassword = React.lazy(() =>
  import("./screens/Authentication/ForgotPassword")
);
const ManageBank = React.lazy(() => import("./screens/ManageBank"));
const ManageTutorials = React.lazy(() =>
  import("./screens/tutorials/Tutorials")
);
const ManageObjection = React.lazy(() =>
  import("./screens/objection/Objection")
);
const ContactObjection = React.lazy(() => import("./screens/contact/Contact"));
const Lead = React.lazy(() => import("./screens/leads/Lead"));
const Order = React.lazy(() => import("./screens/orders/Order"));
const MyLeads = React.lazy(() => import("./screens/MyLeads"));
const Users = React.lazy(() => import("./screens/Users/Users"));
const AddManager = React.lazy(() => import("./screens/Manager/Manager"));

const ViewUser = React.lazy(() => import("./screens/Users/ViewUser"));
const Logout = React.lazy(() => import("./screens/Authentication/Logout"));
const ManageCategory = React.lazy(() => import("./screens/ManageCategory"));
const RemoveAccount = React.lazy(() => import("./screens/RemoveAccount"));
const Notification = React.lazy(() => import("./screens/Notification"));
const DeleteAccount = React.lazy(() => import("./screens/DeleteAccount"));
const PrivacyPolicy = React.lazy(() => import("./screens/PrivacyPolicy"));
const TermCondition = React.lazy(() => import("./screens/TermCondition"));
// const Landing = React.lazy(() => import("./screens/Landing"));
const Home2 = React.lazy(() => import("./screens/Home2"));
const Dashboard = React.lazy(() => import("./screens/Dashboard"));
const MyOffer = React.lazy(() => import("./screens/offers/MyOffer"));
const NotFound = React.lazy(() => import("./screens/NotFound"));
const ManageBanner = React.lazy(() => import("./screens/Banner"));
const ManageSponsor = React.lazy(() => import("./screens/sponsor/Sponsor"));
const RedirectToApp = React.lazy(() => import("./screens/RedirectToApp"));

function App() {
  const {
    getProfileWeb,
    loading,
    setLoading,
    defaultSidebar,
    setDefaultSidebar,
    theme,
    getTheme,
    setAuthChecked,
  } = useAuthStore();
  const { getAllCategory, category } = useDataStore();

  useEffect(() => {
    getTheme();
    getData();
  }, []);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      setDefaultSidebar("condensed");
    }
  }, []);

  const getData = async () => {
    setLoading(true);

    // Turns the httpOnly refresh cookie back into an access token, so a reload
    // keeps the session without ever storing a token in the browser.
    const restored = await bootstrapSession();
    setAuthChecked(true);

    // Both calls need a session. Firing them for a signed-out visitor only
    // produced 401s on the public pages (privacy policy, deletion link).
    if (restored) {
      await getProfileWeb();
      getAllCategory(category);
    }
    setLoading(false);
  };
  return (
    <>
      <ToastComponent />
      {/* The app is deployed under /dashboard (package.json "homepage"), with a
          separate static site at the domain root. Without the basename the
          router read the deploy path "/dashboard" as the Dashboard route, so
          the entry URL bounced to login and the landing page below was
          unreachable. PUBLIC_URL is derived from "homepage" at build time. */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <section
          className={`wrapper ${loading ? "overflow-hidden" : ""}`}
          id={`${defaultSidebar ? defaultSidebar : ""}`}
          mode={theme ? theme : ""}
        >
          <Location />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public marketing landing page, as it was before the auth
                  hardening replaced it with a redirect to /login. It only
                  posts to the public contact endpoint, so it needs no
                  session. */}
              <Route path="/" element={<Home2 />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute
                    path="/dashboard"
                    Component={Dashboard}
                    header={true}
                  />
                }
              />{" "}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    path="/profile"
                    Component={Profile}
                    header={true}
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/app" element={<RedirectToApp />} />
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
                path="/manager"
                element={
                  <ProtectedRoute Component={AddManager} header={true} />
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
                path="/manage-tutorial"
                element={
                  <ProtectedRoute
                    path="/manage-tutorial"
                    Component={ManageTutorials}
                    header={true}
                  />
                }
              />{" "}
              <Route
                path="/manage-objection"
                element={
                  <ProtectedRoute
                    path="/manage-objection"
                    Component={ManageObjection}
                    header={true}
                  />
                }
              />{" "}
              <Route
                path="/manage-contact"
                element={
                  <ProtectedRoute
                    path="/manage-contact"
                    Component={ContactObjection}
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
                path="/order"
                element={
                  <ProtectedRoute
                    path="/order"
                    Component={Order}
                    header={true}
                  />
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
