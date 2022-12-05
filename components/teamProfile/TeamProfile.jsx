import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./TeamProfile.module.css";
import { signOut, useSession } from "next-auth/react";
import useUserData from "../../hooks/useUser";
import { Chip, Button, Grid, Autocomplete, TextField } from "@mui/material";
import { useRef } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import useTeamData from "../../hooks/useTeams";
import TeamForm from "../teamForm/TeamForm";
import useTeamQuery from "../../hooks/queries/useTeamQuery";
import { useMutation, useQuery } from "react-query";
import InvitationsApi from "../../api/invitations";
import UsersApi from "../../api/users";
import useUsers from "../../hooks/useUsers";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddUserToTeamDialog from "../Dialog/AddUserToTeamDialog";
import DisplayInvitations from "../Dialog/DisplayInvitationsDialog";
const TeamMember = ({ user, refresh }) => {
  const { data, isLoading } = useQuery(["user", user], () =>
    UsersApi.getOne(user)
  );
  const { mutate, isLoading: isOngoing } = useMutation(InvitationsApi.delete);

  return (
    <div>
      {isLoading ? "Loading..." : data?.email} &nbsp;
      {data && (
        <button onClick={() => mutate(user)} disabled={isOngoing}>
          Remove
        </button>
      )}
    </div>
  );
};

// todo fetch pending invitations for team

function TeamProfile() {
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
  const checkedIcon = <CheckBoxIcon fontSize='small' />;
  const [users, setUsers] = useState([]);
  const { getAll } = useUsers();
  const [editTeam, setEditTeam] = useState(false);
  const [newTeammate, setNewTeammate] = useState("");
  const { refetch } = useUserData();
  const { deleteOne, getOne } = useTeamData();
  const mutation = useMutation(InvitationsApi.create);
  const router = useRouter();
  const { id } = router.query;
  const { data: teamData, isLoading, refetch: refetchTeam } = useTeamQuery(id);
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

  const addTeammate = () => {
    mutation.mutate({ email: newTeammate, teamId: id });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      alert("Invitation sent");
      refetchTeam();
      setNewTeammate("");
      refetchInvites();
    }
    getAll().then((data) => setUsers(data));
  }, [mutation.isSuccess, refetchTeam, refetchInvites]);

  useEffect(() => {
    if (mutation.isError) {
      alert(mutation.error?.message);
      refetchTeam();
      setNewTeammate("");
    }
  }, [mutation.error?.message, mutation.isError, refetchTeam]);

  if (isLoading && !teamData) {
    return "Loading...";
  }

  if (!teamData?._id) {
    return "No team found";
  }

  const isOwner = teamData?.owner === userData?._id;

  console.log(teamInvitations);

  return (
    <>
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
      <div className={styles.credentials}>
        {id !== "new" && isOwner && (
          <div>
            {teamData?.users?.map((user) => (
              <TeamMember user={user} key={user} refresh={refetchTeam} />
            ))}
          </div>
        )}
      </div>
      <div className={styles.teamName}>
        <small>{teamData?.owner === userData?.id ? "Your team" : ""}</small>
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
        USERS
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

      {editTeam && <TeamForm properties={teamData} />}
      {/* <UserCredencialsForm /> */}
    </>
  );
}

export default TeamProfile;