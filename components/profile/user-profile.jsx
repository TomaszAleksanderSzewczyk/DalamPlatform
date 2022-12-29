import styles from "./user-profile.module.css";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import useUserData from "../../hooks/useUser";
import UserCredencialsForm from "../userCredencialsForm/userCredencialsForm";
import { useRef } from "react";
import AvatarComponent from "../avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useMutation, useQuery } from "react-query";
import InvitationsApi from "../../api/invitations";
import { useEffect } from "react";
import TeamsApi from "../../api/teams";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";
import { EmojiEmotions, Facebook, Phone } from "@mui/icons-material";
function UserProfile() {
  const session = useSession();
  console.log(session);

  const { userData, update } = useUserData();
  const { data: invitations, refetch } = useQuery(
    "invitations",
    InvitationsApi.getAll
  );
  console.log(userData?.linkedIn);
  const inputRef = useRef();
  const isOwner = session?.data?.user?.id === userData?._id;
  return (
    <div className={styles.center}>
      <Grid container sx={{ backgroundColor: "#F3F2EF" }}>
        <Grid item md={12} lg={12} sm={12}>
          <AvatarComponent
            src={userData?.avatar}
            isEditable={isOwner}
            onUpdate={(src) => update({ avatar: src })}
          />
        </Grid>
        <Grid item md={12} lg={12} sm={12}>
          <div className={styles.credentials}>
            {!userData?.firstName
              ? console.log(session)
              : `${userData?.firstName} ${userData?.lastName}`}
          </div>
        </Grid>
        <Grid item md={12} lg={12} sm={12}>
          <div className={styles.description}>{`${userData?.description}`}</div>
        </Grid>
        <Grid item md={12} lg={12} sm={12}>
          <div className={styles.technologies}>
            Technologies
            <div>
              {userData?.technologies?.map((item) => {
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
            <div className={styles.centerSocialMedia}>
              <div className={styles.itemSocialMedia}>
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
              <div className={styles.itemSocialMedia}>
                {userData?.facebook && (
                  <Link
                    target='_blank'
                    href={`https://${userData?.facebook}`}
                    rel='noreferrer'
                  >
                    <Button
                      startIcon={<Facebook />}
                      className={styles.avatarButton}
                      sx={{ borderRadius: 28 }}
                      variant='contained'
                      component='label'
                    >
                      Facebook
                    </Button>
                  </Link>
                )}
              </div>
              <div className={styles.itemSocialMedia}>
                {userData?.discord && (
                  <Link
                    target='_blank'
                    href={`https://${userData?.discord}`}
                    rel='noreferrer'
                  >
                    <Button
                      startIcon={<EmojiEmotions />}
                      className={styles.avatarButton}
                      sx={{ borderRadius: 28 }}
                      variant='contained'
                      component='label'
                    >
                      Discord
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className={styles.technologies}>
            CONTACT
            <div className={styles.itemLocalization}>
              {userData?.localization && (
                <div className={styles.localization}>
                  Location: {userData?.localization}
                </div>
              )}

              <div className={styles.itemLocalization}>
                {userData?.facebook && (
                  <div className={styles.localization}>
                    <Phone></Phone>
                    {`   ${userData?.phoneNumber}`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
