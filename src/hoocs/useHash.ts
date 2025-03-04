'use client';
import { useEffect, useState } from "react";

export const useHash = () => {
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (window) {
      setHash(window.location.hash);
      //@ts-ignore
      const onHashChange = (e) => {
        // e.preventDefault();
        setHash(window.location.hash);
      };
      window.addEventListener('hashchange', onHashChange);
      return () => window.removeEventListener('hashchange', onHashChange);
    }
  }, []);

  return hash.slice(1);
};