import { useLifeOS } from "./context/LifeOSContext.jsx";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect, useState } from "react";


/* =========================================================
   LIFEOS NAVIGATION
========================================================= */

const menuItems = [
  { id: "dashboard", icon: "⌂", label: "Dashboard" },
  { id: "buddy", icon: "✦", label: "Buddy" },
  { id: "money", icon: "₹", label: "Money" },
  { id: "tasks", icon: "✓", label: "Tasks" },
  { id: "documents", icon: "▤", label: "Documents" },
  { id: "home", icon: "⌂", label: "Home" },
  { id: "spaces", icon: "♧", label: "Spaces" },
]


/* =========================================================
   APP
========================================================= */
function App() {
  const [page, setPage] = useState("landing");

  if (page === "landing") {
    return (
      <LandingPage
        startApp={() => setPage("dashboard")}
      />
    );
  }

  return (
    <Dashboard
      page={page}
      setPage={setPage}
      goHome={() => setPage("landing")}
    />
  );
}

/* =========================================================
   LOGIN PAGE
========================================================= */

function LoginPage({ onLogin, goHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      onLogin(data.token);
    } catch (error) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">

      {/* LEFT SIDE */}
      <div className="hidden flex-1 bg-slate-950 p-14 text-white lg:flex lg:flex-col">

        <button
          onClick={goHome}
          className="flex w-fit items-center gap-3"
        >
          <LifeLogo />

          <div className="text-left">
            <p className="text-xl font-bold">LifeOS</p>
            <p className="text-xs text-slate-400">
              Your life, organized.
            </p>
          </div>
        </button>

        <div className="mt-20 max-w-2xl">

  <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">
    LIFE, ORGANIZED
  </p>

  <h1 className="mt-5 text-5xl font-bold leading-tight">
    One place for the things
    <span className="block text-slate-400">
      you normally manage separately.
    </span>
  </h1>

  <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
    Money, tasks, documents, home, and shared plans —
    organized together so life feels a little easier to manage.
  </p>


  {/* Motivational Row */}
  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-slate-200">

    <div className="flex items-center gap-2">
      <span className="text-xl text-indigo-300">✧</span>
      <span>Plan smarter</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="text-xl text-indigo-300">✓</span>
      <span>Stay organized</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="text-xl text-indigo-300">▥</span>
      <span>Make progress</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="text-xl text-indigo-300">♡</span>
      <span>Live better</span>
    </div>

  </div>

</div>

</div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">

        <div className="w-full max-w-md">

          <button
            onClick={goHome}
            className="mb-10 flex items-center gap-3 lg:hidden"
          >
            <LifeLogo />
            <span className="text-xl font-bold">
              LifeOS
            </span>
          </button>


          <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
            Sign in
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            Welcome back
          </h2>

          <p className="mt-3 text-slate-500">
            Enter your account details to continue to LifeOS.
          </p>


          <form
            onSubmit={handleLogin}
            className="mt-9 space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </div>


            {/* PASSWORD */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </div>


            {/* ERROR MESSAGE */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                ⚠ {error}
              </div>
            )}


            {/* LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-indigo-600 px-5 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in to LifeOS →"}
            </button>

          </form>


          <button
            onClick={goHome}
            className="mt-7 w-full text-center text-sm font-semibold text-slate-400 transition hover:text-slate-700"
          >
            ← Back to home
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */

function LandingPage({ startApp }) {

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-950">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex min-h-[76px] w-full max-w-[1800px] items-center justify-between px-6 sm:px-10 lg:px-16">

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-3"
          >

            <LifeLogo />

            <div className="hidden text-left sm:block">

              <p className="text-xl font-bold tracking-tight">
                LifeOS
              </p>

              <p className="text-xs text-slate-400">
                Your life, organized.
              </p>

            </div>

          </button>


          <div className="hidden items-center gap-10 md:flex">

            <a
              href="#features"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-950"
            >
              Features
            </a>

            <a
              href="#how"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-950"
            >
              How it works
            </a>

            <button
              onClick={startApp}
              className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Get Started
            </button>

          </div>


          <button
            onClick={startApp}
            className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white md:hidden"
          >
            Start
          </button>

        </div>

      </nav>


      {/* Hero */}
      <section className="flex min-h-[calc(100vh-76px)] items-center px-6 py-16 sm:px-10 lg:px-16">

        <div className="mx-auto grid w-full max-w-[1800px] items-center gap-16 xl:grid-cols-[1.05fr_0.95fr]">

          <div className="max-w-4xl">

            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm">

              <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />

              Your personal life companion

            </div>


            <h1 className="text-6xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-8xl">

              Your life is complicated.

              <span className="mt-4 block text-slate-400">
                Managing it shouldn't be.
              </span>

            </h1>


            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl lg:text-2xl">

              LifeOS brings your money, tasks, plans,
              documents, reminders and everyday decisions
              into one intelligent place.

            </p>


            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <button
                onClick={startApp}
                className="rounded-2xl bg-slate-950 px-8 py-5 text-lg font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-slate-800"
              >
                Enter LifeOS →
              </button>

              <a
                href="#how"
                className="rounded-2xl border border-slate-300 bg-white px-8 py-5 text-center text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                See how it works
              </a>

            </div>


            <p className="mt-8 text-sm font-semibold text-slate-400">
              Before you decide, ask Buddy.
            </p>

          </div>


          {/* Buddy Preview */}
          <div className="w-full">

            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70 sm:p-8">

              <div className="flex items-center gap-4 border-b border-slate-100 pb-6">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl text-white">
                  ✦
                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Buddy
                  </h2>

                  <p className="text-sm text-slate-400">
                    Your personal decision companion
                  </p>

                </div>

                <div className="ml-auto flex items-center gap-2 text-sm text-slate-400">

                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                  Ready

                </div>

              </div>


              <div className="space-y-5 py-7">

                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-slate-100 p-5">

                  <p className="font-medium">
                    Can I buy a ₹50,000 phone this month?
                  </p>

                </div>


                <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-slate-200 p-5">

                  <p className="leading-7 text-slate-600">

                    Based on your planned expenses and
                    savings goal, you can afford it.
                    However, the purchase would reduce
                    your planned savings this month.

                  </p>


                  <div className="mt-5 rounded-xl bg-slate-50 p-4">

                    <div className="flex justify-between text-sm text-slate-400">

                      <span>
                        Projected savings
                      </span>

                      <span>
                        After purchase
                      </span>

                    </div>

                    <p className="mt-2 text-2xl font-bold">
                      ₹25,000
                    </p>

                  </div>

                </div>

              </div>


              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3">

                <span className="flex-1 px-2 text-sm text-slate-400">
                  Ask Buddy anything...
                </span>

                <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                  ↑
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section
        id="features"
        className="border-t border-slate-200 bg-white px-6 py-28 sm:px-10 lg:px-16"
      >

        <div className="mx-auto max-w-[1800px]">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            Everything connected
          </p>

          <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">

            One place for the things you normally manage separately.

          </h2>


          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <Feature
              icon="₹"
              title="Money"
              text="Understand spending, savings and future purchases."
            />

            <Feature
              icon="✓"
              title="Tasks"
              text="Keep deadlines, responsibilities and commitments together."
            />

            <Feature
              icon="▤"
              title="Memory"
              text="Keep important documents and information searchable."
            />

            <Feature
              icon="♧"
              title="Spaces"
              text="Organize family, trips, college and shared plans."
            />

          </div>

        </div>

      </section>


      {/* How it works */}
      <section
        id="how"
        className="border-t border-slate-200 bg-[#f8f9fc] px-6 py-28 sm:px-10 lg:px-16"
      >

        <div className="mx-auto max-w-[1800px]">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            How it works
          </p>

          <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">

            You ask. Buddy understands.
            LifeOS helps you decide.

          </h2>


          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <Step
              number="01"
              title="Tell LifeOS"
              text="Add the information that matters to you — expenses, plans, tasks, documents and commitments."
            />

            <Step
              number="02"
              title="Ask Buddy"
              text="Ask everyday questions naturally instead of searching through different apps."
            />

            <Step
              number="03"
              title="Make better decisions"
              text="Understand how a decision could affect your plans, money and responsibilities."
            />

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="bg-slate-950 px-6 py-28 text-white sm:px-10 lg:px-16">

        <div className="mx-auto max-w-5xl text-center">

          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">

            Before you decide,

            <span className="block text-slate-400">
              ask Buddy.
            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">

            Your information.
            Your plans.
            Your decisions.
            One intelligent place.

          </p>


          <button
            onClick={startApp}
            className="mt-10 rounded-2xl bg-white px-9 py-5 text-lg font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-slate-100"
          >
            Enter LifeOS →
          </button>

        </div>

      </section>

    </div>
  )
}


/* =========================================================
   DASHBOARD SHELL
========================================================= */

function Dashboard({ page, setPage, goHome, onLogout }) {
 const {
  user,
  notifications,
  spaces,
  totalExpenses,
} = useLifeOS();
  const currentItem =
    menuItems.find((item) => item.id === page) || menuItems[0]

  const [search, setSearch] = useState("")

  return (

    <div className="min-h-screen bg-[#f7f8fc] text-slate-950">


      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-0 hidden h-screen w-[218px] border-r border-slate-200 bg-white lg:block">

        <div className="flex h-full flex-col">


          {/* Logo */}
          <div className="px-6 py-7">

            <button
              onClick={goHome}
              className="flex items-center gap-3"
            >

              <LifeLogo />

              <div className="text-left">

                <p className="text-xl font-bold tracking-tight">
                  LifeOS
                </p>

                <p className="text-[11px] text-slate-400">
                  Your life, organized.
                </p>

              </div>

            </button>

          </div>


          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto px-3">

            {menuItems.map((item) => (

              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`mb-1.5 flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition ${
                  page === item.id
                    ? "bg-[#eef0ff] text-indigo-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-base ${
                    page === item.id
                      ? "bg-indigo-100"
                      : "bg-transparent"
                  }`}
                >
                  {item.icon}
                </span>

                {item.label}

              </button>

            ))}


            {/* Extra Space shortcuts */}
            <div className="mt-5 border-t border-slate-100 pt-5">

              <p className="px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Shared
              </p>


              <button
                onClick={() => setPage("spaces")}
                className="mt-3 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
              >

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                  👨‍👩‍👧
                </span>

                Family Space

                <span className="ml-auto rounded-full bg-rose-100 px-2 py-1 text-[9px] font-bold text-rose-500">
                  NEW
                </span>

              </button>


              <button
                onClick={() => setPage("spaces")}
                className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
              >

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                  🏕️
                </span>

                Trips & Camping

              </button>

            </div>

          </nav>


         {/* Bottom Actions */}
<div className="shrink-0 border-t border-slate-100 bg-white p-3">

  <button
    onClick={() => setPage("money")}
    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
  >
    <span className="text-lg">₹</span>
    Add Expense
  </button>

  <button
    onClick={onLogout}
    className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-bold text-red-500 transition hover:bg-red-50"
  >
    <span className="text-lg">↪</span>
    Logout
  </button>

</div>

        </div>

      </aside>

      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden">

        <div className="flex items-center justify-between px-5 py-4">

          <button
            onClick={goHome}
            className="flex items-center gap-2"
          >

            <LifeLogo small />

            <span className="text-xl font-bold">
              LifeOS
            </span>

          </button>


          <div className="flex items-center gap-3">

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200">
              ♧
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
              D
            </div>

          </div>

        </div>


        <div className="overflow-x-auto border-t border-slate-100">

          <div className="flex min-w-max gap-2 px-4 py-3">

            {menuItems.map((item) => (

              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  page === item.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >

                {item.icon} {item.label}

              </button>

            ))}

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="lg:ml-[218px]">


        {/* Top Bar */}
        <header className="hidden border-b border-slate-200 bg-white px-8 py-5 lg:block">

          <div className="flex items-center gap-8">


            {/* Search */}
            <div className="relative max-w-[555px] flex-1">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-24 text-sm outline-none transition focus:border-indigo-300 focus:bg-white"
                placeholder="Search anything... (bills, tasks, docs, plans, people...)"
              />

              {search && (
  <p className="mt-2 px-2 text-xs text-slate-400">
    Searching LifeOS for: <span className="font-semibold text-indigo-600">{search}</span>
  </p>
)}

              <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-400 shadow-sm">
                Ctrl + K
              </span>

            </div>


            <div className="ml-auto flex items-center gap-5">

              <button className="relative flex h-11 w-11 items-center justify-center rounded-xl text-xl text-slate-500 transition hover:bg-slate-50">

                ♧

                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />

              </button>


              <button className="flex h-11 w-11 items-center justify-center rounded-xl text-xl text-slate-500 transition hover:bg-slate-50">
                ☼
              </button>


              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white">
                  D
                </div>

                <div>

                  <p className="text-sm font-semibold">
                    Good evening,
                  </p>

                  <p className="text-sm font-bold">
                    Diksha 👋
                  </p>

                </div>

              </div>

            </div>

          </div>

        </header>


        {/* Page */}
        <div className="min-h-[calc(100vh-80px)] px-5 py-7 sm:px-8 lg:px-8 xl:px-10">

          <div className="mx-auto w-full max-w-[1600px]">

            {page === "dashboard" && <DashboardHome
  setPage={setPage}
  totalExpenses={totalExpenses}
/>}

            {page === "buddy" && <BuddyPage />}

            {page === "money" && <MoneyPage />}

            {page === "tasks" && <TasksPage />}

            {page === "documents" && <DocumentsPage />}

            {page === "home" && <HomeManagementPage />}

            {page === "spaces" && <SpacesPage />}

          </div>

        </div>

      </main>

    </div>
  )
}


