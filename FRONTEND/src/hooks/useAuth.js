// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { getProfile, login } from "../apis/auth";


export function useAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const data = await login(email, password);
    localStorage.setItem("token", data.token); // save JWT
    setUser(data.user);
  };

  const loadUser = async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return { user, signIn, loadUser };


  // this was  custom  hook  before  applying the redux toolkit  now  we  have  the redux  store  to  manage  the  auth  state and  other  states
}
