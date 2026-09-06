import { createContext, useContext, useMemo, useState } from "react";

const LifeOSContext = createContext(null);

export function LifeOSProvider({ children }) {

  // =========================
  // USER STATE
  // =========================

  const [user] = useState({
    name: "Diksha",
    greeting: "Good evening",
  });


  // =========================
  // NOTIFICATION STATE
  // =========================

  const [notifications, setNotifications] = useState(3);


  // =========================
  // SHARED SPACES STATE
  // =========================

  const [spaces, setSpaces] = useState([
    {
      id: 1,
      title: "Talreja Family",
      type: "Family",
      icon: "👨‍👩‍👧",
      description: "Our shared family space for all important things.",
      pending: 8,
      members: 4,
      color: "from-emerald-100 to-green-50",
    },

    {
      id: 2,
      title: "Goa Trip 🌴",
      type: "Trip",
      icon: "🏕️",
      description: "All trip plans, bookings and things to remember.",
      pending: 5,
      members: 6,
      color: "from-orange-100 to-amber-50",
    },

    {
      id: 3,
      title: "Semester 5",
      type: "College",
      icon: "🎓",
      description: "Deadlines, assignments and important notes.",
      pending: 4,
      members: 6,
      color: "from-violet-100 to-purple-50",
    },

    {
      id: 4,
      title: "Riya's Birthday 🎉",
      type: "Event",
      icon: "🎂",
      description: "Birthday party planning and arrangements.",
      pending: 3,
      members: 3,
      color: "from-pink-100 to-rose-50",
    },

    {
      id: 5,
      title: "Manali Camping 🏕️",
      type: "Trip",
      icon: "🏔️",
      description: "Camping checklist, gear and travel details.",
      pending: 6,
      members: 4,
      color: "from-sky-100 to-emerald-50",
    },
  ]);


  // =========================
  // ADD SPACE
  // =========================

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


  // =========================
  // DELETE SPACE
  // =========================

  const deleteSpace = (id) => {
    setSpaces((currentSpaces) =>
      currentSpaces.filter((space) => space.id !== id)
    );
  };


  // =========================
  // SHARED EXPENSES STATE
  // =========================

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Electricity Bill",
      amount: 2500,
      category: "Bills",
    },

    {
      id: 2,
      title: "Mobile Recharge",
      amount: 599,
      category: "Bills",
    },

    {
      id: 3,
      title: "Groceries",
      amount: 3500,
      category: "Food",
    },
  ]);


  // =========================
  // ADD EXPENSE
  // =========================

  const addExpense = (expense) => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      {
        ...expense,
        id: Date.now(),
      },
    ]);
  };


  // =========================
  // DELETE EXPENSE
  // =========================

  const deleteExpense = (id) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );
  };


  // =========================
  // TOTAL EXPENSES
  // =========================

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );


  // =========================
  // CONTEXT VALUE
  // =========================

  const value = useMemo(
    () => ({
      // User
      user,

      // Notifications
      notifications,
      setNotifications,

      // Spaces
      spaces,
      setSpaces,
      addSpace,
      deleteSpace,

      // Expenses
      expenses,
      setExpenses,
      addExpense,
      deleteExpense,
      totalExpenses,
    }),
    [
      user,
      notifications,
      spaces,
      expenses,
      totalExpenses,
    ]
  );


  // =========================
  // PROVIDER
  // =========================

  return (
    <LifeOSContext.Provider value={value}>
      {children}
    </LifeOSContext.Provider>
  );
}


// =========================
// CUSTOM HOOK
// =========================

export function useLifeOS() {

  const context = useContext(LifeOSContext);

  if (!context) {
    throw new Error(
      "useLifeOS must be used inside LifeOSProvider"
    );
  }

  return context;
}