/* =========================================================
   DASHBOARD HOME
========================================================= */

function DashboardHome({ setPage, totalExpenses }) {

  return (
    <div className="space-y-7">


      <section>

        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
          Overview
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Good evening, Diksha 👋
        </h2>

        <p className="mt-2 text-slate-500">
          Here's what needs your attention today.
        </p>

      </section>


      {/* Stats */}
      <section className="grid gap-5 md:grid-cols-3">

        <DashboardStat
          icon="₹"
          label="Monthly Income"
          value="₹60,000"
          text="Expected this month"
        />

        <DashboardStat
          icon="↗"
          label="Expenses"
          value={`₹${totalExpenses.toLocaleString()}`}
          text="From shared state"
        />

        <DashboardStat
          icon="◈"
          label="Planned Savings"
          value="₹25,000"
          text="Before additional spending"
        />

      </section>


      {/* Buddy */}
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl sm:p-9">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl text-slate-950">
            ✦
          </div>

          <div>

            <h2 className="text-xl font-bold">
              Ask Buddy
            </h2>

            <p className="text-sm text-slate-400">
              Your personal decision companion.
            </p>

          </div>

        </div>


        <div className="mt-7 flex flex-col gap-3 sm:flex-row">

          <input
            className="min-h-14 flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-5 text-white outline-none placeholder:text-slate-500 focus:border-slate-500"
            placeholder="Can I afford a ₹50,000 phone?"
          />

          <button
            onClick={() => setPage("buddy")}
            className="rounded-2xl bg-white px-7 font-bold text-slate-950 transition hover:bg-slate-200"
          >
            Ask Buddy
          </button>

        </div>

      </section>


      {/* Bottom */}
      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">

        <Panel title="Upcoming">

          <div className="space-y-3">

            <Upcoming
              icon="🎓"
              title="DBMS Submission"
              type="College"
              time="Tomorrow"
            />

            <Upcoming
              icon="⚡"
              title="Electricity Bill"
              type="Payment"
              time="3 days"
            />

            <Upcoming
              icon="🔧"
              title="AC Service"
              type="Home"
              time="12 days"
            />

          </div>

        </Panel>


        <Panel title="Quick Actions">

          <div className="grid grid-cols-2 gap-3">

            <QuickAction icon="₹" text="Add Expense" />

            <QuickAction icon="✓" text="Add Task" />

            <QuickAction icon="▤" text="Upload Document" />

            <QuickAction
              icon="+"
              text="Create Space"
              onClick={() => setPage("spaces")}
            />

          </div>

        </Panel>

      </section>

    </div>
  )
}


