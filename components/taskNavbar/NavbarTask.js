import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import Assignement from "../../components/assignements/Assignement";
import useUserData from "../../hooks/useUser";
const NavbarTask = () => {
  const [open, setOpen] = useState(false);
  const { userData } = useUserData();
  const { data: assignements } = useQuery(["tasks", userData?.team], () =>
    getAll({ team: userData?.team })
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button size='small' variant='outlined' onClick={handleClickOpen}>
        Your Assignments
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          {assignements?.map((task) => (
            <div key={task._id}>
              <Link href={`/tasks/${task._id}`}>
                <a>{task.name}</a>
              </Link>
              <pre>{JSON.stringify(task, null, 2)}</pre>
              <Assignement task={task} />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Button size='small' variant='outlined' onClick={handleClickOpen}>
        Your Tasks
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Here are your assignemnt tasks</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NavbarTask;
