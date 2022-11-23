import { getSession } from "next-auth/react";

import TeamProfile from "../../components/teamProfile/TeamProfile";
import { Navbar } from "../../components/layout/Navbar";
function TeamPage() {
  return (
    <>
      <Navbar />
      <TeamProfile />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  return {
    props: { session },
  };
}

export default TeamPage;
