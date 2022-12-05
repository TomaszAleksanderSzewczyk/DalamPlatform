import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import useUserData from "../../hooks/useUser";
export function Navbar() {
  const { userData } = useUserData();
  const router = useRouter();
  const { update } = useSession();
  const handleLogOut = async () => {
    await signOut({
      redirect: false,
    });
    setTimeout(() => {
      router.push("/login");
    }, 100);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            DALAM
          </Typography>
          <Link href='/profile/invitations'>
            <Button
              sx={{ backgroundColor: "white", color: "black", border: 3 }}
              color='inherit'
            >
              Invitations
            </Button>
          </Link>
          <Link href={`/teams/${userData?.team || "new"}`}>
            <Button
              sx={{ backgroundColor: "white", color: "black", border: 3 }}
              color='inherit'
            >
              {userData?.team ? "my Team" : "create team"}
            </Button>
          </Link>
          <Link href='/profile'>
            <Button
              sx={{ backgroundColor: "white", color: "black", border: 3 }}
              color='inherit'
            >
              Profile
            </Button>
          </Link>
          <Link href='/users'>
            <Button
              sx={{ backgroundColor: "white", color: "black", border: 3 }}
              color='inherit'
            >
              Users
            </Button>
          </Link>
          <Link href='/teams'>
            <Button
              sx={{ backgroundColor: "white", color: "black", border: 3 }}
              color='inherit'
            >
              Teams
            </Button>
          </Link>
          <Link href='/tasks'>
            <Button
              sx={{ backgroundColor: "white", color: "black", border: 3 }}
              color='inherit'
            >
              Tasks
            </Button>
          </Link>
          <Link href='/settings'>
            <Button
              sx={{ backgroundColor: "white", color: "black", border: 3 }}
              color='inherit'
            >
              Settings
            </Button>
          </Link>

          <Link href='/login'>
            <Button
              sx={{ border: 3, borderColor: "black" }}
              onClick={handleLogOut}
              color='inherit'
            >
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
