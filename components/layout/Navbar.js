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
export function Navbar() {
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
          <Link href='/login'>
            <Button onClick={handleLogOut} color='inherit'>
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
