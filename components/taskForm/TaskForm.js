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
import InputAdornment from "@mui/material/InputAdornment";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function TaskForm({ properties }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
  const checkedIcon = <CheckBoxIcon fontSize='small' />;
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [salary, setSalary] = useState([]);
  const router = useRouter();
  const [startDate, setStartDateValue] = useState(null);
  const [finishDate, setFinishDateValue] = useState(null);
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
          Create Task
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='task-name'
            label='Task Name'
            name='team-name'
            autoFocus
            onChange={(e) => setTaskName(e.target.value)}
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
            required
            fullWidth
            name=''
            label='Salary'
            type='number'
            id='description'
            onChange={(e) => setSalary(e.target.value)}
            InputProps={{
              inputProps: { min: 0 },
            }}
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
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Planned start date'
              value={startDate}
              onChange={(newValue) => {
                setStartDateValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Planned finish date'
              value={finishDate}
              onChange={(newValue) => {
                setFinishDateValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Create Task
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
