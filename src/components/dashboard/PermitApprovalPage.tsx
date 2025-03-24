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
  Stamp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sample permit data for approval
const reviewedPermits = [
  {
    id: 202410,
    type: "Export",
    submissionDate: new Date(2024, 4, 12),
    reviewDate: new Date(2024, 4, 14),
    status: "Reviewed",
    description: "Export of automotive parts to Germany",
    applicant: "Auto Parts International",
    applicantEmail: "exports@autoparts.com",
    applicantPhone: "+1 (555) 234-5678",
    goods: "Engine components and accessories",
    quantity: "2500 units",
    value: "$78,000",
    originCountry: "United States",
    destinationCountry: "Germany",
    expectedDate: "2024-06-05",
    documents: [
      { name: "Commercial Invoice.pdf", size: 1240000 },
      { name: "Packing List.pdf", size: 890000 },
      { name: "Certificate of Origin.pdf", size: 1050000 },
    ],
    reviewerName: "Jane Smith",
    reviewerNotes:
      "All documentation is complete and accurate. Goods are properly classified. Recommend approval.",
    reviewerRecommendation: "Approve",
  },
  {
    id: 202411,
    type: "Import",
    submissionDate: new Date(2024, 4, 10),
    reviewDate: new Date(2024, 4, 13),
    status: "Reviewed",
    description: "Import of textile materials from India",
    applicant: "Fashion Fabrics Co.",
    applicantEmail: "imports@fashionfabrics.com",
    applicantPhone: "+1 (555) 345-6789",
    goods: "Cotton and silk fabrics",
    quantity: "1000 yards",
    value: "$35,000",
    originCountry: "India",
    destinationCountry: "United States",
    expectedDate: "2024-05-28",
    documents: [
      { name: "Commercial Invoice.pdf", size: 950000 },
      { name: "Packing List.pdf", size: 780000 },
      { name: "Import Declaration.pdf", size: 1120000 },
    ],
    reviewerName: "Robert Johnson",
    reviewerNotes:
      "Documentation is complete. Goods meet import requirements. Duty calculation is correct.",
    reviewerRecommendation: "Approve",
  },
  {
    id: 202412,
    type: "Export",
    submissionDate: new Date(2024, 4, 8),
    reviewDate: new Date(2024, 4, 11),
    status: "Reviewed",
    description: "Export of medical equipment to Brazil",
    applicant: "MedTech Solutions",
    applicantEmail: "exports@medtech.com",
    applicantPhone: "+1 (555) 456-7890",
    goods: "Diagnostic equipment",
    quantity: "50 units",
    value: "$250,000",
    originCountry: "United States",
    destinationCountry: "Brazil",
    expectedDate: "2024-06-15",
    documents: [
      { name: "Commercial Invoice.pdf", size: 1050000 },
      { name: "Packing List.pdf", size: 920000 },
      { name: "Certificate of Origin.pdf", size: 1350000 },
      { name: "Technical Specifications.pdf", size: 1680000 },
    ],
    reviewerName: "Michael Brown",
    reviewerNotes:
      "All documentation is in order. Equipment meets export control requirements. Recommend approval with condition to verify end-user certificate before shipment.",
    reviewerRecommendation: "Approve",
  },
];

