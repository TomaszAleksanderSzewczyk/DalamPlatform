import React from "react";
import { useQuery } from "react-query";
import InvitationsApi from "../../api/invitations";
import { Invitation } from "../../components/invitation/Invitation";
const Invitations = () => {
  const { data: invitations, refetch } = useQuery(
    "invitations",
    InvitationsApi.getAll
  );
  return (
    <div>
      {" "}
      {invitations?.data?.map((invitation) => (
        <Invitation
          key={invitation._id}
          invitation={invitation}
          refresh={refetch}
        />
      ))}
    </div>
  );
};

export default Invitations;
