
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

const events = [
  {
    id: 1,
    title: "TechHacks 2025",
    category: "Hackathon",
    university: "Stanford University",
    location: "Palo Alto, CA",
    date: "May 15-17, 2025",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=90",
    sponsorshipAmount: 10000,
  },
  {
    id: 2,
    title: "Business Summit",
    category: "Conference",
    university: "Harvard Business School",
    location: "Boston, MA",
    date: "June 5-6, 2025",
    attendees: 300,
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&auto=format&fit=crop&q=90",
    sponsorshipAmount: 7500,
  },
  {
    id: 3,
    title: "Design Expo",
    category: "Exhibition",
    university: "Rhode Island School of Design",
    location: "Providence, RI",
    date: "July 12, 2025",
    attendees: 250,
    image: "https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=600&auto=format&fit=crop&q=90",
    sponsorshipAmount: 5000,
  },
];

const FeaturedEvents = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events Seeking Sponsors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover top college events looking for sponsorships and make impactful connections with the next generation of professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link to={`/events/${event.id}`} key={event.id}>
              <Card className="overflow-hidden h-full card-hover">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary" className="bg-sponsorgo-purple-light text-sponsorgo-purple mb-2">
                      {event.category}
                    </Badge>
                    <div className="text-right">
                      <span className="block text-sponsorgo-purple font-bold">${event.sponsorshipAmount.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">Sponsorship</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-500 mb-4">{event.university}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-sponsorgo-purple" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-sponsorgo-purple" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-sponsorgo-purple" />
                      <span>{event.attendees} Expected Attendees</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 bg-gray-50 border-t">
                  <div className="w-full text-center text-sponsorgo-purple font-medium">
                    Learn More
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/events">
            <Button className="bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

import { Button } from "@/components/ui/button";

export default FeaturedEvents;
