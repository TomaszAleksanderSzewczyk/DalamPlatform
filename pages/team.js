import React from "react";
import CreateTeamForm from "../components/teamForm/TeamForm";
import TeamFormEdit from "../components/teamForm/TeamFormEdit";
import useUserData from "../hooks/useUser";

export const team = () => {
  const { userData } = useUserData();
  console.log(userData);
  if (userData?.team) {
    return <TeamFormEdit />;
  }

  return <CreateTeamForm />;
};

export default team;
