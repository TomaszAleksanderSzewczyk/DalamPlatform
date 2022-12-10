import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

const useUserData = () => {
  const session = useSession();
  console.log(session);
  const { data: userData, isLoading, refetch } = useQuery(
    ["user", session?.user?.id],
    () => fetch("/api/user")
      .then((res) => res.json())
  );
  const getOneFromList = useCallback((id) => {
    return fetch("/api/listUser/" + id).then((res) => res.json());
  }, []);

  const update = useCallback(
    (data) => {
      return fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .finally(() => refetch());
    },
    [refetch]
  );

  return {
    refetch,
    update,
    userData,
    isLoading,
    isLogged: userData?._id && session,
    getOneFromList,
  };
};

export default useUserData;
