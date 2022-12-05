import * as React from "react";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import InvitationsApi from "../../api/invitations";
import useUsers from "../../hooks/useUsers";
import { useRouter } from "next/router";
export default function AddUserToTeamDialog() {
  const router = useRouter();
  const { id } = router.query;
  const mutation = useMutation(InvitationsApi.create);
  const addTeammate = () => {
    mutation.mutate({ email: newTeammate, teamId: id });
    setOpen(false);
  };
  const { getAll } = useUsers();
  const [users, setUsers] = useState([]);
  const [newTeammate, setNewTeammate] = useState("");
  const [open, setOpen] = React.useState(false);
  const emails = users.map(({ email }) => email);

  useEffect(() => {
    getAll().then((data) => setUsers(data));
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size='small' variant='outlined' onClick={handleClickOpen}>
        Invite User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If u want to add user to your team pick him from the list and click
            Add User
          </DialogContentText>
          <Autocomplete
            onChange={(event, value) => setNewTeammate(value)}
            id='checkboxes-tags-demo'
            options={emails}
            getOptionLabel={(option) => option}
            style={{ width: 200 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Invite user to team'
                placeholder='Choose which users should be invited'
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={addTeammate}>Add Teammate</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
