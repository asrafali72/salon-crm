import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Bell,
  Search,
  LogOut,
  Sparkles,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/assistant",
    icon: LayoutDashboard,
  },
  {
    name: "My Tasks",
    path: "/assistant/tasks",
    icon: ClipboardList,
  },
  {
    name: "Schedule",
    path: "/assistant/schedule",
    icon: CalendarDays,
  },
];

const AssistantLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const pageTitle =
    menuItems.find(
      (item) => item.path === location.pathname
    )?.name || "Dashboard";

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0F172A] text-white flex flex-col">
        {/* Logo */}
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600">
              <Sparkles size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Vynexa
              </h2>

              <p className="text-xs text-slate-400">
                Assistant Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  active
                    ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-white/10 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>

            <div>
              <h3 className="font-semibold">
                {user?.name}
              </h3>

              <p className="text-xs text-slate-400">
                {user?.role}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 py-2.5 text-red-300 transition hover:bg-red-500/20"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between px-8 py-5">
            <div>
              <p className="text-sm text-slate-500">
                Welcome back 👋
              </p>

              <h1 className="text-2xl font-bold text-slate-800">
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 md:flex">
                <Search
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Notification */}
              <button className="relative rounded-xl bg-slate-100 p-3 hover:bg-slate-200">
                <Bell
                  size={20}
                  className="text-slate-600"
                />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-blue-600 font-bold text-white">
                  {user?.name?.charAt(0) || "A"}
                </div>

                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-slate-800">
                    {user?.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    Assistant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AssistantLayout;