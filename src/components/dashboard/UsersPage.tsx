import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  X,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  MoreHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Sample user data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    status: "Active",
    lastLogin: "2024-05-10 09:45 AM",
    department: "IT",
    phone: "+1 (555) 123-4567",
    permissions: [
      "manage_users",
      "manage_permits",
      "view_reports",
      "system_settings",
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Customs Officer",
    status: "Active",
    lastLogin: "2024-05-09 02:30 PM",
    department: "Customs",
    phone: "+1 (555) 234-5678",
    permissions: ["review_permits", "approve_permits", "view_reports"],
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    role: "Applicant",
    status: "Active",
    lastLogin: "2024-05-08 11:15 AM",
    department: "Logistics",
    phone: "+1 (555) 345-6789",
    permissions: ["submit_permits", "view_own_permits"],
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    role: "Applicant",
    status: "Active",
    lastLogin: "2024-05-07 04:20 PM",
    department: "Exports",
    phone: "+1 (555) 456-7890",
    permissions: ["submit_permits", "view_own_permits"],
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.b@example.com",
    role: "Customs Officer",
    status: "Inactive",
    lastLogin: "2024-04-25 10:00 AM",
    department: "Customs",
    phone: "+1 (555) 567-8901",
    permissions: ["review_permits"],
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.d@example.com",
    role: "Applicant",
    status: "Active",
    lastLogin: "2024-05-10 08:30 AM",
    department: "Imports",
    phone: "+1 (555) 678-9012",
    permissions: ["submit_permits", "view_own_permits"],
  },
];

const UsersPage = () => {
  // State for users data
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // State for add user dialog
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Applicant",
    department: "",
    phone: "",
    status: "Active",
  });

  // State for view user dialog
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // State for edit user dialog
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // State for user actions dropdown
  const [userActionMenuOpen, setUserActionMenuOpen] = useState(null);

  // Handle search and filter changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value, roleFilter, statusFilter);
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
    applyFilters(searchTerm, e.target.value, statusFilter);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    applyFilters(searchTerm, roleFilter, e.target.value);
  };

  // Apply all filters
  const applyFilters = (search, role, status) => {
    let filtered = [...users];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.department?.toLowerCase().includes(searchLower),
      );
    }

    // Apply role filter
    if (role) {
      filtered = filtered.filter((user) => user.role === role);
    }

    // Apply status filter
    if (status) {
      filtered = filtered.filter((user) => user.status === status);
    }

    setFilteredUsers(filtered);
  };

  // Handle add user submission
  const handleAddUserSubmit = () => {
    const newId = Math.max(...users.map((u) => u.id)) + 1;
    const createdUser = {
      ...newUser,
      id: newId,
      lastLogin: "Never",
      permissions:
        newUser.role === "Administrator"
          ? [
              "manage_users",
              "manage_permits",
              "view_reports",
              "system_settings",
            ]
          : newUser.role === "Customs Officer"
            ? ["review_permits", "approve_permits", "view_reports"]
            : ["submit_permits", "view_own_permits"],
    };

    const updatedUsers = [createdUser, ...users];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setIsAddUserOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "Applicant",
      department: "",
      phone: "",
      status: "Active",
    });
  };

  // Handle input change for new user form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle view user
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewUserOpen(true);
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setEditUser({ ...user });
    setIsEditUserOpen(true);
  };

  // Handle edit input change
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle edit user submission
  const handleEditUserSubmit = () => {
    const updatedUsers = users.map((user) =>
      user.id === editUser.id ? editUser : user,
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setIsEditUserOpen(false);
    setEditUser(null);
  };

  // Handle user status toggle
  const handleToggleUserStatus = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const newStatus = user.status === "Active" ? "Inactive" : "Active";
        return { ...user, status: newStatus };
      }
      return user;
    });

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setUserActionMenuOpen(null);
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-500">Manage system users and permissions</p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => setIsAddUserOpen(true)}
        >
          <UserPlus className="h-4 w-4" /> Add User
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {searchTerm && (
                  <button
                    className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setSearchTerm("");
                      applyFilters("", roleFilter, statusFilter);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-1 block">Role</label>
              <select
                className="w-full h-10 px-3 py-2 border rounded-md"
                value={roleFilter}
                onChange={handleRoleFilterChange}
              >
                <option value="">All Roles</option>
                <option value="Administrator">Administrator</option>
                <option value="Customs Officer">Customs Officer</option>
                <option value="Applicant">Applicant</option>
              </select>
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select
                className="w-full h-10 px-3 py-2 border rounded-md"
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("");
                setStatusFilter("");
                setFilteredUsers(users);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>{filteredUsers.length} users found</CardDescription>
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
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
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewUser(user)}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setUserActionMenuOpen(
                                  userActionMenuOpen === user.id
                                    ? null
                                    : user.id,
                                )
                              }
                              title="More Actions"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            {userActionMenuOpen === user.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                <div className="py-1">
                                  <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() =>
                                      handleToggleUserStatus(user.id)
                                    }
                                  >
                                    {user.status === "Active"
                                      ? "Deactivate User"
                                      : "Activate User"}
                                  </button>
                                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                    Delete User
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      No users found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              {filteredUsers.length > 0
                ? `Showing ${filteredUsers.length} of ${users.length} users`
                : "No users found"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account and set their permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                value={newUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="col-span-3"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <select
                id="role"
                name="role"
                className="col-span-3 h-10 px-3 py-2 border rounded-md"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <option value="Administrator">Administrator</option>
                <option value="Customs Officer">Customs Officer</option>
                <option value="Applicant">Applicant</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                name="department"
                className="col-span-3"
                value={newUser.department}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                className="col-span-3"
                value={newUser.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="user-status"
                  checked={newUser.status === "Active"}
                  onCheckedChange={(checked) =>
                    setNewUser((prev) => ({
                      ...prev,
                      status: checked ? "Active" : "Inactive",
                    }))
                  }
                />
                <Label htmlFor="user-status">
                  {newUser.status === "Active" ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUserSubmit}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      {editUser && (
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information and permissions
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  className="col-span-3"
                  value={editUser.name}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  className="col-span-3"
                  value={editUser.email}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <select
                  id="edit-role"
                  name="role"
                  className="col-span-3 h-10 px-3 py-2 border rounded-md"
                  value={editUser.role}
                  onChange={handleEditInputChange}
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Customs Officer">Customs Officer</option>
                  <option value="Applicant">Applicant</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">
                  Department
                </Label>
                <Input
                  id="edit-department"
                  name="department"
                  className="col-span-3"
                  value={editUser.department}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  name="phone"
                  className="col-span-3"
                  value={editUser.phone}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="edit-user-status"
                    checked={editUser.status === "Active"}
                    onCheckedChange={(checked) =>
                      setEditUser((prev) => ({
                        ...prev,
                        status: checked ? "Active" : "Inactive",
                      }))
                    }
                  />
                  <Label htmlFor="edit-user-status">
                    {editUser.status === "Active" ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditUserOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditUserSubmit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* View User Dialog */}
      {selectedUser && (
        <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                User information and permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p>{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedUser.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p>{selectedUser.department || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedUser.phone || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p>{selectedUser.lastLogin}</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm font-medium mb-2">Permissions</p>
                <div className="space-y-2">
                  {selectedUser.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm capitalize">
                        {permission.replace(/_/g, " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewUserOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default UsersPage;
