import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const useTaskData = () => {
  const getOne = useCallback((id) => {
    return fetch("/api/tasks/" + id).then((res) => res.json());
  }, []);

  const getAll = useCallback((query = {}) => {
    return fetch("/api/tasks?" + new URLSearchParams(query).toString()).then(
      (res) => res.json()
    );
  }, []);

  const deleteOne = useCallback((id) => {
    return fetch("/api/tasks/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
  }, []);

  const update = useCallback((id, data) => {
    console.log("data", data);
    console.log("podbilem pod oferte", id);
    return fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }, []);

  const create = useCallback((data) => {
    return fetch(`/api/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }, []);

  return {
    getOne,
    getAll,
    create,
    update,
    deleteOne,
  };
};

export default useTaskData;
