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
import useUserData from "../../hooks/useUser";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function UserCredencialsForm({ properties }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
  const checkedIcon = <CheckBoxIcon fontSize='small' />;
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [linkedIn, setLinkedIn] = useState("s");

  const router = useRouter();
  const handleUpdate = () => {
    update({ firstName, lastName, description, technologies, linkedIn });
    router.replace("/profile");
  };
  const { userData, update } = useUserData();
  const uploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    const res = await fetch(
      `/api/photos?file=${filename}&fileType=${fileType}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    update({
      avatar: url + fields.key,
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }
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
            defaultValue={userData?.firstName}
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
          <TextField
            margin='normal'
            fullWidth
            name=''
            label='LinkedIn Link'
            type='text'
            id='linkedIn'
            onChange={(e) => setLinkedIn(e.target.value)}
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
