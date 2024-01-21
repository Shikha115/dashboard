import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ Component, header, lazyload }) {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  
  if (!localStorage.getItem("token")) {
    return null;
  }
  return <Component />;
  return (
    <div>
      {/* {header ? <Header /> : null}{" "} */}
      {!lazyload ? (
        <Component />
      ) : (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Component />
        </Suspense>
      )}
    </div>
  );
}

export default ProtectedRoute;
