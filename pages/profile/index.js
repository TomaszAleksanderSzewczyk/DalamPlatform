import { getSession } from "next-auth/react";

import UserProfile from "../../components/profile/user-profile";
import withAuthStatus from "../../hoc/withAuthStatus";

function ProfilePage() {
  console.log('profile')
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log('profile ses')

  return {
    props: { session },
  };
}

export default withAuthStatus(ProfilePage);
