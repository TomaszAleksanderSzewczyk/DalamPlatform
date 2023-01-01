import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./TeamProfile.module.css";
import stylesUser from "../profile/user-profile.module.css";
import { signOut, useSession } from "next-auth/react";
import useUserData from "../../hooks/useUser";
import {
  Chip,
  Button,
  Grid,
  Autocomplete,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import useTeamData from "../../hooks/useTeams";
import TeamForm from "../teamForm/TeamForm";
import useTeamQuery from "../../hooks/queries/useTeamQuery";
import { useMutation, useQuery } from "react-query";
import InvitationsApi from "../../api/invitations";
import UsersApi from "../../api/users";
import AddUserToTeamDialog from "../Dialog/AddUserToTeamDialog";
import DisplayInvitations from "../Dialog/DisplayInvitationsDialog";
import AvatarComponent from "../avatar";
import Link from "next/link";
const TeamMember = ({ team, user, refresh, isOwner }) => {
  const { data, isLoading } = useQuery(["user", user], () =>
    UsersApi.getOne(user)
  );
  const { update } = useTeamData();
  console.log(team, 'team');
  const { mutate, isLoading: isOngoing } = useMutation(async (data) => {
    await update(team._id.toString(), data);
    await refresh();
  });
  console.log("DATAAAAA", data);
  console.log(user, 'd', user);
  const handleDelete = () => {
    mutate({
      removeUser: user
    });
  }
  if (isLoading) return <div>Loading...</div>;
  return (
    <Grid container spacing={1}>
      <Grid item md={12} lg={12} sm={12} key={user}>
        <Card
          sx={{
            maxHeight: 400,
            background: "#F3F2EF",
            border: 2,
          }}
        >
          <CardMedia
            component='img'
            height='160'
            image={
              data?.data?.avatar
                ? data?.data?.avatar
                : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
            }
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {!data?.data?.firstName || !data?.data?.lastName
                ? `User ${user._id}`
                : `${data?.data?.firstName} ${data?.data?.lastName}`}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {data?.data?.description}
              {data?.data?.technologies?.map((item) => {
                return (
                  <Chip
                    key={item}
                    sx={{
                      marginLeft: 1,
                      marginBottom: 1,
                      width: 120,
                      fontSize: 16,
                    }}
                    color='primary'
                    label={item}
                  />
                );
              })}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href={`/users/${data?.data?._id}`}>
              <Button size='small'>Profile</Button>
            </Link>
            {isOwner && (
              <Button onClick={handleDelete} disabled={isOngoing}>
                Remove
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

// todo fetch pending invitations for team

function TeamProfile() {
  const [newTeammate, setNewTeammate] = useState("");
  const { refetch } = useUserData();
  const { deleteOne, getOne, update } = useTeamData();
  const router = useRouter();
  const { id } = router.query;
  const { data: teamData, isLoading, refetch: refetchTeam } = useTeamQuery(id);
  const { mutate: updateTeam } = useMutation((data) => update(id, data), {
    onSettled: refetchTeam,
  });

  const { data: teamInvitations, refetch: refetchInvites } = useQuery(
    "invitations",
    () => InvitationsApi.getAllForTeam(id),
    {
      enabled: !!id,
    }
  );
  const session = useSession();
  const { userData } = useUserData();
  const removeTeam = () => {
    deleteOne(id).then(() => {
      refetch();
      router.push("/teams/new");
    });
  };

  if (isLoading && !teamData) {
    return "Loading...";
  }

  if (!teamData?._id) {
    return "No team found";
  }

  const isOwner = teamData?.owner === userData?._id;

  console.log(teamInvitations);

  return (
    <div className={stylesUser.center}>
      <Grid item sx={{ marginLeft: 0, marginRight: "auto" }}>
        {id !== "new" && isOwner && (
          <div style={{ display: "flex" }}>
            <Button
              variant='contained'
              size='small'
              color='error'
              onClick={removeTeam}
            >
              Remove team
            </Button>

            <AddUserToTeamDialog />
            <DisplayInvitations />
          </div>
        )}
      </Grid>
      <AvatarComponent
        src={teamData?.avatar}
        isEditable={isOwner}
        onUpdate={(src) => updateTeam({ avatar: src })}
      />

      <div className={stylesUser.credentials}>
        {teamData?.owner === userData?.id ? "Your team" : ""}
        {`${teamData?.name}`}
      </div>
      <div className={styles.description}>
        <small>{teamData?.owner === userData?.id ? "Your team" : ""}</small>
        {`${teamData?.description}`}
      </div>

      <div className={styles.technologies}>
        Technologies
        <div>
          {userData?.technologies?.map((item) => {
            return (
              <Chip
                key={item}
                sx={{
                  marginLeft: 1,

                  width: 150,
                  fontSize: 20,
                }}
                color='primary'
                label={item}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.technologies}>
        Social Media
        <div>
          {userData?.linkedIn && (
            <Button
              startIcon={<TwitterIcon />}
              className={styles.avatarButton}
              sx={{ borderRadius: 28 }}
              variant='contained'
              component='label'
            >
              LinkedIn
            </Button>
          )}
        </div>
      </div>
      <div className={styles.technologies}>
        Members
        <div className={styles.credentials}>
          {id !== "new" && (
            <div>
              {teamData?.users?.map((user) => (
                <TeamMember team={teamData} user={user} key={user} refresh={refetchTeam} isOwner={isOwner} />
              ))}
            </div>
          )}
        </div>
      </div>

      {userData?._id === teamData?.owner && teamData && (
        <TeamForm properties={teamData} isEdit />
      )}
      {/* <UserCredencialsForm /> */}
    </div>
  );
}

export default TeamProfile;
