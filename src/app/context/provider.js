"use client"
import { useEffect, useState } from "react"
import { currentuser } from "../services/Add_user"
import { UserContext } from "./usecontext"


export const UserProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchUser = async () => {
    try {
      const currentUser = await currentuser();
      setuser(currentUser);
    } catch (error) {
      setuser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    const handleFocus = () => fetchUser();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <UserContext.Provider value={{ user, setuser, refetchUser: fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};