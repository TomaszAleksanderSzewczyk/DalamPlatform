import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const useTeamData = () => {
  const getOne = useCallback((id) => {
    return fetch("/api/teams/" + id).then((res) => res.json());
  }, []);

  const getAll = useCallback(() => {
    return fetch("/api/teams").then((res) => res.json());
  }, []);

  const update = useCallback((id, data) => {
    return fetch(`/api/teams/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => res.json(data));
  }, []);

  const create = useCallback((data) => {
    return fetch(`/api/teams`, {
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
  };
};

export default useTeamData;
