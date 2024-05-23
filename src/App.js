import "./assets/css/app.css";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToastComponent from "./components/ToastComponent";
import Location from "./components/Location";
import MyLeads from "./screens/MyLeads";
import NotFound from "./screens/NotFound";

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
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
