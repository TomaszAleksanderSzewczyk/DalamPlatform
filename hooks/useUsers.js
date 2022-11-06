import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const useUsers = () => {
  const getAll = useCallback((data) => {
    return fetch("/api/users").then((res) => res.json());
  }, []);

  return {
    getAll,
  };
};

export default useUsers;
