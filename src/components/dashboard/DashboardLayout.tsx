import React from "react";
import { Link } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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
        <div className="w-64 bg-white shadow-md h-[calc(100vh-4rem)] fixed">
          <nav className="mt-5 px-2">
            <Link
              to="/dashboard"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-primary text-white"
            >
              <LayoutDashboard className="mr-3 h-6 w-6" />
              Dashboard
            </Link>
            <Link
              to="/dashboard/permits"
              className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <FileText className="mr-3 h-6 w-6" />
              Permits
            </Link>
            <Link
              to="/dashboard/users"
              className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Users className="mr-3 h-6 w-6" />
              Users
            </Link>
            <Link
              to="/dashboard/settings"
              className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
