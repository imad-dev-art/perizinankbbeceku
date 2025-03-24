import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  FileText,
  Calendar,
  User,
  Truck,
  DollarSign,
  MapPin,
  Printer,
  ArrowLeft,
  Stamp,
  CheckCircle,
} from "lucide-react";
import DashboardLayout from "./DashboardLayout";

// Sample approved permits data
const approvedPermits = [
  {
    id: 202410,
    permitNumber: "BZ-EXP-202410",
    type: "Export",
    submissionDate: new Date(2024, 4, 12),
    reviewDate: new Date(2024, 4, 14),
    approvalDate: new Date(2024, 4, 16),
    expiryDate: new Date(2025, 4, 16),
    status: "Approved",
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
    approverName: "Michael Johnson",
    approverNotes: "Approved as recommended. No additional conditions.",
  },
  {
    id: 202411,
    permitNumber: "BZ-IMP-202411",
    type: "Import",
    submissionDate: new Date(2024, 4, 10),
    reviewDate: new Date(2024, 4, 13),
    approvalDate: new Date(2024, 4, 15),
    expiryDate: new Date(2025, 4, 15),
    status: "Approved",
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
    approverName: "Sarah Williams",
    approverNotes:
      "Approved. Duty payment must be completed before goods release.",
  },
  {
    id: 202412,
    permitNumber: "BZ-EXP-202412",
    type: "Export",
    submissionDate: new Date(2024, 4, 8),
    reviewDate: new Date(2024, 4, 11),
    approvalDate: new Date(2024, 4, 14),
    expiryDate: new Date(2025, 4, 14),
    status: "Approved",
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
    approverName: "Emily Davis",
    approverNotes:
      "Approved with condition: End-user certificate must be verified before shipment.",
  },
];

const PrintApprovalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [permit, setPermit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    if (id) {
      const permitId = parseInt(id);
      console.log("Looking for permit with ID:", permitId);
      const foundPermit = approvedPermits.find((p) => p.id === permitId);
      console.log("Found permit:", foundPermit);

      if (foundPermit) {
        setPermit(foundPermit);
      }
    }
    setLoading(false);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading permit details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!permit) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg mb-4">Permit not found or not approved</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold">Print Approval</h1>
          <p className="text-gray-500">
            Print official permit approval document
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print Approval
          </Button>
        </div>
      </div>

      <div className="print:m-0 print:p-0 print:shadow-none">
        <Card className="print:border-none print:shadow-none">
          <CardContent className="p-8">
            {/* Header with logo and title */}
            <div className="flex justify-between items-center border-b pb-6 mb-6">
              <div className="flex items-center">
                <div className="mr-4 bg-primary/10 p-3 rounded-full">
                  <Stamp className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    OFFICIAL PERMIT APPROVAL
                  </h1>
                  <p className="text-gray-500">Bonded Zone Authority</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">Permit #{permit.id}</p>
                <p className="text-primary font-bold">{permit.permitNumber}</p>
              </div>
            </div>

            {/* Approval status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="font-medium">APPROVED</p>
                <p className="text-sm text-gray-600">
                  This permit has been officially approved on{" "}
                  {permit.approvalDate.toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Permit details */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">Permit Details</h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-sm text-gray-500">Permit Type</p>
                  <p className="font-medium">{permit.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Permit Number</p>
                  <p className="font-medium">{permit.permitNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Issue Date</p>
                  <p className="font-medium">
                    {permit.approvalDate.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="font-medium">
                    {permit.expiryDate.toLocaleDateString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">{permit.description}</p>
                </div>
              </div>
            </div>

            {/* Applicant details */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">Applicant Information</h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-sm text-gray-500">Applicant</p>
                  <p className="font-medium">{permit.applicant}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Email</p>
                  <p className="font-medium">{permit.applicantEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Phone</p>
                  <p className="font-medium">{permit.applicantPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p className="font-medium">
                    {permit.submissionDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Goods details */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">Goods Information</h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-sm text-gray-500">Goods Description</p>
                  <p className="font-medium">{permit.goods}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium">{permit.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Value</p>
                  <p className="font-medium">{permit.value}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expected Date</p>
                  <p className="font-medium">{permit.expectedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Origin Country</p>
                  <p className="font-medium">{permit.originCountry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Destination Country</p>
                  <p className="font-medium">{permit.destinationCountry}</p>
                </div>
              </div>
            </div>

            {/* Approval information */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">Approval Information</h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-sm text-gray-500">Reviewed By</p>
                  <p className="font-medium">{permit.reviewerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Approved By</p>
                  <p className="font-medium">{permit.approverName}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Review Notes</p>
                  <p className="font-medium">{permit.reviewerNotes}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Approval Notes</p>
                  <p className="font-medium">{permit.approverNotes}</p>
                </div>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="mb-6 border-t pt-6">
              <h2 className="text-lg font-bold mb-4">Terms and Conditions</h2>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>This permit is valid until the expiry date shown above.</li>
                <li>
                  The permit is non-transferable and applies only to the goods
                  described herein.
                </li>
                <li>
                  The permit holder must comply with all applicable customs
                  regulations.
                </li>
                <li>
                  This permit may be revoked if any information provided is
                  found to be false or misleading.
                </li>
                <li>
                  The permit must be presented to customs authorities upon
                  request.
                </li>
              </ol>
            </div>

            {/* Official signatures */}
            <div className="grid grid-cols-2 gap-8 mt-12 mb-6">
              <div className="border-t pt-4">
                <p className="font-medium">Customs Officer Signature</p>
                <p className="text-sm text-gray-500">
                  Date: {permit.approvalDate.toLocaleDateString()}
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="font-medium">Official Stamp</p>
                <p className="text-sm text-gray-500">Bonded Zone Authority</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 mt-12 pt-6 border-t">
              <p>
                This is an official document issued by the Bonded Zone
                Authority.
              </p>
              <p>
                Document ID: {permit.permitNumber}-{new Date().getFullYear()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          body * {
            visibility: hidden;
          }
          .print\\:m-0 {
            margin: 0 !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:m-0,
          .print\\:m-0 * {
            visibility: visible;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default PrintApprovalPage;
