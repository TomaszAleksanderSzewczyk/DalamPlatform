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
import UsersApi from "../../api/users";
export default function UserCredentialsForm({ properties, update }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
  const checkedIcon = <CheckBoxIcon fontSize='small' />;
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState(properties?.description || "");
  const [firstName, setFirstName] = useState(properties?.firstName || "");
  const [lastName, setLastName] = useState(properties?.lastName || "");
  const [technologies, setTechnologies] = useState(
    properties?.technologies || []
  );
  const [linkedIn, setLinkedIn] = useState(properties?.linkedIn || "");
  const [facebook, setFacebook] = useState(properties?.facebook || "");
  const [discord, setDiscord] = useState(properties?.discord || "");
  const [localization, setlocalization] = useState(
    properties?.localization || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(properties?.phoneNumber || "");
  const router = useRouter();
  const handleUpdate = (e) => {
    e.preventDefault();
    update({
      firstName,
      lastName,
      description,
      technologies,
      linkedIn,
      facebook,
      discord,
      phoneNumber,
      localization,
    });
    router.replace("/profile");
  };
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
          User Credentials
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='first-name'
            label='First Name'
            name='first-name'
            autoFocus
            onChange={(e) => setFirstName(e.target.value)}
            defaultValue={properties?.firstName}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            name=''
            label='Last Name'
            type='text'
            id='description'
            onChange={(e) => setLastName(e.target.value)}
            defaultValue={properties?.lastName}
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
            defaultValue={properties?.description}
          />
          <TextField
            margin='normal'
            fullWidth
            name=''
            label='LinkedIn Link'
            type='text'
            id='linkedIn'
            onChange={(e) => setLinkedIn(e.target.value)}
            defaultValue={properties?.linkedIn}
          />
          <TextField
            margin='normal'
            fullWidth
            name=''
            label='Discord Link'
            type='text'
            id='Discord'
            onChange={(e) => setDiscord(e.target.value)}
            defaultValue={properties?.discord}
          />
          <TextField
            margin='normal'
            fullWidth
            name=''
            label='Facebook Link'
            type='text'
            id='facebook'
            onChange={(e) => setFacebook(e.target.value)}
            defaultValue={properties?.facebook}
          />
          <TextField
            margin='normal'
            fullWidth
            name=''
            label='Localization'
            type='text'
            id='localization'
            onChange={(e) => setlocalization(e.target.value)}
            defaultValue={properties?.localization}
          />
          <TextField
            margin='normal'
            fullWidth
            name=''
            label='Phone Number'
            type='text'
            id='phoneNumber'
            onChange={(e) => setPhoneNumber(e.target.value)}
            defaultValue={properties?.phoneNumber}
          />
          <Autocomplete
            fullWidth
            onChange={(event, value) => setTechnologies(value)}
            multiple
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
                defaultValue={properties?.technologies}
              />
            )}
          />
          <Button
            onClick={handleUpdate}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Save User Credentials
          </Button>
        </Box>
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
