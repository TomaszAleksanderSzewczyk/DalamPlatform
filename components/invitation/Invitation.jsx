import { useQuery } from "react-query";
import InvitationsApi from "../../api/invitations";
import { useMutation } from "react-query";
import { useEffect } from "react";
import TeamsApi from "../../api/teams";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  CardActions,
  Button,
  Chip,
  Link
} from "@mui/material";

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
  console.log(data)
      refresh();
    }, [isSuccess, isError, refresh]);
  
    if (isLoading) {
      return "Loading...";
    }
  
    return (
      <div>
        <Card sx={{ minWidth: 275, marginBottom:2, marginTop:2, background:"#F3F2EF", border:1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Invitation
        </Typography>
        <Typography variant="h5" component="div">
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Zespół {`${data?.data?.name}`}
        </Typography>
        <Typography variant="body2">
          {data?.data?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/teams/${data?.data?._id}`}>
        <Button size="small">View Team</Button>
        </Link>
        <Button onClick={() => mutate('accept')} disabled={isMutating}>Accept</Button>
        <Button onClick={() => mutate('reject')} disabled={isMutating}>Reject</Button>
      </CardActions>
    </Card>
      </div>
    )
  }