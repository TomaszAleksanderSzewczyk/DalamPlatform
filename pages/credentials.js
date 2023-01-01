import React from "react";
import UserCredencialsForm from "../components/userCredencialsForm/userCredencialsForm";
import useUserData from "../hooks/useUser";

const Credentials = () => {
  const { userData, update } = useUserData();
  if (!userData) {
    return "Loading...";
  }
  return <UserCredencialsForm properties={userData} update={update} />;
};

export default Credentials;
