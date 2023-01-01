import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import useUser from "../../hooks/useUser";
import useTeams from "../../hooks/useTeams";
import { useRouter } from "next/router";

export default function TeamForm({ properties = {}, isEdit = false }) {
  const { create, update } = useTeams();
  const { refetch } = useUser();
  const [teamName, setTeamName] = useState(properties.name);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(properties.description);
  const { push } = useRouter();
  const handleAdd = (e) => {
    setError("");
    setIsLoading(true);
    e.preventDefault();
    const newData = { name: teamName, description };

    const promise = isEdit ? update(properties._id, newData) : create(newData);

    promise
      .then((data) => {
        if (!data.insertedId) {
          throw new Error(data.message);
        }
        refetch();
        push("/teams/" + data.insertedId);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <strong>{error}</strong>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          {isEdit ? "Edit Team" : "Create Team"}
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
              value={teamName}
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
              value={description}
              type='text'
              id='description'
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isEdit ? "Edit Team" : "Create Team"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
