import { getSession } from "next-auth/react";

import UserProfile from "../../components/profile/user-profile";
import withAuthStatus from "../../hoc/withAuthStatus";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  return {
    props: { session },
  };
}

export default withAuthStatus(ProfilePage);
