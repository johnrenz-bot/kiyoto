import { useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet, useLocation } from "react-router-dom";

type User = {
  id: number;
  fullName: string;
  email: string;
  contactNumber: string;
  createdAt: string;
};

type Tab = "profile" | "settings";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardRoot = location.pathname === "/dashboard";

  useEffect(() => {
    async function fetchUser() {
      const savedStr = localStorage.getItem("user");
      if (!savedStr) {
        navigate("/login");
        return;
      }

      const saved = JSON.parse(savedStr) as { id: number };

      try {
        const res = await fetch(`http://localhost:4000/api/users/${saved.id}`);

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data: User = await res.json();
        setUser(data);
      } catch {
        navigate("/login");
      }
    }

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    if (!isDashboardRoot) navigate("/dashboard");
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1510] text-emerald-50">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b1510] text-emerald-50 flex flex-col">
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 backdrop-blur-lg">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-emerald-200/80">Kiyoto Matcha</div>
          <div className="mt-1 text-lg font-semibold">Dashboard</div>
        </div>
        <button onClick={() => setIsSidebarOpen(prev => !prev)} className="p-2 rounded-md border border-white/20">
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-emerald-100" />
            <span className="block h-0.5 w-5 bg-emerald-100" />
            <span className="block h-0.5 w-5 bg-emerald-100" />
          </div>
        </button>
      </header>

      <div className="flex flex-1 md:flex-row">
        <aside
          className={`border-r border-white/10 bg-black/40 backdrop-blur-lg flex flex-col w-64 z-30 ${
            isSidebarOpen ? "fixed inset-y-0 left-0" : "hidden"
          } md:static md:block`}
        >
          <div className="hidden md:block px-6 py-6 border-b border-white/10">
            <div className="text-xs uppercase tracking-[0.25em] text-emerald-200/80">Kiyoto Matcha</div>
            <div className="mt-2 text-lg font-semibold">Dashboard</div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `w-full inline-block px-3 py-2 rounded-lg ${
                  isActive ? "text-emerald-100 font-semibold" : "text-emerald-100/80"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="product"
              className={({ isActive }) =>
                `w-full inline-block px-3 py-2 rounded-lg ${
                  isActive ? "text-emerald-100 font-semibold" : "text-emerald-100/80"
                }`
              }
            >
              Product
            </NavLink>
            <NavLink
              to="about"
              className={({ isActive }) =>
                `w-full inline-block px-3 py-2 rounded-lg ${
                  isActive ? "text-emerald-100 font-semibold" : "text-emerald-100/80"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="contact"
              className={({ isActive }) =>
                `w-full inline-block px-3 py-2 rounded-lg ${
                  isActive ? "text-emerald-100 font-semibold" : "text-emerald-100/80"
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          <div className="px-3 py-4 border-t border-white/10 space-y-1 text-sm">
            <button
              onClick={() => handleTabClick("profile")}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                activeTab === "profile" ? "text-emerald-100 font-semibold" : "text-emerald-100/80"
              }`}
            >
              Profile
            </button>

            <button
              onClick={() => handleTabClick("settings")}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                activeTab === "settings" ? "text-emerald-100 font-semibold" : "text-emerald-100/80"
              }`}
            >
              Settings
            </button>

            <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg text-red-300 hover:bg-red-500/10">
              Logout
            </button>
          </div>
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 md:hidden z-20" onClick={() => setIsSidebarOpen(false)} />
        )}

        <main className="flex-1 pt-4 md:pt-0">
          {isDashboardRoot ? (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
              <header className="text-center mb-8 sm:mb-10">
                <p className="uppercase tracking-[0.2em] text-xs text-emerald-200/80">
                  {activeTab === "profile" ? "Profile" : "Settings"}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3">
                  Welcome, <span className="text-emerald-300">{user.fullName}</span>
                </h1>
              </header>

              {activeTab === "profile" && (
                <section className="grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-2 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md p-6">
                    <h2 className="text-sm font-semibold uppercase text-emerald-200/90 mb-4">Profile</h2>
                    <div className="space-y-3 text-sm md:text-base">
                      <div className="flex justify-between">
                        <span className="text-emerald-100/80">Full Name</span>
                        <span className="font-medium">{user.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-100/80">Email</span>
                        <span className="font-medium break-all">{user.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-100/80">Contact</span>
                        <span className="font-medium">{user.contactNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-100/80">Member since</span>
                        <span className="font-medium">
                          {new Date(user.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <button className="mt-6 inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold">
                      Edit Profile
                    </button>
                  </div>

                  <aside className="space-y-4">
                    <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-emerald-200/80">Member ID</p>
                      <p className="mt-2 font-mono text-lg text-emerald-300">#{String(user.id).padStart(4, "0")}</p>
                    </div>

                    <div className="rounded-2xl bg-linear-to-br from-emerald-500/20 to-emerald-300/10 border border-emerald-300/60 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-emerald-100/85">Status</p>
                      <p className="mt-2 font-semibold text-sm">Emerald Member</p>
                      <p className="mt-1 text-[0.7rem] text-emerald-100/75">Exclusive perks available.</p>
                    </div>
                  </aside>
                </section>
              )}

              {activeTab === "settings" && (
                <section className="rounded-2xl bg-black/40 border border-white/10 p-6 max-w-3xl mx-auto">
                  <h2 className="text-sm font-semibold uppercase text-emerald-200/90 mb-4">Account Settings</h2>
                  <p className="text-sm text-emerald-100/80">Settings UI placeholder.</p>
                </section>
              )}
            </div>
          ) : (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
