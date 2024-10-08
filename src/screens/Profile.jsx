import React, { useEffect, useState } from "react";
import AddManager from "./Manager/AddManager";
import useToastStore from "../store/toastStore";
import useAuthStore from "../store/authStore";
import { apis } from "../utils/URL";
import axios from "axios";
import { INITIAL_DATA } from "../utils/extraData";

const Profile = () => {
  const { setToastData } = useToastStore();
  const { profile } = useAuthStore();
  const [addModal, setAddModal] = useState({ type: "", state: false });
  const [managerDetails, setManagerDetails] = useState(INITIAL_DATA);
  const [webusers, setWebUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setManagerDetails(profile);
  }, []);

  return (
    <div>
      <h1>My Profile</h1>

   
    </div>
  );
};

export default Profile;
