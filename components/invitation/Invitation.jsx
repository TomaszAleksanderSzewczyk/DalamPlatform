import { useQuery } from "react-query";
import InvitationsApi from "../../api/invitations";
import { useMutation } from "react-query";
import { useEffect } from "react";
import TeamsApi from "../../api/teams";
export const Invitation = ({ invitation, refresh }) => {
    const { data, isLoading } = useQuery(['team', invitation.teamId], () => TeamsApi.getOne(invitation.teamId));
    const { mutate, isLoading: isMutating, isError, isSuccess, error } = useMutation((type) => InvitationsApi[type](invitation._id));
  console.log(data);
    console.log(error)
    useEffect(() => {
      if (isSuccess) {
        alert('Success');
      }
  
      if (isError) {
        alert('Failure');
      }
  
      refresh();
    }, [isSuccess, isError, refresh]);
  
    if (isLoading) {
      return "Loading...";
    }
  
    return (
      <div>
        {`Zostałeś zaproszony do zespołu ${data?.data?.name}`}
        <button onClick={() => mutate('accept')} disabled={isMutating}>Accept</button>
        <button onClick={() => mutate('reject')} disabled={isMutating}>Reject</button>
      </div>
    )
  }