import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Puzzle,
  ChevronDown,
} from "lucide-react";
import W3OptimizeLogo from "../../../assets/Logo/W3OptimizeLogo.webp";
import { useAuth } from "../../../context/AuthContext.jsx";

const baseMenu = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Cache Insights",
    icon: BarChart3,
    path: "/cache-insights",
  },
  {
    label: "Cache Settings",
    icon: Settings,
    children: [
      { label: "General", path: "/cache-settings/general" },
      { label: "Images & Media", path: "/cache-settings/images-and-media" },
      { label: "JavaScript", path: "/cache-settings/javascript" },
      { label: "HTML & CSS", path: "/cache-settings/html-and-css" },
      { label: "Fonts", path: "/cache-settings/fonts" },
      { label: "Cache", path: "/cache-settings/cache" },
    ],
  },
  {
    label: "Analytics",
    icon: BarChart3,
    children: [
      { label: "Events History", path: "/analytics/events-history" },
      { label: "Resource Usage", path: "/analytics/resource-usage" },
      { label: "Plugin History", path: "/analytics/plugin-history" },
    ],
  },
  {
    label: "Integrations",
    icon: Puzzle,
    path: "/integrations",
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState({});
  const { session } = useAuth();

  const menu = useMemo(() => {
    const roles = Array.isArray(session?.user?.roles) ? session.user.roles : [];
    const isAdmin = roles.includes("admin");
    if (!isAdmin) return baseMenu;
    return [
      ...baseMenu,
      {
        label: "Admin",
        icon: Settings,
        children: [{ label: "Pricing Plans", path: "/admin/pricing-plans" }],
      },
    ];
  }, [session]);

  const toggle = (label) => {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="fixed top-0 left-0 z-[1000] h-screen min-w-[240px] bg-gradient-to-b from-[#1b004e] to-[#16002e] text-white p-4">
      
      <div className="p-[8px_0_16px_8px]">
        <img src={W3OptimizeLogo} alt="Logo" className="max-w-[170px]" />
      </div>

      <nav>
        {menu.map((item) => {
          const Icon = item.icon;

          if (!item.children) {
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-3 mt-2 rounded-lg cursor-pointer
                  ${
                    isActive
                      ? "bg-[#3a1d6a] text-[#3FF6D4]"
                      : "hover:bg-white/10 text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            );
          }

          return (
            <div key={item.label}>
              <div
                onClick={() => toggle(item.label)}
                className="flex items-center justify-between px-2 py-2 mt-2 rounded-lg cursor-pointer hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>

                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    open[item.label] ? "rotate-180" : ""
                  }`}
                />
              </div>

              {open[item.label] && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.children.map((sub) => (
                    <NavLink
                      key={sub.label}
                      to={sub.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-sm cursor-pointer
                        ${
                          isActive
                            ? "bg-[#3a1d6a] text-[#3FF6D4]"
                            : "text-gray-300 hover:text-white"
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
