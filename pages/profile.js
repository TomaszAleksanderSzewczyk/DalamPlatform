import { getSession } from "next-auth/react";

import UserProfile from "../components/profile/user-profile";
import { Navbar } from "../components/layout/Navbar";
function ProfilePage() {
  return (
    <>
      <Navbar />
      <UserProfile />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  return {
    props: { session },
  };
}

export default ProfilePage;
