import { getSession, signIn } from "next-auth/react";
import { programmingLanguages } from "../../utils/programmingLanguages";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useUsers from "../../hooks/useUsers";
import useUser from "../../hooks/useUser";
import useTeams from "../../hooks/useTeams";

export default function CreateTeamForm({ properties }) {
  const [users, setUsers] = useState([]);
  const { getAll } = useUsers();
  const { create } = useTeams();
  const { refresh } = useUser();
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
  const checkedIcon = <CheckBoxIcon fontSize='small' />;
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamName, setTeamName] = useState("");
  console.log(teamName);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  console.log(description);
  const router = useRouter();

  useEffect(() => {
    getAll().then((data) => setUsers(data));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    create({
      name: teamName,
      description: description,
    })
      .then(() => refresh())
      .catch((e) => setError(e.message));
  };

  const emails = users.map(({ email }) => email);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          Create Team
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <form onSubmit={handleAdd}>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='team-name'
              label='Team Name'
              name='team-name'
              autoFocus
              onChange={(e) => setTeamName(e.target.value)}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              name=''
              label='Description'
              type='text'
              id='description'
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Create Team
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`api/users`);
  const data = await res.json();
  console.log(data);
  // Pass data to the page via props
  return { props: { data } };
}
