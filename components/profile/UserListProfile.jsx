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
import { useRouter } from 'next/router';
import { useEffect } from 'react';
function UserListProfile() {
  const session = useSession();
  const router = useRouter();
  const { id } = router.query;
  console.log("diddddd", id);
  const { userData, update, getOneFromList  } = useUserData();

  const inputRef = useRef();
  const triggerFileSelectPopup = () => inputRef.current.click();
  const [image, setImage] = useState(null);
	const [croppedArea, setCroppedArea] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
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
  const [userFromListData, setUserData] = useState();



  useEffect(async() => {
    await getOneFromList(id).then((data) =>{
        console.log("data",data);
        setUserData(data)} );
  }, []);
  console.log(userFromListData);
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

export default UserListProfile;
