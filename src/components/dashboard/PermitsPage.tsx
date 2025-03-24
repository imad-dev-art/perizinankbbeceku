import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, X, Eye, Edit, Trash2 } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const PermitsPage = () => {
  // Sample data for permits
  const [permits, setPermits] = useState([
    {
      id: 1,
      type: "Import",
      description: "Electronics import from China",
      applicant: "ABC Electronics Ltd",
      goods: "Smartphones and accessories",
      quantity: "1000 units",
      value: "$50,000",
      submissionDate: new Date(2023, 7, 15),
      status: "Approved",
    },
    {
      id: 2,
      type: "Export",
      description: "Textile export to Europe",
      applicant: "XYZ Textiles Inc",
      goods: "Cotton fabrics",
      quantity: "5000 meters",
      value: "$25,000",
      submissionDate: new Date(2023, 8, 3),
      status: "Pending",
    },
    {
      id: 3,
      type: "Import",
      description: "Automotive parts import",
      applicant: "Car Parts Co",
      goods: "Engine components",
      quantity: "500 sets",
      value: "$75,000",
      submissionDate: new Date(2023, 8, 10),
      status: "Rejected",
    },
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [filteredPermits, setFilteredPermits] = useState(permits);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // State for new permit dialog
  const [isNewPermitOpen, setIsNewPermitOpen] = useState(false);
  const [newPermit, setNewPermit] = useState({
    type: "Import",
    description: "",
    applicant: "",
    goods: "",
    quantity: "",
    value: "",
  });

  // State for view permit dialog
  const [isViewPermitOpen, setIsViewPermitOpen] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState(null);

  // State for edit permit dialog
  const [isEditPermitOpen, setIsEditPermitOpen] = useState(false);
  const [editPermit, setEditPermit] = useState(null);

  // State for delete permit dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [permitToDelete, setPermitToDelete] = useState(null);

  // Initialize filtered permits
  useEffect(() => {
    setFilteredPermits(permits);
  }, [permits]);

  // Handle search and filter changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value, statusFilter, dateFilter);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    applyFilters(searchTerm, e.target.value, dateFilter);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    applyFilters(searchTerm, statusFilter, e.target.value);
  };

  // Apply all filters
  const applyFilters = (search, status, date) => {
    let filtered = [...permits];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (permit) =>
          permit.id.toString().includes(searchLower) ||
          permit.type.toLowerCase().includes(searchLower) ||
          permit.description.toLowerCase().includes(searchLower) ||
          permit.applicant.toLowerCase().includes(searchLower) ||
          permit.goods.toLowerCase().includes(searchLower),
      );
    }

    // Apply status filter
    if (status) {
      filtered = filtered.filter((permit) => permit.status === status);
    }

    // Apply date filter
    if (date) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);
      const yearAgo = new Date(today);
      yearAgo.setFullYear(today.getFullYear() - 1);

      switch (date) {
        case "today":
          filtered = filtered.filter(
            (permit) => permit.submissionDate >= today,
          );
          break;
        case "week":
          filtered = filtered.filter(
            (permit) => permit.submissionDate >= weekAgo,
          );
          break;
        case "month":
          filtered = filtered.filter(
            (permit) => permit.submissionDate >= monthAgo,
          );
          break;
        case "year":
          filtered = filtered.filter(
            (permit) => permit.submissionDate >= yearAgo,
          );
          break;
        default:
          break;
      }
    }

    setFilteredPermits(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle new permit submission
  const handleNewPermitSubmit = () => {
    const newId = Math.max(...permits.map((p) => p.id)) + 1;
    const createdPermit = {
      ...newPermit,
      id: newId,
      submissionDate: new Date(),
      status: "Pending",
    };

    const updatedPermits = [createdPermit, ...permits];
    setPermits(updatedPermits);
    setFilteredPermits(updatedPermits);
    setIsNewPermitOpen(false);
    setNewPermit({
      type: "Import",
      description: "",
      applicant: "",
      goods: "",
      quantity: "",
      value: "",
    });
  };

  // Handle input change for new permit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPermit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle view permit
  const handleViewPermit = (permit) => {
    setSelectedPermit(permit);
    setIsViewPermitOpen(true);
  };

  // Handle edit permit
  const handleEditPermit = (permit) => {
    setEditPermit({ ...permit });
    setIsEditPermitOpen(true);
  };

  // Handle edit input change
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditPermit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle edit permit submission
  const handleEditPermitSubmit = () => {
    const updatedPermits = permits.map((permit) =>
      permit.id === editPermit.id ? editPermit : permit,
    );
    setPermits(updatedPermits);
    setFilteredPermits(updatedPermits);
    setIsEditPermitOpen(false);
    setEditPermit(null);
  };

  // Handle delete permit
  const handleDeletePermit = (permit) => {
    setPermitToDelete(permit);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    const updatedPermits = permits.filter(
      (permit) => permit.id !== permitToDelete.id,
    );
    setPermits(updatedPermits);
    setFilteredPermits(updatedPermits);
    setIsDeleteDialogOpen(false);
    setPermitToDelete(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredPermits.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPermits.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Permits</h1>
          <p className="text-gray-500">Manage your import/export permits</p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => setIsNewPermitOpen(true)}
        >
          <Plus className="h-4 w-4" /> New Permit
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
                  placeholder="Search permits..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {searchTerm && (
                  <button
                    className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setSearchTerm("");
                      applyFilters("", statusFilter, dateFilter);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select
                className="w-full h-10 px-3 py-2 border rounded-md"
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-1 block">
                Date Range
              </label>
              <select
                className="w-full h-10 px-3 py-2 border rounded-md"
                value={dateFilter}
                onChange={handleDateFilterChange}
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setDateFilter("");
                setFilteredPermits(permits);
              }}
            >
              <X className="h-4 w-4" /> Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permit Applications</CardTitle>
          <CardDescription>
            {filteredPermits.length} permits found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Permit ID</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Submission Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((permit) => (
                    <tr key={permit.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">#{permit.id}</td>
                      <td className="py-3 px-4">{permit.type}</td>
                      <td className="py-3 px-4">
                        {permit.submissionDate.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            permit.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : permit.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {permit.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewPermit(permit)}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit"
                            onClick={() => handleEditPermit(permit)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete"
                            onClick={() => handleDeletePermit(permit)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      No permits found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              {filteredPermits.length > 0
                ? `Showing ${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, filteredPermits.length)} of ${filteredPermits.length} permits`
                : "No permits found"}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Permit Dialog */}
      <Dialog open={isNewPermitOpen} onOpenChange={setIsNewPermitOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Permit</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new import/export permit
              application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="permit-type" className="text-right">
                Type
              </Label>
              <select
                id="permit-type"
                name="type"
                className="col-span-3 h-10 px-3 py-2 border rounded-md"
                value={newPermit.type}
                onChange={handleInputChange}
              >
                <option value="Import">Import</option>
                <option value="Export">Export</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="applicant" className="text-right">
                Applicant
              </Label>
              <Input
                id="applicant"
                name="applicant"
                className="col-span-3"
                value={newPermit.applicant}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
                value={newPermit.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goods" className="text-right">
                Goods
              </Label>
              <Input
                id="goods"
                name="goods"
                className="col-span-3"
                value={newPermit.goods}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                className="col-span-3"
                value={newPermit.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value
              </Label>
              <Input
                id="value"
                name="value"
                className="col-span-3"
                value={newPermit.value}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPermitOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleNewPermitSubmit}>Submit Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Permit Dialog */}
      {selectedPermit && (
        <Dialog open={isViewPermitOpen} onOpenChange={setIsViewPermitOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Permit #{selectedPermit.id}</DialogTitle>
              <DialogDescription>
                Submitted on{" "}
                {selectedPermit.submissionDate.toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    selectedPermit.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedPermit.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedPermit.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p>{selectedPermit.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Applicant</p>
                  <p>{selectedPermit.applicant}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Description</p>
                  <p>{selectedPermit.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Goods</p>
                  <p>{selectedPermit.goods}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p>{selectedPermit.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Value</p>
                  <p>{selectedPermit.value}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewPermitOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Permit Dialog */}
      {editPermit && (
        <Dialog open={isEditPermitOpen} onOpenChange={setIsEditPermitOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Permit #{editPermit.id}</DialogTitle>
              <DialogDescription>
                Update the details of this permit
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-permit-type" className="text-right">
                  Type
                </Label>
                <select
                  id="edit-permit-type"
                  name="type"
                  className="col-span-3 h-10 px-3 py-2 border rounded-md"
                  value={editPermit.type}
                  onChange={handleEditInputChange}
                >
                  <option value="Import">Import</option>
                  <option value="Export">Export</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-applicant" className="text-right">
                  Applicant
                </Label>
                <Input
                  id="edit-applicant"
                  name="applicant"
                  className="col-span-3"
                  value={editPermit.applicant}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  name="description"
                  className="col-span-3"
                  value={editPermit.description}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-goods" className="text-right">
                  Goods
                </Label>
                <Input
                  id="edit-goods"
                  name="goods"
                  className="col-span-3"
                  value={editPermit.goods}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="edit-quantity"
                  name="quantity"
                  className="col-span-3"
                  value={editPermit.quantity}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-value" className="text-right">
                  Value
                </Label>
                <Input
                  id="edit-value"
                  name="value"
                  className="col-span-3"
                  value={editPermit.value}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <select
                  id="edit-status"
                  name="status"
                  className="col-span-3 h-10 px-3 py-2 border rounded-md"
                  value={editPermit.status}
                  onChange={handleEditInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditPermitOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditPermitSubmit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Permit Dialog */}
      {permitToDelete && (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete permit #{permitToDelete.id}?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </DashboardLayout>
  );
};

export default PermitsPage;
