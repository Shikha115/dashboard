import { useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Loader from "./Loader";

function Location() {
  const { loading, setLoading } = useAuthStore();
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname, "location");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [location.pathname]);
  return loading && <Loader />;
}

export default Location;