/* =========================================================
   SPACES
========================================================= */
function SpacesPage() {
  const [filter, setFilter] = useState("All");
  const [showCreate, setShowCreate] = useState(false);

  const [spaceName, setSpaceName] = useState("");
  const [spaceType, setSpaceType] = useState("Family");

  const {
    spaces,
    addSpace,
    deleteSpace,
  } = useLifeOS();

  const filters = [
    "All",
    "Family",
    "Trip",
    "College",
    "Event",
    "Other",
  ];

  const filteredSpaces =
    filter === "All"
      ? spaces
      : spaces.filter((space) => space.type === filter);

  function handleCreateSpace() {
    if (!spaceName.trim()) return;

    const icons = {
      Family: "👨‍👩‍👧",
      Trip: "🏕️",
      College: "🎓",
      Event: "🎉",
      Other: "✨",
    };

    const colors = {
      Family: "from-emerald-100 to-green-50",
      Trip: "from-orange-100 to-amber-50",
      College: "from-violet-100 to-purple-50",
      Event: "from-pink-100 to-rose-50",
      Other: "from-indigo-100 to-violet-50",
    };

    const newSpace = {
      title: spaceName.trim(),
      type: spaceType,
      icon: icons[spaceType],
      description: `A shared ${spaceType.toLowerCase()} space for plans, reminders and important things.`,
      members: 1,
      color: colors[spaceType],
    };

    addSpace(newSpace);

    setSpaceName("");
    setSpaceType("Family");
    setShowCreate(false);
    setFilter("All");
  }

  function closeCreateModal() {
    setShowCreate(false);
    setSpaceName("");
    setSpaceType("Family");
  }

  return (
    <div className="space-y-7">

      {/* Header */}
      <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
            Shared Life
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Spaces
          </h2>

          <p className="mt-2 max-w-2xl text-slate-500">
            Organize life together in shared spaces.
            Keep everyone on the same page.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="w-fit rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          + Create Space
        </button>
      </section>


      {/* Filters */}
      <div className="flex items-center justify-between gap-4">

        <div className="flex gap-2 overflow-x-auto pb-1">

          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                filter === item
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "bg-white text-slate-500 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-200 bg-white text-indigo-600">
            ▦
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400">
            ☷
          </button>
        </div>

      </div>


      {/* Content */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_255px]">

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">

          {filteredSpaces.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              onDelete={deleteSpace}
            />
          ))}


          {/* Create Card */}
          <button
            onClick={() => setShowCreate(true)}
            className="group flex min-h-[360px] flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 bg-white p-8 text-center transition hover:border-indigo-300 hover:bg-indigo-50/30"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl text-indigo-500 transition group-hover:scale-110 group-hover:bg-indigo-100">
              +
            </div>

            <h3 className="mt-6 text-xl font-bold">
              Create New Space
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
              Create a space for family, trips,
              college or any event.
            </p>

            <span className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100">
              + Create Space
            </span>

          </button>

        </div>


        {/* Right column */}
        <div className="space-y-5">

          {/* Upcoming */}
          <Panel
            title="Upcoming across spaces"
            action="View all"
          >
            <div className="space-y-2">

              <SpaceReminder
                icon="⚡"
                title="Electricity Bill"
                space="Talreja Family"
                date="Tomorrow"
                badge="orange"
              />

              <SpaceReminder
                icon="🎓"
                title="College Fees Deadline"
                space="Semester 5"
                date="5 Sep"
                badge="green"
              />

              <SpaceReminder
                icon="💧"
                title="Water Purifier Service"
                space="Talreja Family"
                date="12 Sep"
                badge="blue"
              />

              <SpaceReminder
                icon="🏨"
                title="Hotel Check-in"
                space="Goa Trip"
                date="15 Sep"
                badge="purple"
              />

              <SpaceReminder
                icon="✈️"
                title="Train Tickets"
                space="Manali Camping"
                date="18 Sep"
                badge="pink"
              />

            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-950">
              + Add Reminder
            </button>
          </Panel>


          {/* Quick actions */}
          <Panel title="Quick actions">

            <div className="space-y-2">

              <SpaceQuickAction
                icon="👥"
                title="Create Space"
                text="Make a new shared space"
                onClick={() => setShowCreate(true)}
              />

              <SpaceQuickAction
                icon="🧑‍🤝‍🧑"
                title="Invite People"
                text="Add members to a space"
              />

              <SpaceQuickAction
                icon="⚙"
                title="Manage Spaces"
                text="Edit and manage spaces"
              />

            </div>

          </Panel>


          {/* Information card */}
          <div className="hidden overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-50 to-sky-50 p-6 lg:block">

            <p className="text-sm font-bold leading-6 text-slate-700">
              Spaces bring people together
              and keep everyone on track.
            </p>

            <button className="mt-4 text-sm font-bold text-indigo-600">
              Learn more →
            </button>

          </div>

        </div>

      </div>


      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  New Space
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Create a shared space
                </h3>
              </div>

              <button
                onClick={closeCreateModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
              >
                ×
              </button>

            </div>


            {/* Space name */}
            <div className="mt-7">

              <label className="text-sm font-bold text-slate-700">
                Space Name
              </label>

              <input
                type="text"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                placeholder="e.g. Goa Trip, Family, Project..."
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>


            {/* Space type */}
            <div className="mt-5">

              <label className="text-sm font-bold text-slate-700">
                Space Type
              </label>

              <div className="mt-3 grid grid-cols-2 gap-2">

                {[
                  ["Family", "👨‍👩‍👧"],
                  ["Trip", "🏕️"],
                  ["College", "🎓"],
                  ["Event", "🎉"],
                  ["Other", "✨"],
                ].map(([type, icon]) => (

                  <button
                    key={type}
                    onClick={() => setSpaceType(type)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      spaceType === type
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {icon} {type}
                  </button>

                ))}

              </div>

            </div>


            {/* Create button */}
            <button
              onClick={handleCreateSpace}
              disabled={!spaceName.trim()}
              className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create Space
            </button>

          </div>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   SPACE CARD
========================================================= */

function SpaceCard({ space, onDelete }) {

  function handleDelete(e) {
    e.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete "${space.title}"?`
    );

    if (confirmed) {
      onDelete(space.id);
    }
  }

  return (
    <div className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      {/* Illustration */}
      <div
        className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${space.color}`}
      >

        <div className="absolute -right-5 -top-10 h-32 w-32 rounded-full bg-white/30" />

        <div className="absolute -bottom-14 -left-5 h-32 w-32 rounded-full bg-white/20" />

        <div className="relative text-7xl drop-shadow-sm transition duration-300 group-hover:scale-110">
          {space.icon}
        </div>

        {/* Type */}
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
          {space.type}
        </span>

        {/* DELETE BUTTON */}
        <button
          onClick={handleDelete}
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-sm shadow-sm transition hover:bg-red-50 hover:text-red-500"
          title="Delete space"
        >
          🗑️
        </button>

        {/* Icon bubble */}
        <div className="absolute bottom-[-18px] left-5 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-white text-2xl shadow-md">
          {space.icon}
        </div>

      </div>


      {/* Details */}
      <div className="p-6 pt-8">

        <div className="flex items-start justify-between gap-3">

          <h3 className="text-xl font-bold">
            {space.title}
          </h3>

          <div className="text-right">

            <p className="text-lg font-bold text-indigo-600">
              {space.pending}
            </p>

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Pending
            </p>

          </div>

        </div>


        <p className="mt-3 min-h-[50px] text-sm leading-6 text-slate-500">
          {space.description}
        </p>


        {/* Members */}
        <div className="mt-6 flex items-center">

          <div className="flex -space-x-2">

            <Avatar letter="D" />
            <Avatar letter="A" />
            <Avatar letter="R" />

            {space.members > 3 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-bold text-slate-500">
                +{space.members - 3}
              </div>
            )}

          </div>

        </div>


        <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">

          <span>
            {space.members} members
          </span>

          <span>
            Updated recently
          </span>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   BUDDY
========================================================= */

function BuddyPage() {

  return (

    <div className="space-y-7">

      <PageIntro
        eyebrow="Personal Companion"
        title="Ask Buddy."
        text="Ask everyday questions and use your LifeOS information to make better decisions."
      />


      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">


        <div className="rounded-[2rem] bg-white p-7 shadow-sm sm:p-10">

          <div className="space-y-5">

            <div className="ml-auto max-w-xl rounded-2xl bg-slate-100 p-5">
              Can I buy a ₹50,000 phone this month?
            </div>


            <div className="max-w-2xl rounded-2xl border border-slate-200 p-5 leading-7 text-slate-600">

              Based on your current income, planned expenses
              and savings goal, you can afford it. However,
              the purchase would reduce your planned savings
              this month.

              <div className="mt-5 rounded-xl bg-slate-50 p-4">

                <div className="flex justify-between text-sm text-slate-400">

                  <span>
                    Projected savings
                  </span>

                  <span>
                    After purchase
                  </span>

                </div>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  ₹25,000
                </p>

              </div>

            </div>

          </div>


          <div className="mt-8 flex gap-3">

            <input
              className="min-h-14 flex-1 rounded-xl border border-slate-200 px-5 outline-none focus:border-indigo-300"
              placeholder="Ask Buddy..."
            />

            <button className="rounded-xl bg-slate-950 px-7 font-bold text-white">
              Ask
            </button>

          </div>

        </div>


        <div className="rounded-[2rem] bg-slate-950 p-7 text-white">

          <p className="text-sm font-semibold text-slate-400">
            Try asking
          </p>

          <div className="mt-5 space-y-3">

            <Suggestion text="Can I afford this?" />
            <Suggestion text="What am I forgetting?" />
            <Suggestion text="What do I need to do today?" />
            <Suggestion text="What bills are due soon?" />

          </div>

        </div>

      </div>

    </div>
  )
}


/* =========================================================
   MONEY
========================================================= */

function MoneyPage() {
  const {
    expenses,
    addExpense,
    deleteExpense,
    totalExpenses,
  } = useLifeOS();

  const [newExpense, setNewExpense] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState("Other");

  function handleAddExpense() {
    if (!newExpense.trim() || !newAmount) return;

    addExpense({
      title: newExpense,
      amount: Number(newAmount),
      category: newCategory,
    });

    setNewExpense("");
    setNewAmount("");
    setNewCategory("Other");
  }

  const income = 60000;
  const savings = income - totalExpenses;

  return (
    <div className="space-y-7">

      <PageIntro
        eyebrow="Financial Overview"
        title="Your Money"
        text="Understand where your money is going and how today's decisions affect tomorrow."
      />

      {/* Financial Summary */}
      <div className="grid gap-5 md:grid-cols-3">

        <DashboardStat
          icon="₹"
          label="Income"
          value={`₹${income.toLocaleString()}`}
          text="This month"
        />

        <DashboardStat
          icon="↗"
          label="Expenses"
          value={`₹${totalExpenses.toLocaleString()}`}
          text="From shared state"
        />

        <DashboardStat
          icon="◈"
          label="Savings"
          value={`₹${savings.toLocaleString()}`}
          text="Projected"
        />

      </div>

      {/* Add Expense */}
      <Panel title="Add Expense">

        <div className="grid gap-3 md:grid-cols-4">

          <input
            value={newExpense}
            onChange={(e) => setNewExpense(e.target.value)}
            placeholder="Expense name"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-300"
          />

          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="Amount"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-300"
          />

          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-300"
          >
            <option>Bills</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Other</option>
          </select>

          <button
            onClick={handleAddExpense}
            className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            + Add Expense
          </button>

        </div>

      </Panel>

      {/* Expense List */}
      <Panel title="Recent Expenses">

        <div className="space-y-3">

          {expenses.map((expense) => (

            <div
              key={expense._id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >

              <div>
                <p className="font-semibold text-slate-900">
                  {expense.title}
                </p>

                <p className="text-xs text-slate-500">
                  {expense.category}
                </p>
              </div>

              <div className="flex items-center gap-4">

                <span className="font-semibold text-slate-900">
                  ₹{Number(expense.amount).toLocaleString()}
                </span>

                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="text-xs font-semibold text-red-500 hover:text-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </Panel>

      {/* Existing Sections */}
      <div className="grid gap-6 lg:grid-cols-2">

        <Panel title="Monthly Spending">

          <div className="space-y-6">

            <ProgressItem
              name="Food"
              amount="₹8,000"
              percentage="23%"
            />

            <ProgressItem
              name="Bills"
              amount="₹5,000"
              percentage="14%"
            />

            <ProgressItem
              name="Travel"
              amount="₹4,000"
              percentage="11%"
            />

            <ProgressItem
              name="Other"
              amount="₹18,000"
              percentage="52%"
            />

          </div>

        </Panel>

        <Panel title="Planned Purchases">

          <div className="space-y-3">

            <Purchase
              name="New Phone"
              amount="₹50,000"
            />

            <Purchase
              name="College Supplies"
              amount="₹5,000"
            />

            <Purchase
              name="Trip"
              amount="₹15,000"
            />

          </div>

        </Panel>

      </div>

    </div>
  );
}

/* =========================================================
   TASKS
========================================================= */

function TasksPage() {
  const [tasks, setTasks] = useLocalStorage("lifeos-tasks", [
    {
      id: 1,
      title: "Complete DBMS submission",
      due: "Tomorrow",
      completed: false,
    },
    {
      id: 2,
      title: "Prepare presentation",
      due: "Friday",
      completed: false,
    },
    {
      id: 3,
      title: "Pay electricity bill",
      due: "In 3 days",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newDue, setNewDue] = useState("");

  const [pendingCount, setPendingCount] = useState(0);

useEffect(() => {
  const pending = tasks.filter((task) => !task.completed).length;
  setPendingCount(pending);
}, [tasks]);

  function addTask() {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      due: newDue.trim() || "No deadline",
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, task]);

    setNewTask("");
    setNewDue("");
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-500">
          LifeOS Tasks
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Your Tasks
        </h1>

        <p className="mt-2 text-slate-500">
          Keep important things out of your head and inside LifeOS.
        </p>
      </div>

      {/* Add Task */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Add a task
        </h2>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            placeholder="What do you need to remember?"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />

          <input
            value={newDue}
            onChange={(e) => setNewDue(e.target.value)}
            placeholder="Deadline"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />

          <button
            onClick={addTask}
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Upcoming Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {pendingCount} pending
            </p>
          </div>

          <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            {tasks.length} total
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {tasks.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-8 text-center">
              <p className="font-medium text-slate-700">
                No tasks yet 🎉
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Add something you want LifeOS to remember.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-slate-200 hover:shadow-sm"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                    task.completed
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                  aria-label={`Mark ${task.title} as ${
                    task.completed ? "incomplete" : "complete"
                  }`}
                >
                  {task.completed && "✓"}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`font-medium ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {task.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Due: {task.due}
                  </p>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="rounded-xl px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Hook explanation */}
      <div className="rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
          React Hooks in LifeOS
        </p>

        <h3 className="mt-2 text-lg font-semibold text-slate-900">
          Your tasks are stored automatically
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          LifeOS uses a custom <code>useLocalStorage</code> hook to
          keep your tasks saved in the browser. Try adding a task and
          refreshing the page.
        </p>
      </div>
    </div>
  );
}


/* =========================================================
   DOCUMENTS
========================================================= */

function DocumentsPage() {

  return (

    <div className="space-y-7">

      <PageIntro
        eyebrow="Personal Memory"
        title="Documents"
        text="Keep important documents organized and easy to find."
      />


      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <DocumentCard
          icon="🎓"
          title="College"
          count="12 documents"
        />

        <DocumentCard
          icon="₹"
          title="Bills & Receipts"
          count="28 documents"
        />

        <DocumentCard
          icon="⌂"
          title="Home"
          count="9 documents"
        />

        <DocumentCard
          icon="▤"
          title="Other"
          count="16 documents"
        />

      </div>


      <Panel title="Recent Documents">

        <div className="space-y-3">

          <DocumentRow
            name="Laptop Invoice.pdf"
            type="Purchase"
          />

          <DocumentRow
            name="College ID.pdf"
            type="College"
          />

          <DocumentRow
            name="Electricity Bill.pdf"
            type="Home"
          />

        </div>

      </Panel>

    </div>
  )
}


/* =========================================================
   HOME
========================================================= */

function HomeManagementPage() {

  return (

    <div className="space-y-7">

      <PageIntro
        eyebrow="Household"
        title="Home"
        text="Keep track of appliances, bills, warranties and maintenance."
      />


      <div className="grid gap-5 md:grid-cols-3">

        <DashboardStat
          icon="⌂"
          label="Active Appliances"
          value="8"
          text="Tracked in LifeOS"
        />

        <DashboardStat
          icon="₹"
          label="Upcoming Bills"
          value="2"
          text="Due this month"
        />

        <DashboardStat
          icon="✓"
          label="Warranties"
          value="3"
          text="Expiring soon"
        />

      </div>


      <Panel title="Things To Remember">

        <div className="space-y-3">

          <Task
            title="AC service"
            category="Maintenance"
            due="12 days"
          />

          <Task
            title="Water purifier service"
            category="Maintenance"
            due="20 days"
          />

          <Task
            title="Electricity bill"
            category="Payment"
            due="3 days"
          />

        </div>

      </Panel>

    </div>
  )
}


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function LifeLogo({ small = false }) {
  return (
    <div
      className={`relative ${
        small ? "h-9 w-9" : "h-11 w-11"
      } flex items-center justify-center`}
    >
      <svg
        viewBox="0 0 48 48"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient */}
        <defs>
          <linearGradient
            id="lifeosGradient"
            x1="6"
            y1="6"
            x2="42"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Main rounded L shape */}
        <path
          d="M14 8
             C10.7 8 8 10.7 8 14
             V34
             C8 37.3 10.7 40 14 40
             H31
             C34.3 40 37 37.3 37 34
             V28
             H20
             V14
             C20 10.7 17.3 8 14 8Z"
          fill="url(#lifeosGradient)"
        />

        {/* Life / connection circle */}
        <circle
          cx="34"
          cy="14"
          r="7"
          fill="url(#lifeosGradient)"
        />

        {/* Small white connection detail */}
        <circle
          cx="28"
          cy="20"
          r="4"
          fill="white"
          fillOpacity="0.9"
        />
      </svg>
    </div>
  );
}


function DashboardStat({
  icon,
  label,
  value,
  text,
}) {

  return (

    <div className="group rounded-[1.7rem] border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600">
          {icon}
        </div>

        <span className="text-xs font-semibold text-slate-300">
          LifeOS
        </span>

      </div>

      <p className="mt-6 text-sm font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {text}
      </p>

    </div>

  )
}


function PageIntro({
  eyebrow,
  title,
  text,
}) {

  return (

    <section>

      <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-4xl font-bold tracking-tight">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-lg leading-8 text-slate-500">
        {text}
      </p>

    </section>

  )
}


function Panel({
  title,
  action,
  children,
}) {

  return (

    <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-7">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-bold">
          {title}
        </h3>

        {action && (

          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
            {action}
          </button>

        )}

      </div>


      <div className="mt-5">
        {children}
      </div>

    </div>

  )
}


function Upcoming({
  icon,
  title,
  type,
  time,
}) {

  return (

    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-sm font-bold">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {type}
        </p>

      </div>

      <span className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-500">
        {time}
      </span>

    </div>

  )
}


function QuickAction({
  icon,
  text,
  onClick,
}) {

  return (

    <button
      onClick={onClick}
      className="rounded-2xl border border-slate-200 p-5 text-left transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/30"
    >

      <span className="text-xl font-bold text-indigo-600">
        {icon}
      </span>

      <p className="mt-3 text-sm font-bold">
        {text}
      </p>

    </button>

  )
}


function Suggestion({ text }) {

  return (

    <button className="w-full rounded-xl border border-slate-800 p-4 text-left text-sm text-slate-300 transition hover:bg-slate-900">
      {text}
    </button>

  )
}


function ProgressItem({
  name,
  amount,
  percentage,
}) {

  return (

    <div>

      <div className="flex justify-between text-sm">

        <span className="font-semibold">
          {name}
        </span>

        <span className="text-slate-400">
          {amount}
        </span>

      </div>

      <div className="mt-2 h-2 rounded-full bg-slate-100">

        <div
          className="h-2 rounded-full bg-indigo-500"
          style={{
            width: percentage,
          }}
        />

      </div>

    </div>

  )
}


function Purchase({
  name,
  amount,
}) {

  return (

    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

      <span className="font-semibold">
        {name}
      </span>

      <span className="font-bold">
        {amount}
      </span>

    </div>

  )
}


function Task({
  title,
  category,
  due,
}) {

  return (

    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-5 transition hover:bg-slate-100">

      <div>

        <p className="font-bold">
          {title}
        </p>

        <p className="mt-1 text-sm text-slate-400">
          {category}
        </p>

      </div>

      <span className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-sm">
        {due}
      </span>

    </div>

  )
}


function DocumentCard({
  icon,
  title,
  count,
}) {

  return (

    <button className="rounded-[2rem] border border-slate-100 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        {count}
      </p>

    </button>

  )
}


function DocumentRow({
  name,
  type,
}) {

  return (

    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">

      <div className="flex items-center gap-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
          ▤
        </div>

        <div>

          <p className="font-semibold">
            {name}
          </p>

          <p className="text-sm text-slate-400">
            {type}
          </p>

        </div>

      </div>

      <button className="text-sm font-bold text-indigo-600">
        Open
      </button>

    </div>

  )
}


function Avatar({ letter }) {

  return (

    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[10px] font-bold text-slate-600">
      {letter}
    </div>

  )
}


/* =========================================================
   SPACE SIDE COMPONENTS
========================================================= */

function SpaceReminder({
  icon,
  title,
  space,
  date,
  badge,
}) {

  const badgeClasses = {
    orange: "bg-orange-50 text-orange-600",
    green: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-violet-50 text-violet-600",
    pink: "bg-pink-50 text-pink-600",
  }


  return (

    <div className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-xs font-bold">
          {title}
        </p>

        <p className="mt-1 truncate text-[11px] text-slate-400">
          {space}
        </p>

      </div>

      <span
        className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[10px] font-bold ${badgeClasses[badge]}`}
      >
        {date}
      </span>

    </div>

  )
}


function SpaceQuickAction({
  icon,
  title,
  text,
  onClick,
}) {

  return (

    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
        {icon}
      </div>

      <div>

        <p className="text-sm font-bold">
          {title}
        </p>

        <p className="mt-1 text-[11px] text-slate-400">
          {text}
        </p>

      </div>

    </button>

  )
}


function CreateOption({
  icon,
  title,
  text,
  onClick,
}) {

  return (

    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50/40"
    >

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xl">
        {icon}
      </div>

      <div>

        <p className="font-bold">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {text}
        </p>

      </div>

      <span className="ml-auto text-slate-300">
        →
      </span>

    </button>

  )
}


/* =========================================================
   LANDING COMPONENTS
========================================================= */

function Feature({
  icon,
  title,
  text,
}) {

  return (

    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-500">
        {text}
      </p>

    </div>

  )
}


function Step({
  number,
  title,
  text,
}) {

  return (

    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">

      <span className="text-sm font-bold text-indigo-500">
        {number}
      </span>

      <h3 className="mt-8 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-500">
        {text}
      </p>

    </div>

  )
}


export default App