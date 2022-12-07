import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const useOffersData = () => {
  const getOne = useCallback((id) => {
    return fetch("/api/offers/" + id ).then((res) => res.json());
  }, []);

  const getAll = useCallback((query) => {
    return fetch("/api/offers?" + new URLSearchParams(query).toString()).then((res) => res.json());
  }, []);

  const deleteOne = useCallback((id) => {
    return fetch("/api/offers/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
  }, []);

  const update = useCallback((id, data) => {
    return fetch(`/api/offers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }, []);

  const create = useCallback((data) => {
    return fetch(`/api/offers`, {
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

export default useOffersData;
