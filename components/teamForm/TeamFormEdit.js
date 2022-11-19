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

export default function TeamFormEdit({ properties }) {
  const [users, setUsers] = useState([]);
  const { getAll } = useUsers();
  const { userData } = useUser();
  const { update, getOne } = useTeams();
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
  const checkedIcon = <CheckBoxIcon fontSize='small' />;
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [chosenUsers, setChosenUsers] = useState([]);
  console.log(chosenUsers);
  console.log(teamMembers);
  console.log(technologies);
  const router = useRouter();

  useEffect(() => {
    getAll().then((data) => setUsers(data));
  }, []);
  console.log(userData);
  useEffect(() => {
    getOne(userData?.team).then((data) => {
      setDescription(data.description);
      setTeamMembers(data.users);
      setTeamName(data.name);
      setTechnologies(technologies);
    });
  }, [userData?.team]);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(chosenUsers);
    update(userData.team, {
      name: teamName,
      users: chosenUsers,
      description: description,
      technologies,
    });
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
          Edit Team
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <form onSubmit={handleUpdate}>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              value={teamName}
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
              value={description}
              fullWidth
              name=''
              label='Description'
              type='text'
              id='description'
              onChange={(e) => setDescription(e.target.value)}
            />

            <Autocomplete
              fullWidth
              value={chosenUsers}
              onChange={(event, value) => setChosenUsers(value)}
              multiple
              id='checkboxes-tags-demo'
              options={emails}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Invite users to team'
                  placeholder='Choose which users should be invited'
                />
              )}
            />
            <Autocomplete
              fullWidth
              onChange={(event, value) => setTechnologies(value)}
              multiple
              value={technologies}
              id='checkboxes-tags-demo'
              options={programmingLanguages}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Technologies'
                  placeholder='Choose technology'
                />
              )}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Edit Team
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
