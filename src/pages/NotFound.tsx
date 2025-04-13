
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="inline-block p-4 bg-sponsorgo-purple-light rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sponsorgo-purple">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-sponsorgo-gray-dark mb-4">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</p>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Please check the URL or go back to the homepage.
        </p>
        <Link to="/">
          <Button className="bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
