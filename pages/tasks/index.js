import React, {  } from "react";
import Link from "next/link";
import useUserData from "../../hooks/useUser";
import useTaskData from "../../hooks/useTasks";
import TaskForm from "../../components/tasks/TaskForm";
import { useMutation, useQuery } from "react-query";

export default function Teams() {
  const { getAll, deleteOne } = useTaskData();
  const { userData } = useUserData();

  const { data: assignements } = useQuery(["tasks", userData?.team], () => getAll({ team: userData?.team }));
  const { data: created, refetch } = useQuery(["tasks", userData?._id], () => getAll({ owner: userData?._id }));

  const { mutate: deleteTask } = useMutation(deleteOne);
  
  const handleDelete = (id) => {
    deleteTask(id);
    refetch();
  }

  return (
    <div>
      <div>
        Your assignements:
        {assignements?.map((task) => (
          <div key={task._id}>
            <Link href={`/tasks/${task._id}`}>
              <a>{task.name}</a>
            </Link>
            <pre>
              {JSON.stringify(task, null, 2)}
            </pre>
          </div>
        ))}
      </div>

      <div>
        Your tasks:
        {created?.map((task) => (
          <div key={task._id}>
            <Link href={`/tasks/${task._id}`}>
              <a>{task.name}</a>
            </Link>
            <pre>
              {JSON.stringify(task, null, 2)}
            </pre>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
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
