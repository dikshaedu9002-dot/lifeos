
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io } from "socket.io-client";

const LifeOSContext = createContext(null);

const API_URL = "http://localhost:5000/api/expenses";
const SOCKET_URL = "http://localhost:5000";

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

  const [notifications, setNotifications] = useState(0);
  const [notificationList, setNotificationList] = useState([]);

  // Add a new real-time notification
  const addNotification = (title, message) => {
    const newNotification = {
      id: crypto.randomUUID(),
      title,
      message,
      time: new Date().toLocaleTimeString(),
      read: false,
    };

    setNotificationList((current) =>
      [newNotification, ...current].slice(0, 20)
    );

    setNotifications((count) => count + 1);
  };

  // Mark all notifications as read
  const markNotificationsAsRead = () => {
    setNotificationList((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

    setNotifications(0);
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotificationList([]);
    setNotifications(0);
  };

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

  // =========================================
  // EXPENSES - MONGODB + REST API
  // =========================================

  const [expenses, setExpenses] = useState([]);

  // =========================
  // GET EXPENSES
  // =========================

  const fetchExpenses = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // =========================
  // LOAD EXPENSES FROM MONGODB
  // =========================

  useEffect(() => {
    fetchExpenses();
  }, []);

  // =========================================
  // SOCKET.IO - REAL-TIME COMMUNICATION
  // =========================================

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Socket.IO connected:", socket.id);
      fetchExpenses();
    });

    // Real-time expense added event
    socket.on("expenseAdded", (newExpense) => {
      setExpenses((currentExpenses) => {
        const alreadyExists = currentExpenses.some(
          (expense) => expense._id === newExpense._id
        );

        if (alreadyExists) {
          return currentExpenses;
        }

        return [newExpense, ...currentExpenses];
      });

      // Generate real-time notification
      addNotification(
        "New Expense Added",
        `${newExpense.title} — ₹${Number(
          newExpense.amount
        ).toLocaleString("en-IN")} added successfully.`
      );
    });

    // Real-time expense deleted event
    socket.on("expenseDeleted", (deletedId) => {
      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) => expense._id !== deletedId
        )
      );

      // Generate real-time notification
      addNotification(
        "Expense Deleted",
        "An expense was removed from your Money page."
      );
    });

    socket.on("connect_error", (error) => {
      console.error(
        "Socket.IO connection error:",
        error.message
      );
    });

    // Disconnect when provider unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // =========================
  // ADD EXPENSE - POST
  // =========================

  const addExpense = async (expense) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      const newExpense = await response.json();

      setExpenses((currentExpenses) => {
        const alreadyExists = currentExpenses.some(
          (item) => item._id === newExpense._id
        );

        return alreadyExists
          ? currentExpenses
          : [newExpense, ...currentExpenses];
      });

      return newExpense;
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // =========================
  // DELETE EXPENSE - DELETE
  // =========================

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) => expense._id !== id
        )
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
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
      user,

      // Notifications
      notifications,
      setNotifications,
      notificationList,
      setNotificationList,
      addNotification,
      markNotificationsAsRead,
      clearNotifications,

      // Shared spaces
      spaces,
      setSpaces,
      addSpace,
      deleteSpace,

      // Expenses
      expenses,
      setExpenses,
      fetchExpenses,
      addExpense,
      deleteExpense,
      totalExpenses,
    }),
    [
      user,
      notifications,
      notificationList,
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
