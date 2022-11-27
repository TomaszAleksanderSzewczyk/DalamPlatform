import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import styles from './TeamProfile.module.css'
import { signOut, useSession } from "next-auth/react";
import useUserData from "../../hooks/useUser";
import UserCredencialsForm from "../userCredencialsForm/userCredencialsForm";
import { useRef } from "react";
import Avatar from "../avatar";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import useTeamData from '../../hooks/useTeams';
import TeamForm from '../teamForm/TeamForm';
import useTeamQuery from '../../hooks/queries/useTeamQuery';
import { useMutation, useQuery } from 'react-query';
import InvitationsApi from '../../api/invitations';
import UsersApi from '../../api/users';

const TeamMember = ({ user, refresh }) => {
  const { data, isLoading } = useQuery(['user', user], () => UsersApi.getOne(user));
  const { mutate, isLoading: isOngoing } = useMutation(InvitationsApi.delete);

  return (
    <div>
      {isLoading ? 'Loading...' : data?.email} &nbsp;
      {data && <button onClick={() => mutate(user)} disabled={isOngoing}>Remove</button>}
    </div>
  )
}

// todo fetch pending invitations for team

function TeamProfile() {
  const [editTeam, setEditTeam] = useState(false);
  const [newTeammate, setNewTeammate] = useState('');
  const { refetch } = useUserData();
  const { deleteOne, getOne } = useTeamData();
  const mutation = useMutation(InvitationsApi.create)
  const router = useRouter()
  const { id } = router.query;
  const { data: teamData, isLoading, refetch: refetchTeam } = useTeamQuery(id);
  const { data: teamInvitations, refetch: refetchInvites } = useQuery('invitations', () => InvitationsApi.getAllForTeam(id), {
    enabled: !!id
  });

  const session = useSession();
  const { userData } = useUserData();
  const removeTeam = () => {
    deleteOne(id).then(() => {
      refetch();
      router.push('/teams/new')
    });
  }

  const addTeammate = () => {
    mutation.mutate({ email: newTeammate, teamId: id });
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      alert('Invitation sent');
      refetchTeam();
      setNewTeammate('');
      refetchInvites();
    }
  }, [mutation.isSuccess, refetchTeam, refetchInvites]);

  useEffect(() => {
    if (mutation.isError) {
      alert(mutation.error?.message);
      refetchTeam();
      setNewTeammate('');
    }
  }, [mutation.error?.message, mutation.isError, refetchTeam]);

  if (isLoading && !teamData) {
    return "Loading...";
  }

  if (!teamData?._id) {
    return "No team found";
  }

  const isOwner = teamData?.owner === userData?._id 

  console.log(teamInvitations);

  return (
    <>
      <div className={styles.credentials}>
        {id !== 'new' && isOwner && (
          <Button onClick={removeTeam}>Remove team</Button>
        )}
      </div>
      {teamInvitations?.data?.length > 0 && (
        <h4>Invitations:</h4>
      )}
      {teamInvitations?.data?.map((invitation) => (
        <div key={invitation._id}>
          {invitation.email}
        </div>
      ))}
      {teamData && isLoading && "Reloading data..."}
      <div className={styles.credentials}>
        {id !== 'new' && isOwner && (
          <div>
            {teamData?.users?.map(user => (
              <TeamMember user={user} key={user} refresh={refetchTeam} />
            ))}
            <div>
              <input type="text" value={newTeammate} onChange={e => setNewTeammate(e.target.value)} />
              <Button onClick={addTeammate} disabled={mutation.isLoading}>Add teammate</Button>
            </div>
          </div>
        )}
      </div>
      <Avatar />
      <div className={styles.description}>
        <small>{teamData?.owner === userData?.id ? 'Your team' : ''}</small>
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
                fontSize: 20
              }} color='primary' label={item} />

            )
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

              variant="contained"
              component="label" >LinkedIn</Button>
          )}
        </div>
      </div>
      {editTeam && <TeamForm properties={teamData} />}
      {/* <UserCredencialsForm /> */}


    </>
  );
}

export default TeamProfile;
