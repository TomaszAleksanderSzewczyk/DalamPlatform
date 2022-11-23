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
function TeamProfile() {
  const { getOne } = useTeamData();
  const [teamData, setTeamData] = useState([])
  const router = useRouter()
  const { id } = router.query;
  console.log(id);
  useEffect(() => {
    getOne(id).then((data) => setTeamData(data));
  }, []);
  
  const session = useSession();
  const { userData, update } = useUserData();


  console.log(teamData);
  const inputRef = useRef();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  const [age, setAge] = useState("");
  const handleUpdate = () => {
    update({ age });
  };




  return (
    <>
      <div className={styles.credentials}>
      
      {!teamData?.name ? console.log(session) : `${teamData?.name}` }
    </div>
      <Avatar/>
     
      <div className={styles.description}>
        {`${teamData?.description}`}
      </div>

      <div className = {styles.technologies}>
        Technologies
        <div>
          {userData?.technologies.map((item)=> {
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

export default TeamProfile;
