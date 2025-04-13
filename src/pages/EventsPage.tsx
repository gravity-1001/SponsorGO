
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar, MapPin, Users, Search, Filter } from "lucide-react";

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
    description: "A 48-hour hackathon challenging students to build innovative solutions for real-world problems. Sponsored by top tech companies with mentorship opportunities."
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
    description: "Annual business conference bringing together industry leaders and students to discuss emerging trends and opportunities in the global market."
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
    description: "Showcase of student design projects spanning industrial design, graphic design, architecture, and digital media. Great opportunity to scout emerging talent."
  },
  {
    id: 4,
    title: "AI & ML Symposium",
    category: "Symposium",
    university: "MIT",
    location: "Cambridge, MA",
    date: "August 22-24, 2025",
    attendees: 400,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=90",
    sponsorshipAmount: 15000,
    description: "A three-day symposium focused on recent advancements in artificial intelligence and machine learning with keynotes from leading researchers in the field."
  },
  {
    id: 5,
    title: "College Film Festival",
    category: "Festival",
    university: "NYU Tisch School of the Arts",
    location: "New York, NY",
    date: "September 18-20, 2025",
    attendees: 600,
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&auto=format&fit=crop&q=90",
    sponsorshipAmount: 8000,
    description: "Annual showcase of student films from one of the top film schools in the country, featuring screenings, workshops, and networking events with industry professionals."
  },
  {
    id: 6,
    title: "Engineering Fair",
    category: "Fair",
    university: "Georgia Tech",
    location: "Atlanta, GA",
    date: "October 5, 2025",
    attendees: 350,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=90",
    sponsorshipAmount: 6000,
    description: "Exhibition of innovative engineering projects across electrical, mechanical, civil, and computer engineering disciplines with opportunities for student recruitment."
  }
];

const categories = [
  "All Categories", "Hackathon", "Conference", "Exhibition", "Symposium", "Festival", "Fair"
];

const locations = [
  "All Locations", "Palo Alto, CA", "Boston, MA", "Providence, RI", "Cambridge, MA", "New York, NY", "Atlanta, GA"
];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [budgetRange, setBudgetRange] = useState([0, 20000]);
  const [attendeeRange, setAttendeeRange] = useState([0, 1000]);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.university.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesCategory = categoryFilter === "All Categories" || event.category === categoryFilter;
    const matchesLocation = locationFilter === "All Locations" || event.location.includes(locationFilter);
    const matchesBudget = event.sponsorshipAmount >= budgetRange[0] && event.sponsorshipAmount <= budgetRange[1];
    const matchesAttendees = event.attendees >= attendeeRange[0] && event.attendees <= attendeeRange[1];
    
    return matchesSearch && matchesCategory && matchesLocation && matchesBudget && matchesAttendees;
  });

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-sponsorgo-purple-light/30 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Events to Sponsor</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover college events that align with your brand and connect with the next generation of professionals.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search events, keywords, universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="md:hidden">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={() => setMobileFiltersVisible(!mobileFiltersVisible)}
                >
                  <Filter size={18} />
                  Filters
                </Button>
              </div>
              <div className="hidden md:flex gap-4">
                <div className="w-48">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-48">
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark whitespace-nowrap">
                  Search Events
                </Button>
              </div>
            </div>
            
            {mobileFiltersVisible && (
              <div className="md:hidden mt-4 space-y-4 border-t pt-4">
                <div>
                  <Label>Event Type</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Location</Label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Budget Range</Label>
                    <span className="text-sm">
                      ${budgetRange[0].toLocaleString()} - ${budgetRange[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={budgetRange}
                    min={0}
                    max={20000}
                    step={500}
                    onValueChange={setBudgetRange}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Attendees</Label>
                    <span className="text-sm">
                      {attendeeRange[0]} - {attendeeRange[1]}
                    </span>
                  </div>
                  <Slider
                    value={attendeeRange}
                    min={0}
                    max={1000}
                    step={50}
                    onValueChange={setAttendeeRange}
                    className="mt-2"
                  />
                </div>
                
                <Button className="w-full bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark">
                  Apply Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="font-semibold text-xl mb-6">Filters</h3>
              
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block">Event Type</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-2 block">Location</Label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Budget Range</Label>
                    <span className="text-sm">
                      ${budgetRange[0].toLocaleString()} - ${budgetRange[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={budgetRange}
                    min={0}
                    max={20000}
                    step={500}
                    onValueChange={setBudgetRange}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Attendees</Label>
                    <span className="text-sm">
                      {attendeeRange[0]} - {attendeeRange[1]}
                    </span>
                  </div>
                  <Slider
                    value={attendeeRange}
                    min={0}
                    max={1000}
                    step={50}
                    onValueChange={setAttendeeRange}
                  />
                </div>
                
                <Button className="w-full bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"} Available
              </h2>
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                  <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                  <SelectItem value="attendees">Most Attendees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <Link to={`/events/${event.id}`} key={event.id}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
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
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      
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
                  </Card>
                </Link>
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-2xl font-semibold text-gray-500">No events match your filters</p>
                <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("All Categories");
                    setLocationFilter("All Locations");
                    setBudgetRange([0, 20000]);
                    setAttendeeRange([0, 1000]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
