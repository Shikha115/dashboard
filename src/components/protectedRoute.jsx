import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Loader from "./Loader";
import useAuthStore from "../store/authStore";

function ProtectedRoute({ Component, header, path }) {
  const navigate = useNavigate();
  const { loading } = useAuthStore();
  

  useEffect(() => {
    let token = localStorage.getItem("token");
    // localStorage.removeItem("token");
    if (!token) {
      navigate(`/login?path=${path}`);
    }
  }, []);

  if (!localStorage.getItem("token")) {
    return null;
  }
  return (
    <>
      {header && <Sidebar />}
      {header && <Navbar />}
      <div className={`${header ? "content-page" : ""}`}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Component />
            {header && <Footer />}
          </>
        )}
      </div>
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
