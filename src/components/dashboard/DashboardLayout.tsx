import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Bell,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [permitSubmenuOpen, setPermitSubmenuOpen] = useState(false);

  // Check if the current path is active
  const isActive = (path: string) => location.pathname === path;
  const isPermitSection = location.pathname.startsWith("/dashboard/permits");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=customs"
                  alt="Logo"
                />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Bonded Zone Permit System
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                    alt="User"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    John Doe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md h-[calc(100vh-4rem)] fixed overflow-y-auto">
          <nav className="mt-5 px-2 pb-5">
            <Link
              to="/dashboard"
              className={cn(
                "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                isActive("/dashboard")
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <LayoutDashboard className="mr-3 h-6 w-6" />
              Dashboard
            </Link>

            {/* Permits section with submenu */}
            <div className="mt-1">
              <button
                onClick={() => setPermitSubmenuOpen(!permitSubmenuOpen)}
                className={cn(
                  "w-full group flex items-center justify-between px-2 py-2 text-base font-medium rounded-md",
                  isPermitSection
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <div className="flex items-center">
                  <FileText className="mr-3 h-6 w-6" />
                  Permits
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    permitSubmenuOpen ? "transform rotate-180" : "",
                  )}
                />
              </button>

              {/* Submenu */}
              {permitSubmenuOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <Link
                    to="/dashboard/permits"
                    className={cn(
                      "block px-2 py-2 text-sm font-medium rounded-md",
                      isActive("/dashboard/permits")
                        ? "bg-primary/5 text-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    All Permits
                  </Link>
                  <Link
                    to="/dashboard/permits/new"
                    className={cn(
                      "block px-2 py-2 text-sm font-medium rounded-md",
                      isActive("/dashboard/permits/new")
                        ? "bg-primary/5 text-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    New Application
                  </Link>
                  <Link
                    to="/dashboard/permits/review"
                    className={cn(
                      "block px-2 py-2 text-sm font-medium rounded-md",
                      isActive("/dashboard/permits/review")
                        ? "bg-primary/5 text-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>Review Applications</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                        3
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/dashboard/permits/approval"
                    className={cn(
                      "block px-2 py-2 text-sm font-medium rounded-md",
                      isActive("/dashboard/permits/approval")
                        ? "bg-primary/5 text-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>Final Approval</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        3
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/dashboard/users"
              className={cn(
                "mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md",
                isActive("/dashboard/users")
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <Users className="mr-3 h-6 w-6" />
              Users
            </Link>
            <Link
              to="/dashboard/settings"
              className={cn(
                "mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md",
                isActive("/dashboard/settings")
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <Settings className="mr-3 h-6 w-6" />
              Settings
            </Link>
            <Link
              to="/"
              className="mt-8 group flex items-center px-2 py-2 text-base font-medium rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-3 h-6 w-6" />
              Logout
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
