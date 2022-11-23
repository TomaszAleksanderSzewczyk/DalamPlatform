import { getSession } from "next-auth/react";

import UserListProfile from "../../components/profile/UserListProfile";
import { Navbar } from "../../components/layout/Navbar";
function UserPage() {
  return (
    <>
      <Navbar />
      <UserListProfile />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  return {
    props: { session },
  };
}

export default UserPage;
