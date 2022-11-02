import * as React from "react";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useCallback } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../firebase";
import { Controller, useForm } from "react-hook-form";
import { signUpErrorMessages } from "../utils/firebaseErrores";
import {
  addDoc,
  getFirestore,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
const theme = createTheme();
export default function SignUp() {
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
  const checkedIcon = <CheckBoxIcon fontSize='small' />;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const { signUp } = useUserAuth();
  const [technologies, setTechnologies] = useState([]);
  console.log("technologies", technologies[0]);
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCred) => {
        const user = {
          uid: userCred.user.uid,
          firstName: "",
          email: userCred.user.email,
          phone: "",
          location: "",
          technologies: [],
        };
        setDoc(doc(db, "users", userCred.user.uid), user);
        navigate("/");
      })
      .catch((error) => {
        setError("nonFieldError", {
          type: "server",
          message: signUpErrorMessages(error.code),
        });
        setTimeout(clearErrors, 3000);
      });
  };

  const array = [];

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl>
            <InputLabel htmlFor={"email-input"}>Email</InputLabel>
            <Controller
              name={"email"}
              control={control}
              defaultValue={""}
              rules={{ required: "Email is required" }}
              render={({ field: { onChange, value } }) => (
                <OutlinedInput
                  id={"email-input"}
                  type={"email"}
                  label={"Email"}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.email && (
              <Typography color={"error.main"} component={"span"}>
                {errors.email.message}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor={"first-name-input"}>First Name</InputLabel>
            <Controller
              name={"first-name"}
              control={control}
              defaultValue={""}
              rules={{ required: "First name is required" }}
              render={({ field: { onChange, value } }) => (
                <OutlinedInput
                  id={"first-name-input"}
                  type={"firstName"}
                  label={"First Name"}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.firstName && (
              <Typography color={"error.main"} component={"span"}>
                {errors.firstName}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor={"last-name-input"}>Last Name</InputLabel>
            <Controller
              name={"last-name"}
              control={control}
              defaultValue={""}
              rules={{ required: "Last Name is required" }}
              render={({ field: { onChange, value } }) => (
                <OutlinedInput
                  id={"lastName"}
                  type={"lastName"}
                  label={"Last Name"}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.lastName && (
              <Typography color={"error.main"} component={"span"}>
                {errors.lastName.message}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor={"password-input"}>Hasło</InputLabel>
            <Controller
              name={"password"}
              control={control}
              defaultValue={""}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be min. 6 letters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <OutlinedInput
                  id={"password-input"}
                  type={showPassword ? "text" : "password"}
                  label={"Password"}
                  value={value}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password && (
              <Typography color={"error.main"} component={"span"}>
                {errors.password.message}
              </Typography>
            )}
          </FormControl>
          {errors.nonFieldError && (
            <Typography
              textAlign={"center"}
              color={"error.main"}
              component={"span"}
            >
              {errors.nonFieldError.message}
            </Typography>
          )}
          <FormControl>
            <Button
              variant={"contained"}
              type={"submit"}
              disabled={formState.isSubmitting}
            >
              Zarejestruj
            </Button>
          </FormControl>
          <Button variant={"contained"} type={"submit"}>
            <LinkRouter to='/' variant='body2'>
              {"I have an account. Back to login"}
            </LinkRouter>
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
const top100Films = [
  { title: "JavaScript" },
  { title: "Java" },
  { title: "React" },
  { title: "Assembly" },
  { title: "Cobol" },
  { title: "Allsls" },
  { title: "Firebase" },
];
