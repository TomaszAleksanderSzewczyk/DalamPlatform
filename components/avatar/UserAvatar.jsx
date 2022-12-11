import useUserData from "../../hooks/useUser";
import styles from "../../styles/avatar.module.css";
import Avatar from "./index";
import Stack from "@mui/material/Stack";
import { Button, Grid } from "@mui/material";
import PortraitIcon from "@mui/icons-material/Portrait";
export default function UserAvatar() {
  const { update, userData } = useUserData();

  return (
    <Avatar 
        src={userData?.avatar}
        isEditable
        onUpdate={src => update({ avatar: src })}
    />
  );
}
