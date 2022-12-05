import styles from "./user-profile.module.css";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import useUserData from "../../hooks/useUser";
import UserCredencialsForm from "../userCredencialsForm/userCredencialsForm";
import { useRef } from "react";
import { Chip, Button, Grid, Avatar } from "@mui/material";
import avatarStyles from "../../styles/avatar.module.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
function UserListProfile() {
  const session = useSession();
  const router = useRouter();
  const { id } = router.query;

  const { userData, update, getOneFromList } = useUserData();

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
  const [userFromListData, setUserData] = useState();
  console.log(userFromListData);
  useEffect(async () => {
    await getOneFromList(id).then((data) => {
      console.log("data", data);
      setUserData(data);
    });
  }, []);
  return (
    <div className={styles.center}>
      <Grid container sx={{ backgroundColor: "#F3F2EF" }}>
        <Grid item md={12} lg={12} sm={12}>
          <Grid container spacing={1}>
            {userFromListData?.avatar ? (
              <>
                <div className={avatarStyles.avatar369}>
                  <Avatar
                    sx={{ width: 400, height: 400 }}
                    alt='Remy Sharp'
                    src={userFromListData?.avatar}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={avatarStyles.avatar369}>
                  <Avatar
                    sx={{ width: 400, height: 400 }}
                    alt='Remy Sharp'
                    src='https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'
                  />
                </div>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item md={12} lg={12} sm={12}>
          <div className={styles.credentials}>
            {!userFromListData?.firstName
              ? console.log(session)
              : `${userFromListData?.firstName} ${userFromListData?.lastName}`}
          </div>
        </Grid>
        <Grid item md={12} lg={12} sm={12}>
          <div className={styles.description}>
            {`${userFromListData?.description}`}
          </div>
        </Grid>
        <Grid item md={12} lg={12} sm={12}>
          <div className={styles.technologies}>
            Technologies
            <div>
              {userFromListData?.technologies?.map((item) => {
                return (
                  <Chip
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
        </Grid>
        <Grid item md={12} lg={12} sm={12}>
          <div className={styles.technologies}>
            Social Media
            <div>
              {userData?.linkedIn && (
                <Link
                  target='_blank'
                  href={`https://${userData?.linkedIn}`}
                  rel='noreferrer'
                >
                  <Button
                    startIcon={<TwitterIcon />}
                    className={styles.avatarButton}
                    sx={{ borderRadius: 28 }}
                    variant='contained'
                    component='label'
                  >
                    LinkedIn
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserListProfile;
