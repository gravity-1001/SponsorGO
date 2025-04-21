
import React, { useEffect, useState } from "react";
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

// Interface for event objects
interface Event {
  id: string;
  name: string;
  organizer: string; 
  date: string;
  status: string;
}

const ReviewEventsPage = () => {
  const [pendingEvents, setPendingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Review Events | SponsorGO";
    
    // Get submitted events from local storage
    const storedEvents = localStorage.getItem("pendingEvents");
    let eventsArray: Event[] = [];
    
    if (storedEvents) {
      try {
        eventsArray = JSON.parse(storedEvents);
        console.log("Loaded pending events from storage:", eventsArray);
      } catch (error) {
        console.error("Error parsing stored events:", error);
      }
    }
    
    // If no stored events or empty array, use mock data as fallback
    if (!eventsArray || eventsArray.length === 0) {
      console.log("Using mock data for pending events");
      eventsArray = [
        {
          id: "1",
          name: "Alegria 2025",
          organizer: "Pillai HOC College of Engineering",
          date: "2025-03-15",
          status: "pending",
        },
        {
          id: "2",
          name: "Algorithm 10.0",
          organizer: "Kalsekar Technical Campus",
          date: "2025-04-22",
          status: "pending",
        },
        {
          id: "3",
          name: "Technovanza",
          organizer: "VJTI Mumbai",
          date: "2025-02-28",
          status: "pending",
        },
      ];
    }
    
    setPendingEvents(eventsArray);
    setLoading(false);
  }, []);

  const handleApprove = (id: string) => {
    // Find the event to approve
    const eventToApprove = pendingEvents.find(event => event.id === id);
    if (!eventToApprove) return;

    // Remove the event from pending events
    const updatedEvents = pendingEvents.filter(event => event.id !== id);
    setPendingEvents(updatedEvents);
    
    // Update pending events in local storage
    localStorage.setItem("pendingEvents", JSON.stringify(updatedEvents));
    
    // Get existing public events from local storage
    const publicEventsStr = localStorage.getItem("publicEvents");
    let publicEvents = [];
    
    try {
      if (publicEventsStr) {
        publicEvents = JSON.parse(publicEventsStr);
      }
    } catch (error) {
      console.error("Error parsing public events:", error);
    }
    
    // Add the approved event to public events with status changed to "approved"
    const approvedEvent = { ...eventToApprove, status: "approved" };
    publicEvents.push(approvedEvent);
    
    // Save updated public events to local storage
    localStorage.setItem("publicEvents", JSON.stringify(publicEvents));
    
    toast({
      title: "Event Approved",
      description: "The event has been approved and is now public.",
    });
  };

  const handleReject = (id: string) => {
    // Remove the event from pending events
    const updatedEvents = pendingEvents.filter(event => event.id !== id);
    setPendingEvents(updatedEvents);
    
    // Update local storage
    localStorage.setItem("pendingEvents", JSON.stringify(updatedEvents));
    
    toast({
      title: "Event Rejected",
      description: "The event has been rejected and won't be published.",
    });
  };

  // Don't render anything while we're loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Review Events</CardTitle>
            <CardDescription>
              Review and approve events submitted by colleges across India.
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

