import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Plus,
  HelpCircle,
  LogOut,
  User,
  CreditCard,
  DollarSign,
  Users,
  BookOpen,
  LifeBuoy,
  Activity,
  Search,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getEffectivePlanId, useSites } from "../../../context/SitesContext.jsx";

function displayInitials(fullName, email) {
  const n = fullName?.trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    if (parts.length >= 2)
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

function planTierLabel(planId) {
  if (planId === "starter") return "STARTER";
  return "FREE";
}

const DOT_COLORS = ["bg-gray-400", "bg-red-400", "bg-amber-500", "bg-blue-400"];

export default function Navbar() {
  const navigate = useNavigate();
  const { session, logout } = useAuth();
  const { sites, currentSiteId, currentSite, setCurrentSite } = useSites();
  const user = session?.user;
  const displayName =
    user?.fullName?.trim() || user?.email?.split("@")[0] || "Account";
  const emailLine = user?.email ?? "";
  const initials = displayInitials(user?.fullName, user?.email);

  const [siteOpen, setSiteOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [siteQuery, setSiteQuery] = useState("");

  const siteRef = useRef(null);
  const helpRef = useRef(null);
  const userRef = useRef(null);

  const filteredSites = useMemo(() => {
    const q = siteQuery.trim().toLowerCase();
    if (!q) return sites;
    return sites.filter(
      (s) =>
        s.hostLabel.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q),
    );
  }, [sites, siteQuery]);

  const orderedSites = useMemo(() => {
    const cur = filteredSites.find((s) => s.id === currentSiteId);
    const others = filteredSites
      .filter((s) => s.id !== currentSiteId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    return cur ? [cur, ...others] : others;
  }, [filteredSites, currentSiteId]);

  function handleSignOut() {
    setUserOpen(false);
    logout();
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    const handler = (e) => {
      const t = e.target;
      if (siteRef.current && !siteRef.current.contains(t)) {
        setSiteOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(t)) {
        setHelpOpen(false);
      }
      if (userRef.current && !userRef.current.contains(t)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const headerLabel = currentSite?.hostLabel ?? "No sites yet";

  return (
    <div className="fixed top-0 right-0 left-[240px] z-[999] h-[64px] px-6 border-b border-gray-200 bg-white flex items-center justify-between">
      <div className="relative" ref={siteRef}>
        <button
          type="button"
          onClick={() => setSiteOpen(!siteOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors max-w-[min(100vw-320px,280px)]"
        >
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              currentSite ? "bg-gray-400" : "bg-amber-400"
            }`}
          />
          <span className="truncate">{headerLabel}</span>
          <ChevronDown size={14} className="text-gray-500 flex-shrink-0" />
        </button>

        {siteOpen && (
          <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] border border-gray-200 z-50">
            <div className="p-3">
              <div className="relative mb-3">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Find a site"
                  value={siteQuery}
                  onChange={(e) => setSiteQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-1 mb-3 max-h-64 overflow-y-auto">
                {orderedSites.length === 0 ? (
                  <p className="text-sm text-gray-500 px-2 py-3 text-center">
                    {sites.length === 0
                      ? "No websites yet. Add one to get started."
                      : "No matches."}
                  </p>
                ) : (
                  orderedSites.map((site, i) => {
                    const effId = getEffectivePlanId(site);
                    const prevEff =
                      i > 0 ? getEffectivePlanId(orderedSites[i - 1]) : "";
                    const showTierLabel = i > 0 && effId !== prevEff;
                    const isCurrent = site.id === currentSiteId;
                    const dotClass =
                      DOT_COLORS[
                        site.id.charCodeAt(0) % DOT_COLORS.length
                      ] ?? "bg-gray-400";
                    return (
                      <Fragment key={site.id}>
                        {showTierLabel ? (
                          <div className="px-3 py-1 pt-2">
                            <span className="text-xs text-gray-400 uppercase">
                              {planTierLabel(effId)}
                            </span>
                          </div>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentSite(site.id);
                            setSiteOpen(false);
                          }}
                          className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                            isCurrent
                              ? "bg-teal-50/50 hover:bg-teal-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`w-2 h-2 rounded-full flex-shrink-0 ${dotClass}`}
                            />
                            <span className="text-sm text-gray-700 truncate">
                              {site.hostLabel}
                            </span>
                          </div>
                          {isCurrent ? (
                            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded flex-shrink-0 ml-2">
                              Current
                            </span>
                          ) : null}
                        </button>
                      </Fragment>
                    );
                  })
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSiteOpen(false);
                  navigate("/dashboard");
                }}
                className="w-full border border-purple-600 rounded-md py-2 text-sm text-purple-600 font-medium hover:bg-purple-50 transition-colors"
              >
                View all websites
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/add-website")}
          className="border border-purple-600 px-4 py-2 rounded-md text-sm flex items-center gap-2 text-purple-600 font-medium hover:bg-purple-50 transition-colors"
        >
          <Plus size={16} />
          <span>Add new website</span>
        </button>

        <div className="relative" ref={helpRef}>
          <button
            type="button"
            onClick={() => setHelpOpen(!helpOpen)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            <HelpCircle size={18} className="text-purple-600" />
            <span>Help</span>
          </button>

          {helpOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] border border-gray-200 z-50">
              <div className="p-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-purple-50 bg-purple-50 transition-colors">
                  <LifeBuoy size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Contact support</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <BookOpen size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Knowledge Base</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <Activity size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">System Status</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={userRef}>
          <button
            type="button"
            onClick={() => setUserOpen(!userOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded flex items-center justify-center text-sm font-semibold">
              {initials}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-gray-700 leading-tight">
                {displayName}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {emailLine}
              </span>
            </div>
          </button>

          {userOpen && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] border border-gray-200 z-50"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="p-3">
                <div className="px-3 py-2 mb-2">
                  <p className="text-sm font-semibold text-gray-700">{displayName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{emailLine}</p>
                  <button
                    type="button"
                    className="text-xs text-purple-600 font-medium mt-2 hover:text-purple-700"
                  >
                    Invite your team
                  </button>
                </div>
                <div className="my-2 h-px bg-gray-200" />
                <div className="space-y-1">
                  <MenuItem icon={<User size={16} />}>Manage account</MenuItem>
                  <MenuItem icon={<CreditCard size={16} />} onClick={() => navigate("/pricing")}>
                    Billing
                  </MenuItem>
                  <MenuItem icon={<DollarSign size={16} />} onClick={() => navigate("/pricing")}>
                    Pricing & features
                  </MenuItem>
                  <MenuItem icon={<Users size={16} />}>Affiliate</MenuItem>
                </div>
                <div className="my-2 h-px bg-gray-200" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSignOut();
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-600">
                    <LogOut size={16} />
                  </span>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MenuItem({ children, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <span className="text-gray-600">{icon}</span>
      <span className="text-gray-700">{children}</span>
    </button>
  );
}
