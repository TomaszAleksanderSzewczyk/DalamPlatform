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
import { useMutation, useQuery } from "react-query";
import InvitationsApi from "../../api/invitations";
import useUsers from "../../hooks/useUsers";
import { useRouter } from "next/router";
export default function DisplayInvitations() {
  const router = useRouter();
  const { id } = router.query;
  const mutation = useMutation(InvitationsApi.create);

  const { data: teamInvitations, refetch: refetchInvites } = useQuery(
    "invitations",
    () => InvitationsApi.getAllForTeam(id),
    {
      enabled: !!id,
    }
  );

  const { getAll } = useUsers();
  const [users, setUsers] = useState([]);
  const [newTeammate, setNewTeammate] = useState("");
  const [open, setOpen] = React.useState(false);

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
        Show Invited Users
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Invited Users</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {teamInvitations?.data?.length > 0 && <h4>Invitations:</h4>}
            {teamInvitations?.data?.map((invitation) => (
              <div key={invitation._id}>{invitation.email}</div>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
