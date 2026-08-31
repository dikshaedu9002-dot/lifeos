import { createContext, useContext, useMemo, useState } from "react";

const LifeOSContext = createContext(null);

export function LifeOSProvider({ children }) {
  const [user] = useState({
    name: "Diksha",
    greeting: "Good evening",
  });

  const [notifications, setNotifications] = useState(3);

  const [spaces, setSpaces] = useState([
    {
      id: 1,
      name: "Talreja Family",
      type: "Family",
      pending: 8,
    },
    {
      id: 2,
      name: "Goa Trip 🌴",
      type: "Trip",
      pending: 5,
    },
    {
      id: 3,
      name: "Semester 5",
      type: "College",
      pending: 4,
    },
  ]);

  const addSpace = (space) => {
    setSpaces((currentSpaces) => [
      ...currentSpaces,
      {
        ...space,
        id: Date.now(),
        pending: 0,
      },
    ]);
  };

  const value = useMemo(
    () => ({
      user,
      notifications,
      setNotifications,
      spaces,
      setSpaces,
      addSpace,
    }),
    [user, notifications, spaces]
  );

  return (
    <LifeOSContext.Provider value={value}>
      {children}
    </LifeOSContext.Provider>
  );
}

export function useLifeOS() {
  const context = useContext(LifeOSContext);

  if (!context) {
    throw new Error(
      "useLifeOS must be used inside LifeOSProvider"
    );
  }

  return context;
}