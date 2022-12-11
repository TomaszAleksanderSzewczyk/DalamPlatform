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
import useOffersData from "../../hooks/useOffers";

const OfferForm = (properties = {}) => {
  const isEdit = !!properties._id;
  const { create, update } = useOffersData();
  const [price, setPrice] = useState(properties.price || "");
  const [description, setDescription] = useState(properties.description || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useRouter();
  console.log(query);

  const handleSave = (e) => {
    setError("");
    setIsLoading(true);
    e.preventDefault();
    const newData = { price, description, task: query.id };

    const promise = isEdit ? update(properties._id, newData) : create(newData);

    promise
      .then((data) => {
        alert(JSON.stringify(data, null, 2));
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
          {isEdit ? "Edit Offer" : "Create Offer"}
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <form onSubmit={handleSave}>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='price'
              label='Price'
              value={price}
              name='price'
              autoFocus
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              value={description}
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
              disabled={isLoading}
            >
              {isEdit ? "Edit Offer" : "Create Offer"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default OfferForm;
