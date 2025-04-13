
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Mock data for pending events - in a real app, this would come from your database
const mockPendingEvents = [
  {
    id: "1",
    name: "Tech Hackathon 2025",
    organizer: "MIT Tech Club",
    date: "2025-05-10",
    status: "pending",
  },
  {
    id: "2",
    name: "Science Fair Expo",
    organizer: "Stanford Science Association",
    date: "2025-06-15",
    status: "pending",
  },
  {
    id: "3",
    name: "Design Competition",
    organizer: "RISD Student Council",
    date: "2025-04-30",
    status: "pending",
  },
];

const ReviewEventsPage = () => {
  const [pendingEvents, setPendingEvents] = useState(mockPendingEvents);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Review Events | SponsorGO";
    
    // Check if the current user is an admin
    const userIsAdmin = localStorage.getItem("isAdmin") === "true";
    console.log("ReviewEventsPage: Initial admin check:", userIsAdmin);
    
    // Set the admin status
    setIsAdmin(userIsAdmin);
    setLoading(false);
    
    // Show access denied toast if not admin
    if (!userIsAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this page.",
        variant: "destructive",
      });
    }
    
    console.log("ReviewEventsPage mounted, admin status:", userIsAdmin);
  }, [toast]);

  const handleApprove = (id: string) => {
    // In a real app, you would call your API to approve the event
    setPendingEvents(pendingEvents.filter(event => event.id !== id));
    toast({
      title: "Event Approved",
      description: "The event has been approved and is now public.",
    });
  };

  const handleReject = (id: string) => {
    // In a real app, you would call your API to reject the event
    setPendingEvents(pendingEvents.filter(event => event.id !== id));
    toast({
      title: "Event Rejected",
      description: "The event has been rejected and won't be published.",
    });
  };

  // Don't render anything while we're checking admin status
  if (loading) {
    console.log("Page is loading, checking admin status...");
    return <div>Loading...</div>;
  }
  
  // If the user is not an admin, redirect them to the home page
  if (!isAdmin) {
    console.log("User is not admin, redirecting to home page");
    return <Navigate to="/" replace />;
  }

  console.log("Rendering ReviewEventsPage content for admin user");
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Review Events</CardTitle>
            <CardDescription>
              Review and approve events submitted by organizers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingEvents.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No pending events to review.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Organizer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.organizer}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link to={`/events/${event.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 hover:bg-green-50"
                            onClick={() => handleApprove(event.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleReject(event.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReviewEventsPage;
