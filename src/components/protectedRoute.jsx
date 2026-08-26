import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Loader from "./Loader";
import useAuthStore from "../store/authStore";
import { isAuthenticated } from "../utils/session";

function ProtectedRoute({ Component, header, path }) {
  const navigate = useNavigate();
  const { loading, authChecked } = useAuthStore();

  useEffect(() => {
    // Wait for the boot-time refresh before deciding: on a page reload the
    // access token is briefly absent even though the session is valid.
    if (authChecked && !isAuthenticated()) {
      navigate(`/login`);
    }
  }, [authChecked, navigate]);

  if (!authChecked) {
    return <Loader />;
  }

  if (!isAuthenticated()) {
    return null;
  }
  return (
    <>
      {header && <Sidebar />}
      {header && <Navbar />}
      <div className={`${header && "content-page"}`}>
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
