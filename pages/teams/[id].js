import { getSession } from "next-auth/react";

import TeamProfile from "../../components/teamProfile/TeamProfile";
import { Navbar } from "../../components/layout/Navbar";
import { useRouter } from "next/router";
import TeamForm from "../../components/teamForm/TeamForm";

// todo: add check if new - check if user actually doesnt have team
function TeamPage(props) {
  const { query } = useRouter();
  return (
    <>
      {query.id === "new" ? (
        <TeamForm />
      ) : (
        <TeamProfile />
      )}
    </>
  );
}

export default TeamPage;
