"use client"
import { useState, useEffect } from 'react';

const useJWT = (initialJwt: string | null) => {
  const [jwt, setJWT] = useState<string | null>(initialJwt);

  useEffect(() => {
    if (!initialJwt) {
      (async () => {
        try {
          const res = await fetch('http://localhost:3000/login/api');
          if (res.status === 200) {
            const data = await res.json();
            console.log(data.cookie);
            setJWT(data.cookie.value)
          }
        } catch (error) {
          console.error("Error al obtener JWT:", error);
        }
      })();
    }
  }, [initialJwt]);

  return { jwt };
};

export default useJWT;
