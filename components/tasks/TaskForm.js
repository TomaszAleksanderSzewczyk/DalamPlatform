
import { Alert, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useTaskData from "../../hooks/useTasks";

const TaskForm = (properties = {}) => {
  const isEdit = !!properties._id;
  const { create, update } = useTaskData();
  const [name, setName] = useState(properties.name || '');
  const [description, setDescription] = useState(properties.description || '');
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e) => {
    setError("");
    setIsLoading(true);
    e.preventDefault();
    const newData = { name, description };

    const promise = isEdit
      ? update(properties._id, newData)
      : create(newData);

    promise
        .then((data) => {
        alert(JSON.stringify(data, null, 2));
        })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }

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
          {isEdit ? 'Edit Task' : 'Create Task'}
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <form onSubmit={handleSave}>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              value={name}
              label='Name'
              name='name'
              autoFocus
              onChange={(e) => setName(e.target.value)}
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
              {isEdit ? 'Edit Task' : 'Create Task'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}


export default TaskForm;
