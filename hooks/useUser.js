import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const useUserData = () => {
  const session = useSession();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(() => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const update = useCallback(
    (data) => {
      return fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .finally(() => refresh());
    },
    [refresh]
  );

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (session) {
      refresh();
    }
  }, [session, refresh]);

  return {
    refresh,
    update,
    userData,
    isLoading,
  };
};

export default useUserData;
