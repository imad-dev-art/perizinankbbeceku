import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

const UsersPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-500">Manage system users and permissions</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search users..." className="pl-8" />
              </div>
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-1 block">Role</label>
              <select className="w-full h-10 px-3 py-2 border rounded-md">
                <option value="">All Roles</option>
                <option value="admin">Administrator</option>
                <option value="officer">Customs Officer</option>
                <option value="applicant">Applicant</option>
              </select>
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select className="w-full h-10 px-3 py-2 border rounded-md">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <Button variant="outline">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Last Login</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    role: "Administrator",
                    status: "Active",
                    lastLogin: "2024-05-10 09:45 AM",
                  },
                  {
                    name: "Jane Smith",
                    email: "jane.smith@example.com",
                    role: "Customs Officer",
                    status: "Active",
                    lastLogin: "2024-05-09 02:30 PM",
                  },
                  {
                    name: "Robert Johnson",
                    email: "robert.j@example.com",
                    role: "Applicant",
                    status: "Active",
                    lastLogin: "2024-05-08 11:15 AM",
                  },
                  {
                    name: "Sarah Williams",
                    email: "sarah.w@example.com",
                    role: "Applicant",
                    status: "Active",
                    lastLogin: "2024-05-07 04:20 PM",
                  },
                  {
                    name: "Michael Brown",
                    email: "michael.b@example.com",
                    role: "Customs Officer",
                    status: "Inactive",
                    lastLogin: "2024-04-25 10:00 AM",
                  },
                  {
                    name: "Emily Davis",
                    email: "emily.d@example.com",
                    role: "Applicant",
                    status: "Active",
                    lastLogin: "2024-05-10 08:30 AM",
                  },
                ].map((user, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          {user.name.charAt(0)}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{user.lastLogin}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">Showing 1-6 of 6 users</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default UsersPage;
