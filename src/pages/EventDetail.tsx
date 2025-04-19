
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  DollarSign, 
  Globe, 
  Mail, 
  Share2, 
  Heart, 
  HeartOff,
  CheckCircle,
  Ticket
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { formatIndianCurrency } from "@/lib/utils";

// Mock data for an event
const eventData = {
  id: 1,
  title: "TechHacks 2025",
  category: "Hackathon",
  university: "Stanford University",
  location: "Palo Alto, CA",
  date: "May 15-17, 2025",
  time: "9:00 AM - 9:00 PM",
  attendees: 500,
  images: [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=90",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=90",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=90"
  ],
  sponsorshipAmount: 10000,
  description: `TechHacks 2025 is Stanford University's premier hackathon, bringing together 500 of the brightest student minds across the West Coast. Over 48 action-packed hours, participants will compete to develop innovative solutions to real-world challenges.

This event provides an unparalleled opportunity for sponsors to connect with top student talent, showcase products and APIs, and recruit future team members. Previous participants have gone on to become engineers at leading tech companies and founders of successful startups.

Sponsors will receive prominent branding throughout the event, including on the event website, t-shirts, and venue signage. Additionally, sponsors can host workshops, send mentors, and engage directly with participants throughout the hackathon.`,
  venue: "Computer Science Building, Stanford University",
  website: "https://techhacks-stanford.edu",
  contactEmail: "organizers@techhacks-stanford.edu",
  ticketPrice: 500,
  ticketsAvailable: 200,
  registrationDeadline: "May 1, 2025",
  eventHighlights: ["Coding competitions", "Networking sessions", "Tech workshops", "Mentorship opportunities"],
  benefits: [
    "Logo placement on event website, t-shirts, and venue signage",
    "Opportunity to send mentors and judges",
    "Ability to host a sponsored workshop or tech talk",
    "Access to participant resumes and GitHub profiles",
    "Demo booth throughout the event",
    "Social media promotion across all channels"
  ],
  packages: [
    {
      level: "Gold",
      price: 10000,
      includes: ["All benefits listed above", "Prime logo placement", "Keynote speaking opportunity", "First access to recruiting"]
    },
    {
      level: "Silver",
      price: 5000,
      includes: ["Logo on website and t-shirts", "Send mentors and judges", "Resume access", "Recruiting table"]
    },
    {
      level: "Bronze",
      price: 2500,
      includes: ["Logo on website", "Send mentors", "Resume access"]
    }
  ],
  organizer: {
    name: "Stanford Tech Club",
    role: "Event Organizer",
    avatar: "ST"
  },
  previousSponsors: ["Google", "Microsoft", "Amazon", "Meta", "Apple"]
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [viewMode, setViewMode] = useState<"student" | "sponsor">("student");
  const { toast } = useToast();
  
  const handleSponsorNow = () => {
    toast({
      title: "Sponsor request initiated",
      description: "This is a placeholder. Connect to Supabase to handle actual sponsorship flow.",
    });
  };

  const handleRegisterNow = () => {
    toast({
      title: "Registration initiated",
      description: "This is a placeholder. Connect to Supabase to handle actual registration flow.",
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Event removed from your saved list." : "Event saved to your favorites.",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link to="/events" className="text-sponsorgo-purple hover:underline mb-4 inline-block">
            &larr; Back to Events
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-sponsorgo-purple-light text-sponsorgo-purple">
                  {eventData.category}
                </Badge>
                <span className="text-gray-500 text-sm">ID: {id}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{eventData.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{eventData.university}</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={toggleFavorite} className="flex items-center gap-2">
                {isFavorite ? (
                  <>
                    <HeartOff size={16} /> Unsave
                  </>
                ) : (
                  <>
                    <Heart size={16} /> Save
                  </>
                )}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 size={16} /> Share
              </Button>
              <div className="flex items-center">
                <Button 
                  variant={viewMode === "student" ? "default" : "outline"}
                  onClick={() => setViewMode("student")}
                  className={viewMode === "student" ? "bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark rounded-r-none" : "rounded-r-none"}
                >
                  Student
                </Button>
                <Button 
                  variant={viewMode === "sponsor" ? "default" : "outline"}
                  onClick={() => setViewMode("sponsor")}
                  className={viewMode === "sponsor" ? "bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark rounded-l-none" : "rounded-l-none"}
                >
                  Sponsor
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="rounded-lg overflow-hidden h-[400px] mb-2">
                <img 
                  src={eventData.images[activeImageIndex]} 
                  alt={eventData.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {eventData.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`cursor-pointer rounded-md overflow-hidden h-20 w-32 flex-shrink-0 border-2 ${
                      activeImageIndex === index ? 'border-sponsorgo-purple' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${eventData.title} ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="about">
              <TabsList className="w-full">
                <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                {viewMode === "sponsor" ? (
                  <TabsTrigger value="packages" className="flex-1">Sponsorship Packages</TabsTrigger>
                ) : (
                  <TabsTrigger value="highlights" className="flex-1">Event Highlights</TabsTrigger>
                )}
                <TabsTrigger value="venue" className="flex-1">Venue</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6">
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold mb-4">Event Details</h3>
                  <p className="whitespace-pre-line mb-6">{eventData.description}</p>
                  
                  {viewMode === "sponsor" && (
                    <>
                      <h4 className="text-xl font-semibold mt-8 mb-4">Sponsorship Benefits</h4>
                      <ul className="space-y-2">
                        {eventData.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="text-xl font-semibold mt-8 mb-4">Previous Sponsors</h4>
                      <div className="flex flex-wrap gap-4">
                        {eventData.previousSponsors.map((sponsor, index) => (
                          <div key={index} className="px-4 py-2 bg-gray-100 rounded-md">
                            {sponsor}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {viewMode === "student" && eventData.eventHighlights && (
                    <>
                      <h4 className="text-xl font-semibold mt-8 mb-4">Event Highlights</h4>
                      <ul className="space-y-2">
                        {eventData.eventHighlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="text-xl font-semibold mt-8 mb-4">Registration Details</h4>
                      <p>Registration Deadline: {eventData.registrationDeadline}</p>
                      <p>Tickets Available: {eventData.ticketsAvailable}</p>
                      <p>Ticket Price: {eventData.ticketPrice ? formatIndianCurrency(eventData.ticketPrice) : "Free"}</p>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="packages" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {eventData.packages.map((pkg, index) => (
                    <Card key={index} className={index === 0 ? "border-sponsorgo-purple border-2" : ""}>
                      {index === 0 && (
                        <div className="bg-sponsorgo-purple text-white py-1 text-center text-sm">
                          RECOMMENDED
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          {pkg.level}
                          <DollarSign className="h-5 w-5 text-sponsorgo-purple" />
                        </CardTitle>
                        <CardDescription className="text-2xl font-bold">{formatIndianCurrency(pkg.price)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {pkg.includes.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className={`w-full mt-4 ${index === 0 ? "bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark" : ""}`}
                          variant={index === 0 ? "default" : "outline"}
                          onClick={handleSponsorNow}
                        >
                          Select {pkg.level} Package
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="highlights" className="mt-6">
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold mb-4">Event Highlights</h3>
                  
                  {eventData.eventHighlights && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {eventData.eventHighlights.map((highlight, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex gap-4 items-start">
                              <div className="h-10 w-10 rounded-full bg-sponsorgo-purple-light/50 flex items-center justify-center text-sponsorgo-purple">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-medium text-lg">{highlight}</h4>
                                <p className="text-gray-500 mt-1">
                                  Join us for this exciting activity during {eventData.title}!
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-4 mt-8">Registration Details</h3>
                  <div className="bg-sponsorgo-purple-light/20 p-6 rounded-lg">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Registration Deadline</h4>
                        <p className="flex items-center gap-2 text-lg">
                          <Calendar className="h-5 w-5 text-sponsorgo-purple" />
                          {eventData.registrationDeadline}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Tickets Available</h4>
                        <p className="flex items-center gap-2 text-lg">
                          <Ticket className="h-5 w-5 text-sponsorgo-purple" />
                          {eventData.ticketsAvailable}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Ticket Price</h4>
                        <p className="flex items-center gap-2 text-lg font-bold text-sponsorgo-purple">
                          <DollarSign className="h-5 w-5" />
                          {eventData.ticketPrice ? formatIndianCurrency(eventData.ticketPrice) : "Free"}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6 bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark"
                      onClick={handleRegisterNow}
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="venue" className="mt-6">
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold mb-4">Venue Information</h3>
                  <p className="mb-6">{eventData.venue}</p>
                  
                  <div className="aspect-w-16 aspect-h-9 mb-6">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.3385231242983!2d-122.17308262363758!3d37.4320271261282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbb2a0a7b4967%3A0x11f72c1664cbb6f7!2sStanford%20University!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus" 
                      width="600" 
                      height="450" 
                      style={{ border: 0 }} 
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-96 rounded-lg"
                      title="Event venue location"
                    ></iframe>
                  </div>
                  
                  <h4 className="text-xl font-semibold mb-4">Getting There</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              {viewMode === "sponsor" ? (
                <>
                  <div className="pb-6 mb-6 border-b">
                    <div className="text-2xl font-bold text-sponsorgo-purple mb-1">
                      {formatIndianCurrency(eventData.sponsorshipAmount)}
                    </div>
                    <div className="text-sm text-gray-500 mb-6">Sponsorship starting at</div>
                    
                    <Button 
                      className="w-full bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark mb-3"
                      onClick={handleSponsorNow}
                    >
                      Sponsor Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Contact Organizer
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="pb-6 mb-6 border-b">
                    <div className="text-2xl font-bold text-sponsorgo-purple mb-1">
                      {eventData.ticketPrice ? formatIndianCurrency(eventData.ticketPrice) : "Free Entry"}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">Per ticket</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                      <Ticket className="h-4 w-4 text-sponsorgo-purple" /> 
                      <span>{eventData.ticketsAvailable} tickets remaining</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark mb-3"
                      onClick={handleRegisterNow}
                    >
                      Register Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Contact Organizer
                    </Button>
                  </div>
                </>
              )}
              
              <h3 className="font-semibold text-lg mb-4">Event Information</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-gray-600">{eventData.date}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-gray-600">{eventData.time}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-gray-600">{eventData.venue}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Expected Attendees</div>
                    <div className="text-gray-600">{eventData.attendees}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Website</div>
                    <a href={eventData.website} target="_blank" rel="noopener noreferrer" className="text-sponsorgo-purple hover:underline">{eventData.website.replace('https://', '')}</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Contact Email</div>
                    <a href={`mailto:${eventData.contactEmail}`} className="text-sponsorgo-purple hover:underline">{eventData.contactEmail}</a>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="font-semibold text-lg mb-4">Organizer</h3>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-sponsorgo-purple text-white">
                      {eventData.organizer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{eventData.organizer.name}</div>
                    <div className="text-sm text-gray-500">{eventData.organizer.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetail;