const PermitApprovalPage = () => {
  // State for permits data
  const [permits, setPermits] = useState(reviewedPermits);
  const [filteredPermits, setFilteredPermits] = useState(reviewedPermits);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // State for selected permit and approval
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [approvalNotes, setApprovalNotes] = useState("");
  const [approvalDecision, setApprovalDecision] = useState("");
  const [permitNumber, setPermitNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // State for approval confirmation dialog
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

  // Handle permit selection for approval
  const handleSelectPermit = (permit) => {
    setSelectedPermit(permit);
    setApprovalNotes("");
    setApprovalDecision("");

    // Generate a permit number and set default expiry date
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    setPermitNumber(
      `BZ-${permit.type.substring(0, 3).toUpperCase()}-${permit.id}`,
    );
    setExpiryDate(nextYear.toISOString().split("T")[0]);
  };

  // Handle approval submission
  const handleSubmitApproval = () => {
    if (!approvalDecision) {
      alert("Please select a decision (Approve or Reject)");
      return;
    }

    if (approvalDecision === "Approve" && !permitNumber) {
      alert("Please enter a permit number");
      return;
    }

    if (approvalDecision === "Approve" && !expiryDate) {
      alert("Please enter an expiry date");
      return;
    }

    setIsConfirmDialogOpen(true);
  };

  // Confirm and process the approval decision
  const confirmApprovalDecision = () => {
    // Update the permit status based on the decision
    const updatedPermits = permits.filter((p) => p.id !== selectedPermit.id);
    setPermits(updatedPermits);
    setFilteredPermits(
      updatedPermits.filter((p) => p.type === typeFilter || typeFilter === ""),
    );

    // Close dialogs and reset selection
    setIsConfirmDialogOpen(false);
    setSelectedPermit(null);
    setApprovalNotes("");
    setApprovalDecision("");
    setPermitNumber("");
    setExpiryDate("");

    // In a real app, you would send this to an API
    console.log(
      `Permit #${selectedPermit.id} ${approvalDecision}d with notes: ${approvalNotes}`,
    );
    if (approvalDecision === "Approve") {
      console.log(`Permit Number: ${permitNumber}, Expiry Date: ${expiryDate}`);
      // Navigate to print approval page
      navigate(`/dashboard/permits/print/${selectedPermit.id}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Final Approval</h1>
          <p className="text-gray-500">
            Approve or reject reviewed permit applications
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {filteredPermits.length} Awaiting Approval
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel - Permit list */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Reviewed Applications</CardTitle>
              <CardDescription>
                Select an application to approve
              </CardDescription>
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
                              Reviewed: {permit.reviewDate.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No permits awaiting approval</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right panel - Permit details and approval form */}
        <div className="lg:col-span-2">
          {selectedPermit ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Permit #{selectedPermit.id}</CardTitle>
                      <CardDescription>
                        Reviewed on{" "}
                        {selectedPermit.reviewDate.toLocaleDateString()}
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
                  <Tabs defaultValue="review">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="review">Review Summary</TabsTrigger>
                      <TabsTrigger value="details">Permit Details</TabsTrigger>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                    </TabsList>

                    <TabsContent value="review" className="space-y-4 pt-4">
                      <div className="p-4 border rounded-md bg-gray-50">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            {selectedPermit.reviewerName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {selectedPermit.reviewerName}
                            </h3>
                            <p className="text-xs text-gray-500">
                              Customs Officer
                            </p>
                          </div>
                          <Badge
                            className="ml-auto"
                            variant={
                              selectedPermit.reviewerRecommendation ===
                              "Approve"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {selectedPermit.reviewerRecommendation}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Review Notes:</h4>
                          <p className="text-sm">
                            {selectedPermit.reviewerNotes}
                          </p>
                        </div>
                      </div>

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
                            <User className="h-4 w-4 mr-2" />
                            Applicant
                          </div>
                          <p>{selectedPermit.applicant}</p>
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
                      </div>
                    </TabsContent>

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
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Final Decision</CardTitle>
                  <CardDescription>
                    Make the final approval decision for this permit application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Decision selection */}
                    <div className="space-y-2">
                      <Label>Decision</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="approve"
                            name="decision"
                            className="sr-only"
                            checked={approvalDecision === "Approve"}
                            onChange={() => setApprovalDecision("Approve")}
                          />
                          <label
                            htmlFor="approve"
                            className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer ${approvalDecision === "Approve" ? "bg-green-100 text-green-800 border border-green-300" : "bg-gray-100 text-gray-800 border border-gray-200"}`}
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
                            checked={approvalDecision === "Reject"}
                            onChange={() => setApprovalDecision("Reject")}
                          />
                          <label
                            htmlFor="reject"
                            className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer ${approvalDecision === "Reject" ? "bg-red-100 text-red-800 border border-red-300" : "bg-gray-100 text-gray-800 border border-gray-200"}`}
                          >
                            <XCircle className="h-5 w-5" />
                            Reject
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Permit details if approving */}
                    {approvalDecision === "Approve" && (
                      <div className="space-y-4 p-4 border rounded-md bg-green-50">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="permitNumber"
                              className="flex items-center gap-1"
                            >
                              <Stamp className="h-4 w-4" /> Permit Number
                            </Label>
                            <Input
                              id="permitNumber"
                              value={permitNumber}
                              onChange={(e) => setPermitNumber(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="expiryDate"
                              className="flex items-center gap-1"
                            >
                              <Calendar className="h-4 w-4" /> Expiry Date
                            </Label>
                            <Input
                              id="expiryDate"
                              type="date"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notes field */}
                    <div className="space-y-2">
                      <Label htmlFor="approvalNotes">Notes</Label>
                      <Textarea
                        id="approvalNotes"
                        placeholder="Enter any additional notes or conditions..."
                        className="min-h-[100px]"
                        value={approvalNotes}
                        onChange={(e) => setApprovalNotes(e.target.value)}
                      />
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
                  <Button onClick={handleSubmitApproval}>
                    Submit Decision
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No Permit Selected</h3>
                <p className="text-gray-500 mb-4">
                  Select a reviewed permit from the list to make a final
                  decision
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
              {approvalDecision === "Approve"
                ? "Issue Permit"
                : "Reject Application"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {approvalDecision.toLowerCase()} permit #
              {selectedPermit?.id}?
              {approvalDecision === "Approve" &&
                " This will issue the official permit to the applicant."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {approvalDecision === "Approve" && (
              <div className="grid grid-cols-2 gap-4 p-3 rounded-md bg-green-50">
                <div>
                  <p className="text-sm text-gray-500">Permit Number</p>
                  <p className="font-medium">{permitNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="font-medium">
                    {new Date(expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            <div className="p-3 rounded-md bg-gray-50">
              <p className="font-medium mb-1">Notes:</p>
              <p className="text-sm">{approvalNotes || "No notes provided"}</p>
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
              variant={
                approvalDecision === "Approve" ? "default" : "destructive"
              }
              onClick={confirmApprovalDecision}
            >
              Confirm {approvalDecision}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PermitApprovalPage;
