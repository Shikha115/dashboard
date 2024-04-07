import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./screens/Authentication/Login";

import "./assets/css/app.css";
import Home from "./screens/Home";
import ProtectedRoute from "./components/protectedRoute";
import Register from "./screens/Authentication/Register";
import ForgotPassword from "./screens/Authentication/ForgotPassword";
import ManageBank from "./screens/ManageBank";
import ManageCredit from "./screens/credit_card/ManageCredit";
import AddCredit from "./screens/credit_card/AddCredit";
import ManageSaving from "./screens/saving/ManageSaving";
import AddSaving from "./screens/saving/AddSaving";
import ManageLoan from "./screens/loan/ManageLoan";
import AddLoan from "./screens/loan/AddLoan";
import Lead from "./screens/Lead";
import MutualFund from "./screens/mutual_fund/MutualFund";
import AddMutualFund from "./screens/mutual_fund/AddMutualFund";
import Demat from "./screens/demat/Demat";
import AddDemat from "./screens/demat/AddDemat";
import FixedDeposit from "./screens/fixed_deposit/FixedDeposit";
import AddFixedDeposit from "./screens/fixed_deposit/AddFixedDeposit";
import MyLeads from "./screens/MyLeads";
import Users from "./screens/Users/Users";
import AddUser from "./screens/Users/AddUser";
import ViewUser from "./screens/Users/ViewUser";
import Logout from "./screens/Authentication/Logout";
import useAuthStore from "./store/authStore";
import { useEffect, useLayoutEffect } from "react";
import useDataStore from "./store/dataStore";
import ManageCategory from "./screens/ManageCategory";
import ToastComponent from "./components/ToastComponent";
import Location from "./components/Location";
import Loader from "./components/Loader";

import RemoveAccount from "./screens/RemoveAccount";
import Notification from "./screens/Notification";
import DeleteAccount from "./screens/DeleteAccount";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import TermCondition from "./screens/TermCondition";
import Landing from "./screens/Landing";
import Dashboard from "./screens/Dashboard";
import MyOffer from "./screens/MyOffer";

function App() {
  const {
    getProfileWeb,
    loading,
    setLoading,
    defaultSidebar,
    setDefaultSidebar,
  } = useAuthStore();
  const { getAllBank, getAllCategory, category } = useDataStore();

  useEffect(() => {
    getData();
    // console.log(defaultSidebar, "defaultSidebar");
  }, []);

  useEffect(() => {
    getAllCategory(category);
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
    getAllBank();
    setLoading(false);
  };

  return (
    <>
      <ToastComponent />
      <BrowserRouter>
        <section
          className={`wrapper ${loading ? "overflow-hidden" : ""}`}
          id={defaultSidebar ? defaultSidebar : ""}
        >
          <Location />
          <Routes>
            <Route path="/" element={<Landing />} exact />
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
            <Route
              path="/privacy-policy"
              element={
                <ProtectedRoute
                  path="/privacy-policy"
                  Component={PrivacyPolicy}
                  header={false}
                />
              }
            />
            <Route
              path="/term-condition"
              element={
                <ProtectedRoute
                  path="/term-condition"
                  Component={TermCondition}
                  header={false}
                />
              }
            />
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
              path="/offer/credit-card"
              element={
                <ProtectedRoute
                  path="/offer/credit-card"
                  Component={ManageCredit}
                  header={true}
                />
              }
            />

            {category?.map((item) => {
              return (
                <Route
                  path={`/offer/${item?.type_id}`}
                  element={
                    <ProtectedRoute
                      path={`/offer/${item?.type_id}`}
                      Component={MyOffer}
                      header={true}
                    />
                  }
                />
              );
            })}

            <Route
              path="/offer/credit-card/add"
              element={
                <ProtectedRoute
                  path="/offer/credit-card/add"
                  Component={AddCredit}
                  header={true}
                />
              }
            />
            <Route
              path="/offer/saving"
              element={
                <ProtectedRoute
                  path="/offer/saving"
                  Component={ManageSaving}
                  header={true}
                />
              }
            />
            <Route
              path="/offer/saving/add"
              element={
                <ProtectedRoute
                  path="/offer/saving/add"
                  Component={AddSaving}
                  header={true}
                />
              }
            />
            <Route
              path="/offer/loan"
              element={
                <ProtectedRoute
                  path="/offer/loan"
                  Component={ManageLoan}
                  header={true}
                />
              }
            />
            <Route
              path="/offer/loan/add"
              element={
                <ProtectedRoute
                  path="/offer/loan/add"
                  Component={AddLoan}
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
              path="/offer/mutual-fund"
              element={
                <ProtectedRoute
                  path="/offer/mutual-fund"
                  Component={MutualFund}
                  header={true}
                />
              }
            />
            <Route
              path="/offer/mutual-fund/add"
              element={
                <ProtectedRoute
                  path="/offer/mutual-fund/add"
                  Component={AddMutualFund}
                  header={true}
                />
              }
            />
            <Route
              path="/offer/demat"
              element={<ProtectedRoute Component={Demat} header={true} />}
            />
            <Route
              path="/offer/demat/add"
              element={
                <ProtectedRoute
                  path="/offer/demat/add"
                  Component={AddDemat}
                  header={true}
                />
              }
            />
            <Route
              path="/offer/fixed-deposit"
              element={
                <ProtectedRoute
                  path="/offer/fixed-deposit"
                  Component={FixedDeposit}
                  header={true}
                />
              }
            />
            <Route
              path="/offer/fixed-deposit/add"
              element={
                <ProtectedRoute
                  path="/offer/fixed-deposit/add"
                  Component={AddFixedDeposit}
                  header={true}
                />
              }
            />
            <Route path="/my-leads" element={<MyLeads />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute path="/users" Component={Users} header={true} />
              }
            />
            <Route
              path="/users/add"
              element={
                <ProtectedRoute
                  path="/users/add"
                  Component={AddUser}
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
          </Routes>
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;
