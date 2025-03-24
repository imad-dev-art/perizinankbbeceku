import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Calendar,
  User,
  Truck,
  DollarSign,
  MapPin,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sample permit data for review
const pendingPermits = [
  {
    id: 202401,
    type: "Export",
    submissionDate: new Date(2024, 4, 15),
    status: "Pending Review",
    description: "Export of electronic components to Japan",
    applicant: "ABC Electronics Ltd.",
    applicantEmail: "contact@abcelectronics.com",
    applicantPhone: "+1 (555) 123-4567",
    goods: "Semiconductor components",
    quantity: "5000 units",
    value: "$125,000",
    originCountry: "United States",
    destinationCountry: "Japan",
    expectedDate: "2024-06-10",
    documents: [
      { name: "Commercial Invoice.pdf", size: 1240000 },
      { name: "Packing List.pdf", size: 890000 },
      { name: "Certificate of Origin.pdf", size: 1050000 },
    ],
    notes: "Priority shipment for key customer",
  },
  {
    id: 202405,
    type: "Export",
    submissionDate: new Date(2024, 4, 5),
    status: "Pending Review",
    description: "Export of agricultural products to Singapore",
    applicant: "Fresh Farms Ltd.",
    applicantEmail: "exports@freshfarms.com",
    applicantPhone: "+1 (555) 987-6543",
    goods: "Organic fruits",
    quantity: "5 tons",
    value: "$15,000",
    originCountry: "United States",
    destinationCountry: "Singapore",
    expectedDate: "2024-05-25",
    documents: [
      { name: "Commercial Invoice.pdf", size: 950000 },
      { name: "Phytosanitary Certificate.pdf", size: 1120000 },
      { name: "Packing List.pdf", size: 780000 },
    ],
    notes: "Perishable goods requiring expedited processing",
  },
  {
    id: 202406,
    type: "Import",
    submissionDate: new Date(2024, 4, 3),
    status: "Pending Review",
    description: "Import of pharmaceutical ingredients from India",
    applicant: "MediCare Pharmaceuticals",
    applicantEmail: "imports@medicare-pharma.com",
    applicantPhone: "+1 (555) 456-7890",
    goods: "API compounds",
    quantity: "500 kg",
    value: "$85,000",
    originCountry: "India",
    destinationCountry: "United States",
    expectedDate: "2024-05-30",
    documents: [
      { name: "Commercial Invoice.pdf", size: 1050000 },
      { name: "Certificate of Analysis.pdf", size: 1350000 },
      { name: "Import Declaration.pdf", size: 920000 },
      { name: "Safety Data Sheet.pdf", size: 1680000 },
    ],
    notes: "Controlled substances requiring special handling",
  },
];

