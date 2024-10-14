/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "3XmXh@example.com",
  });

  const handleChangeName = (e) => {
    setUser({ ...user, name: e });
  };

  return (
    <UserContext.Provider value={{ user, handleChangeName }}>
      {children}
    </UserContext.Provider>
  );
};
