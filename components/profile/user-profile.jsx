import styles from './user-profile.module.css'
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import useUserData from "../../hooks/useUser";
import UserCredencialsForm from "../userCredencialsForm/userCredencialsForm";
import { useRef } from "react";
import Avatar from "../avatar";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useMutation, useQuery } from 'react-query';
import InvitationsApi from '../../api/invitations';
import { useEffect } from 'react';
import TeamsApi from '../../api/teams';

function UserProfile() {
  const session = useSession();
  const { userData, update } = useUserData();
  const { data: invitations, refetch } = useQuery('invitations', InvitationsApi.getAll);

  const inputRef = useRef();


  return (
    <>
      <Avatar/>
      <div className={styles.credentials}>
      
        {!userData?.firstName ? console.log(session) : `${userData?.firstName} ${userData?.lastName}` }
      </div>
      <div className={styles.description}>
        {`${userData?.description}`}
      </div>

      <div className = {styles.technologies}>
        Technologies
        <div>
          {userData?.technologies?.map((item)=> {
            return (
            
              <Chip sx={{
                marginLeft:1,
              
                width:150,
                fontSize:20
              }} color='primary' label={item} />

            )
          }) }
        </div>
      </div>

      <div className = {styles.technologies}>
        Social Media
        <div>
        {userData?.linkedIn && (
          <Button 
          
          startIcon={<TwitterIcon/>}
          className={styles.avatarButton}
       sx={ { borderRadius: 28 } }

 variant="contained"
 component="label" >LinkedIn</Button>
        )}
        </div>
      </div>
      <UserCredencialsForm />
      

    </>
  );
}

export default UserProfile;
