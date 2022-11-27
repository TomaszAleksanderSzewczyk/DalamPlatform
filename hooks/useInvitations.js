import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const useTeamData = () => {
  const getAll = useCallback(() => {
    return fetch("/api/invitations").then((res) => res.json());
  }, []);

  const reject = useCallback((id) => {
    return fetch("/api/invitations/" + id, {
      method: "POST",
      data: {
        type: "reject",
      }
    }).then((res) => res.json());
  }, []);

  const accept = useCallback((id) => {
    return fetch("/api/invitations/" + id, {
      method: "POST",
      data: {
        type: "accept",
      }
    }).then((res) => res.json());
  }, []);

  const createOne = useCallback((data) => {
    return fetch(`/api/invitations`, {
      method: "POST",
      body: JSON.stringify(data)
    }).then((res) => res.json());
  }, []);

  return {
    getAll,
    reject,
    accept,
    createOne,
  };
};

export default useTeamData;
