import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  logoUrl?: string;
}

const AuthLayout = ({
  children,
  title = "Customs Permit Management System",
  subtitle = "Sign in to access your account",
  logoUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=customs",
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-primary p-8 text-white flex-col justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={logoUrl}
            alt="Logo"
            className="h-10 w-10 rounded-full bg-white p-1"
          />
          <h1 className="text-xl font-bold">Bonded Zone Permit System</h1>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-lg opacity-90">
            Streamline your customs permit process with our comprehensive
            management system. Submit, track, and process permits for goods
            entering or leaving bonded storage areas.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              </div>
              <p className="text-sm">
                Secure and efficient permit application process
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <p className="text-sm">Real-time tracking of permit status</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm">
                Comprehensive dashboard for monitoring applications
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Separator className="bg-white/20 my-6" />
          <div className="flex justify-between items-center">
            <p className="text-sm opacity-70">© 2023 Customs Department</p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 p-2 h-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 p-2 h-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-white">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardContent className="p-8">
            <div className="md:hidden flex items-center justify-center mb-8">
              <img
                src={logoUrl}
                alt="Logo"
                className="h-16 w-16 rounded-full bg-primary p-2"
              />
            </div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            </div>

            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
