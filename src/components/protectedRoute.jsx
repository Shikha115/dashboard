import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function ProtectedRoute({ Component, header, path }) {
  const navigate = useNavigate();

  useEffect(() => {
    getTokenAsync();
  }, []);

  const getTokenAsync = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate(`/login?path=${path}`);
    }
    if (!localStorage.getItem("token")) {
      return null;
    }
  };

  return (
    <>
      {header && <Navbar />}
      {header && <Sidebar />}
      <Component />
    </>
  );
  return (
    <div>
      {/* {header ? <Header /> : null}{" "} */}
      {/* {!lazyload ? (
        <Component />
      ) : (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Component />
        </Suspense>
      )} */}
    </div>
  );
}

export default ProtectedRoute;
