import "./assets/css/app.css";
import React, { Suspense, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/authStore";
import ToastComponent from "./components/ToastComponent";
import Location from "./components/Location";
import MyLeads from "./screens/MyLeads";
import NotFound from "./screens/NotFound";
const RemoveAccount = React.lazy(() => import("./screens/RemoveAccount"));
const DeleteAccount = React.lazy(() => import("./screens/DeleteAccount"));
const PrivacyPolicy = React.lazy(() => import("./screens/PrivacyPolicy"));
const TermCondition = React.lazy(() => import("./screens/TermCondition"));
const Home2 = React.lazy(() => import("./screens/Home2"));

function App() {
  return (
    <>
      <ToastComponent />
      <BrowserRouter>
        <Location />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/my-leads" element={<MyLeads />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/delete-account" element={<RemoveAccount />} />
            <Route path="/delete-account/:id" element={<DeleteAccount />} />
            <Route path="/term-condition" element={<TermCondition />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
