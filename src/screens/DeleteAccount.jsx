import React, { useEffect } from "react";
import useAuthStore from "../store/authStore";
import Loader from "../components/Loader";
import axios from "axios";

function DeleteAccount() {
  const { loading, setLoading } = useAuthStore();

  useEffect(() => {
    request();
  }, []);

  const request = async () => {
    setLoading(true);
    // axios.post();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return <Loader />;
  }
}

export default DeleteAccount;
