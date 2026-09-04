import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Loader from "./Loader";
import Login from "../screens/Authentication/Login";
import useAuthStore from "../store/authStore";
import { isAuthenticated, onAuthChange } from "../utils/session";

function ProtectedRoute({ Component, header, path }) {
  const { loading, authChecked } = useAuthStore();

  // The access token lives in a module variable, not in React state, so
  // subscribe to it or this component never learns that a login succeeded.
  const [authed, setAuthed] = useState(isAuthenticated());
  useEffect(() => onAuthChange(setAuthed), []);

  if (!authChecked) {
    // Wait for the boot-time refresh before deciding: on a page reload the
    // access token is briefly absent even though the session may be valid.
    return <Loader />;
  }

  // Signed out: render the login screen at the current URL rather than
  // redirecting to /login. Redirecting rewrote the address bar on every
  // reload, so a bookmarked or shared deep link decayed into the login URL and
  // the page the user actually wanted was lost. Logging in flips `authed` and
  // this same route renders its real component, with the URL untouched.
  if (!authed) {
    return <Login inline />;
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
}

export default ProtectedRoute;
