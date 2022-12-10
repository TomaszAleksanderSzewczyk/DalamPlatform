import React from "react";
import Link from "next/link";
import useUserData from "../../hooks/useUser";
import useTaskData from "../../hooks/useTasks";
import TaskForm from "../../components/tasks/TaskForm";
import { useMutation, useQuery } from "react-query";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import NavbarTask from "../../components/taskNavbar/navbarTask";
import Assignement from "../../components/assignements/Assignement";
export default function Teams() {
  const { getAll, deleteOne } = useTaskData();
  const { userData } = useUserData();

  const { data: assignements } = useQuery(["tasks", userData?.team], () =>
    getAll({ team: userData?.team })
  );
  const { data: created, refetch } = useQuery(["tasks", userData?._id], () =>
    getAll({ owner: userData?._id })
  );

  const { mutate: deleteTask } = useMutation(deleteOne);

  const handleDelete = (id) => {
    deleteTask(id);
    refetch();
  };

  return (
    <div>
      <NavbarTask />
      <div>
        Your assignements:
        {assignements?.map((task) => (
          <div key={task._id}>
            <Link href={`/tasks/${task._id}`}>
              <a>{task.name}</a>
            </Link>
            <pre>{JSON.stringify(task, null, 2)}</pre>
            <Assignement task={task} />
          </div>
        ))}
      </div>

      <div>
        Your tasks:
        {created?.map((task) => (
          <div key={task._id}>
            <div>
              <Card
                sx={{
                  minWidth: 275,
                  marginBottom: 2,
                  marginTop: 2,
                  background: "#F3F2EF",
                  border: 1,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color='text.secondary'
                    gutterBottom
                  >
                    Task {task._id}
                  </Typography>
                  <Typography variant='h5' component='div'></Typography>
                  <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    <Link href={`/tasks/${task._id}`}>
                      <a>{task.name}</a>
                    </Link>
                  </Typography>
                  <Typography variant='body2'>{task.description}</Typography>
                  <Typography variant='body2'>
                    {" "}
                    Salary: {`${task.salary ? task.salary : "Undefined"} $`}
                  </Typography>
                  <Typography variant='body2'>
                    {" "}
                    Completed? {`${task.isCompleted === false ? "NO" : "YES"}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleDelete(task._id)}>Delete</Button>
                </CardActions>
              </Card>
            </div>
          </div>
        ))}
      </div>

      <div>
        Create new task:
        <div>
          <TaskForm />
        </div>
      </div>
    </div>
  );
}
