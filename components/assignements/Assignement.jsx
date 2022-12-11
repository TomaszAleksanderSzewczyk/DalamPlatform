import {
    Alert,
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
  } from "@mui/material";
  import { useRouter } from "next/router";
  import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
  import useOffersData from "../../hooks/useOffers";
import useTaskData from "../../hooks/useTasks";
  
  const Assignement = ({task}) => {
    const queryClient = useQueryClient()
    const { update } = useTaskData();
    const [disabled, setDisabled] = useState(false);
    const [link, setLink] = useState("");
    const { mutate, error, isLoading } = useMutation(() => update(task._id, { link, isCompleted: true }), {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
            setDisabled(true);
        }
    });
  
    const handleSave = (e) => {
        e.preventDefault();
        mutate();
    };

    if (!task || task.isCompleted || disabled) {
        return null;
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
            Submit download link
          </Typography>
          <form onSubmit={handleSave}>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='link'
                label='Link to download'
                value={link}
                name='link'
                autoFocus
                onChange={(e) => setLink(e.target.value)}
              />
  
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    );
  };
  
  export default Assignement;
  