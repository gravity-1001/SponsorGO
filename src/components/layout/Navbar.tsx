
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

// Extend the Window interface to include our custom function
declare global {
  interface Window {
    setAdminMode: (isAdmin: boolean) => void;
  }
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if the current user is an admin when the component mounts
    // and again whenever localStorage changes
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
      console.log("Admin status checked:", localStorage.getItem("isAdmin") === "true");
    };
    
    // Initial check
    checkAdminStatus();
    
    // Listen for storage events (in case admin status changes in another tab)
    window.addEventListener('storage', checkAdminStatus);
    
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  // Add this for debugging - you can call this from your browser console with setAdminMode(true)
  if (typeof window !== 'undefined') {
    window.setAdminMode = (isAdmin) => {
      localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
      setIsAdmin(isAdmin);
      console.log(`Admin mode ${isAdmin ? 'enabled' : 'disabled'}`);
    };
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-sponsorgo-purple text-2xl font-bold">SponsorGO</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/sponsor" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-sponsorgo-purple hover:bg-gray-50">
              Be a Sponsor
            </Link>
            <Link to="/create-event" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-sponsorgo-purple hover:bg-gray-50">
              Get a Sponsor
            </Link>
            <Link to="/events" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-sponsorgo-purple hover:bg-gray-50">
              Search Events
            </Link>
            {/* The Review Events link is only visible to admins - completely hidden from regular users */}
            {isAdmin && (
              <Link to="/review-events" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-sponsorgo-purple hover:bg-gray-50">
                Review Events
              </Link>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="text-sponsorgo-purple border-sponsorgo-purple hover:bg-sponsorgo-purple hover:text-white">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark">Sign up</Button>
            </Link>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/sponsor"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sponsorgo-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Be a Sponsor
            </Link>
            <Link
              to="/create-event"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sponsorgo-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Sponsor
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sponsorgo-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Search Events
            </Link>
            {/* The Review Events link is also hidden from the mobile menu for non-admins */}
            {isAdmin && (
              <Link
                to="/review-events"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sponsorgo-purple hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Review Events
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 gap-2">
              <Link to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full text-sponsorgo-purple border-sponsorgo-purple hover:bg-sponsorgo-purple hover:text-white">
                  Log in
                </Button>
              </Link>
              <Link to="/signup" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
