import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery"; // Importujemy useMediaQuery

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/login");
  };

  // Używamy useMediaQuery, aby sprawdzić szerokość ekranu
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DALAM
            </Typography>
          )}
          {isMobile ? (
            <div style={{ display: isMenuOpen ? "block" : "none", width: "100%" }}>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mb: 1 }}
                onClick={() => router.push("/profile/invitations")}
                fullWidth // Dodaj atrybut fullWidth
              >
                Invitations
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mb: 1 }}
                onClick={() =>
                  router.push(`/teams/${session.user.team || "new"}`)
                }
                fullWidth // Dodaj atrybut fullWidth
              >
                {session.user.team ? "My Team" : "Create Team"}
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mb: 1 }}
                onClick={() => router.push("/profile")}
                fullWidth // Dodaj atrybut fullWidth
              >
                Profile
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mb: 1 }}
                onClick={() => router.push("/users")}
                fullWidth // Dodaj atrybut fullWidth
              >
                Users
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mb: 1 }}
                onClick={() => router.push("/teams")}
                fullWidth // Dodaj atrybut fullWidth
              >
                Teams
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mb: 1 }}
                onClick={() => router.push("/tasks")}
                fullWidth // Dodaj atrybut fullWidth
              >
                Tasks
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mb: 1 }}
                onClick={() => router.push("/settings")}
                fullWidth // Dodaj atrybut fullWidth
              >
                Settings
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogOut}
                fullWidth // Dodaj atrybut fullWidth
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              {session ? (
                <div>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => router.push("/profile/invitations")}
                  >
                    Invitations
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() =>
                      router.push(`/teams/${session.user.team || "new"}`)
                    }
                  >
                    {session.user.team ? "My Team" : "Create Team"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => router.push("/users")}
                  >
                    Users
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => router.push("/teams")}
                  >
                    Teams
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => router.push("/tasks")}
                  >
                    Tasks
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => router.push("/settings")}
                  >
                    Settings
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleLogOut}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login" passHref>
                  <Button variant="outlined" color="inherit">
                    Login
                  </Button>
                </Link>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;