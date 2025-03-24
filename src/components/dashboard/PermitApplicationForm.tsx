import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import DashboardLayout from "./DashboardLayout";

const PermitApplicationForm = () => {
  const [formData, setFormData] = useState({
    permitType: "import",
    applicantName: "",
    applicantCompany: "",
    applicantEmail: "",
    applicantPhone: "",
    goodsDescription: "",
    goodsQuantity: "",
    goodsValue: "",
    originCountry: "",
    destinationCountry: "",
    expectedDate: "",
    additionalInfo: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after success message
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          permitType: "import",
          applicantName: "",
          applicantCompany: "",
          applicantEmail: "",
          applicantPhone: "",
          goodsDescription: "",
          goodsQuantity: "",
          goodsValue: "",
          originCountry: "",
          destinationCountry: "",
          expectedDate: "",
          additionalInfo: "",
        });
        setUploadedFiles([]);
      }, 3000);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">New Permit Application</h1>
        <p className="text-gray-500">
          Submit a new import/export permit request
        </p>
      </div>

      {submitSuccess ? (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Application Submitted Successfully
              </h2>
              <p className="text-green-700 mb-4">
                Your permit application has been submitted and is now pending
                review.
              </p>
              <p className="text-green-700">
                Application ID:{" "}
                <span className="font-semibold">
                  BZ-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Permit Type</CardTitle>
                <CardDescription>
                  Select the type of permit you are applying for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex">
                    <input
                      type="radio"
                      id="import"
                      name="permitType"
                      value="import"
                      className="sr-only"
                      checked={formData.permitType === "import"}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="import"
                      className={`flex-1 flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${formData.permitType === "import" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mb-2 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                      </svg>
                      <span className="text-lg font-medium">Import Permit</span>
                      <span className="text-sm text-gray-500 text-center mt-1">
                        For goods entering the bonded zone
                      </span>
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      id="export"
                      name="permitType"
                      value="export"
                      className="sr-only"
                      checked={formData.permitType === "export"}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="export"
                      className={`flex-1 flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${formData.permitType === "export" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mb-2 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="text-lg font-medium">Export Permit</span>
                      <span className="text-sm text-gray-500 text-center mt-1">
                        For goods leaving the bonded zone
                      </span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
                <CardDescription>
                  Provide details about the applicant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="applicantName">Full Name</Label>
                    <Input
                      id="applicantName"
                      name="applicantName"
                      value={formData.applicantName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applicantCompany">Company Name</Label>
                    <Input
                      id="applicantCompany"
                      name="applicantCompany"
                      value={formData.applicantCompany}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applicantEmail">Email Address</Label>
                    <Input
                      id="applicantEmail"
                      name="applicantEmail"
                      type="email"
                      value={formData.applicantEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applicantPhone">Phone Number</Label>
                    <Input
                      id="applicantPhone"
                      name="applicantPhone"
                      value={formData.applicantPhone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goods Information</CardTitle>
                <CardDescription>
                  Provide details about the goods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="goodsDescription">
                      Description of Goods
                    </Label>
                    <Textarea
                      id="goodsDescription"
                      name="goodsDescription"
                      value={formData.goodsDescription}
                      onChange={handleInputChange}
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="goodsQuantity">Quantity</Label>
                      <Input
                        id="goodsQuantity"
                        name="goodsQuantity"
                        value={formData.goodsQuantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goodsValue">Value (USD)</Label>
                      <Input
                        id="goodsValue"
                        name="goodsValue"
                        value={formData.goodsValue}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originCountry">Country of Origin</Label>
                      <Input
                        id="originCountry"
                        name="originCountry"
                        value={formData.originCountry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destinationCountry">
                        Destination Country
                      </Label>
                      <Input
                        id="destinationCountry"
                        name="destinationCountry"
                        value={formData.destinationCountry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expectedDate">
                      Expected Date of Import/Export
                    </Label>
                    <Input
                      id="expectedDate"
                      name="expectedDate"
                      type="date"
                      value={formData.expectedDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents</CardTitle>
                <CardDescription>
                  Upload required documents (Invoice, Packing List, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader onFilesUploaded={handleFileUpload} />
                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Uploaded Files:
                    </h4>
                    <ul className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Any other relevant details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Notes</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </DashboardLayout>
  );
};

export default PermitApplicationForm;