const PermitReviewPage = () => {
  // State for permits data
  const [permits, setPermits] = useState(pendingPermits);
  const [filteredPermits, setFilteredPermits] = useState(pendingPermits);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // State for selected permit and review
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewDecision, setReviewDecision] = useState("");

  // State for review confirmation dialog
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // Handle search and filter changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value, typeFilter);
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
    applyFilters(searchTerm, e.target.value);
  };

  // Apply all filters
  const applyFilters = (search, type) => {
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

    // Apply type filter
    if (type) {
      filtered = filtered.filter((permit) => permit.type === type);
    }

    setFilteredPermits(filtered);
  };

  // Handle permit selection for review
  const handleSelectPermit = (permit) => {
    setSelectedPermit(permit);
    setReviewNotes("");
    setReviewDecision("");
  };

  // Handle review submission
  const handleSubmitReview = () => {
    if (!reviewDecision) {
      alert("Please select a decision (Approve or Reject)");
      return;
    }

    setIsConfirmDialogOpen(true);
  };

  // Confirm and process the review decision
  const confirmReviewDecision = () => {
    // Update the permit status based on the decision
    const updatedPermits = permits.filter((p) => p.id !== selectedPermit.id);
    setPermits(updatedPermits);
    setFilteredPermits(
      updatedPermits.filter((p) => p.type === typeFilter || typeFilter === ""),
    );

    // Close dialogs and reset selection
    setIsConfirmDialogOpen(false);
    setSelectedPermit(null);
    setReviewNotes("");
    setReviewDecision("");

    // In a real app, you would send this to an API
    console.log(
      `Permit #${selectedPermit.id} ${reviewDecision}d with notes: ${reviewNotes}`,
    );

    // If approved, the permit would move to the approval queue
    if (reviewDecision === "Approve") {
      // In a real app, this would update a database
      console.log(`Permit #${selectedPermit.id} moved to approval queue`);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Permit Review</h1>
          <p className="text-gray-500">
            Review and process pending permit applications
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {filteredPermits.length} Pending Reviews
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel - Permit list */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pending Applications</CardTitle>
              <CardDescription>Select an application to review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search permits..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <select
                    className="h-10 px-3 py-2 border rounded-md w-32"
                    value={typeFilter}
                    onChange={handleTypeFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="Import">Import</option>
                    <option value="Export">Export</option>
                  </select>
                </div>

                <div className="border rounded-md overflow-hidden">
                  {filteredPermits.length > 0 ? (
                    <div className="divide-y">
                      {filteredPermits.map((permit) => (
                        <div
                          key={permit.id}
                          className={`p-3 hover:bg-gray-50 cursor-pointer ${selectedPermit?.id === permit.id ? "bg-primary/5 border-l-4 border-primary" : ""}`}
                          onClick={() => handleSelectPermit(permit)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium">
                              #{permit.id} - {permit.type}
                            </h3>
                            <Badge
                              variant={
                                permit.type === "Import"
                                  ? "secondary"
                                  : "default"
                              }
                              className="ml-2"
                            >
                              {permit.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1 line-clamp-1">
                            {permit.description}
                          </p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>{permit.applicant}</span>
                            <span>
                              {permit.submissionDate.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No pending permits found</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right panel - Permit details and review form */}
        <div className="lg:col-span-2">
          {selectedPermit ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Permit #{selectedPermit.id}</CardTitle>
                      <CardDescription>
                        Submitted on{" "}
                        {selectedPermit.submissionDate.toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        selectedPermit.type === "Import"
                          ? "secondary"
                          : "default"
                      }
                      className="text-sm px-3 py-1"
                    >
                      {selectedPermit.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                      <TabsTrigger value="applicant">Applicant</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <FileText className="h-4 w-4 mr-2" />
                            Description
                          </div>
                          <p>{selectedPermit.description}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            Expected Date
                          </div>
                          <p>{selectedPermit.expectedDate}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Truck className="h-4 w-4 mr-2" />
                            Goods
                          </div>
                          <p>{selectedPermit.goods}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Value
                          </div>
                          <p>{selectedPermit.value}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-2" />
                            Origin
                          </div>
                          <p>{selectedPermit.originCountry}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-2" />
                            Destination
                          </div>
                          <p>{selectedPermit.destinationCountry}</p>
                        </div>
                      </div>

                      {selectedPermit.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <h4 className="text-sm font-medium mb-1">
                            Additional Notes:
                          </h4>
                          <p className="text-sm">{selectedPermit.notes}</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="documents" className="pt-4">
                      <div className="space-y-3">
                        {selectedPermit.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-md"
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                                <FileText className="h-5 w-5 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-xs text-gray-500">
                                  {(doc.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="applicant" className="pt-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="h-4 w-4 mr-2" />
                              Company
                            </div>
                            <p>{selectedPermit.applicant}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-2" />
                              Submission Date
                            </div>
                            <p>
                              {selectedPermit.submissionDate.toLocaleDateString()}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              Email
                            </div>
                            <p>{selectedPermit.applicantEmail}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              Phone
                            </div>
                            <p>{selectedPermit.applicantPhone}</p>
                          </div>
                        </div>

                        <div className="flex justify-between mt-4">
                          <Button variant="outline" size="sm">
                            View Applicant History
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact Applicant
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Review Decision</CardTitle>
                  <CardDescription>
                    Provide your assessment and decision for this permit
                    application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reviewNotes">Review Notes</Label>
                      <Textarea
                        id="reviewNotes"
                        placeholder="Enter your review comments here..."
                        className="min-h-[120px]"
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Decision</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="approve"
                            name="decision"
                            className="sr-only"
                            checked={reviewDecision === "Approve"}
                            onChange={() => setReviewDecision("Approve")}
                          />
                          <label
                            htmlFor="approve"
                            className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer ${reviewDecision === "Approve" ? "bg-green-100 text-green-800 border border-green-300" : "bg-gray-100 text-gray-800 border border-gray-200"}`}
                          >
                            <CheckCircle className="h-5 w-5" />
                            Approve
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="reject"
                            name="decision"
                            className="sr-only"
                            checked={reviewDecision === "Reject"}
                            onChange={() => setReviewDecision("Reject")}
                          />
                          <label
                            htmlFor="reject"
                            className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer ${reviewDecision === "Reject" ? "bg-red-100 text-red-800 border border-red-300" : "bg-gray-100 text-gray-800 border border-gray-200"}`}
                          >
                            <XCircle className="h-5 w-5" />
                            Reject
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPermit(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitReview}>Submit Review</Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No Permit Selected</h3>
                <p className="text-gray-500 mb-4">
                  Select a permit from the list to review its details
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reviewDecision === "Approve"
                ? "Approve Permit"
                : "Reject Permit"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {reviewDecision.toLowerCase()} permit #
              {selectedPermit?.id}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-3 rounded-md bg-gray-50">
              <p className="font-medium mb-1">Review Notes:</p>
              <p className="text-sm">{reviewNotes || "No notes provided"}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={reviewDecision === "Approve" ? "default" : "destructive"}
              onClick={confirmReviewDecision}
            >
              Confirm {reviewDecision}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PermitReviewPage;
