import { getSession, signIn } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import useUserData from "../hooks/useUser";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import withAuthStatus from "../hoc/withAuthStatus";
import { useEffect, useState } from "react";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data.message || "Something went wrong!");
  }

  return data;
}

function Login() {
  const { refetch } = useUserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSwap = (e) => {
    e.preventDefault();
    setIsRegister(!isRegister);
  };

  useEffect(() => {
    getSession().then((session) => {
      console.log(session);
      if (session) {
        router.push("/profile");
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegister) {
      const result = await createUser(email, password);

      if (result.error) {
        setError(result.error);
      } else {
        alert("Successfully registered, you can log in");
      }
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    await refetch();

    const userData = await fetch("/api/user").then((res) => res.json());

    if (!result.error) {
      if (!userData?.firstName) {
        router.push("/credentials");
      } else router.push("/profile");
    }

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {!isRegister ? "Sign In" : "Sign Up"}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "primary.main", color: "white" }}
          >
            {isRegister ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="#" variant="body2">
                <a onClick={handleSwap}>
                  {isRegister
                    ? "Have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default withAuthStatus(Login, false);