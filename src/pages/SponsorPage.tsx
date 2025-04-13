
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Search, ChevronDown, Filter, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const featureEvents = [
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
    featured: true
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
    featured: true
  }
];

const testimonials = [
  {
    quote: "Sponsoring the MIT Hackathon through SponsorGO was the best decision we made. We were able to connect with incredible talent and showcase our API to hundreds of students.",
    name: "Michael Chen",
    role: "Developer Relations Lead",
    company: "TechCorp",
    avatar: "MC"
  },
  {
    quote: "The platform made it incredibly easy to find and support relevant college events. We've been able to build relationships with engineering departments across the country.",
    name: "Sarah Johnson",
    role: "University Outreach Manager",
    company: "Innovate Inc.",
    avatar: "SJ"
  },
  {
    quote: "What I love about SponsorGO is how it streamlines the entire sponsorship process. From discovery to payment to post-event analytics, everything is in one place.",
    name: "David Rodriguez",
    role: "Marketing Director",
    company: "Future Labs",
    avatar: "DR"
  }
];

const benefits = [
  {
    title: "Connect with Future Talent",
    description: "Engage directly with students who are passionate about your industry and could be your future employees."
  },
  {
    title: "Brand Visibility",
    description: "Get your brand in front of thousands of college students and establish your company as an industry leader."
  },
  {
    title: "Product Showcasing",
    description: "Demonstrate your products or APIs to students who can provide fresh insights and innovative use cases."
  },
  {
    title: "Recruitment Pipeline",
    description: "Create a direct channel to identify and recruit top talent before they even enter the job market."
  },
  {
    title: "Social Impact",
    description: "Support educational initiatives and make a positive impact on the student community."
  },
  {
    title: "Market Research",
    description: "Gain valuable insights into how Gen Z interacts with your products and what they're looking for."
  }
];

const SponsorPage = () => {
  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-sponsorgo-purple-light/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="bg-white mb-4 text-sponsorgo-purple">
                For Sponsors
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Connect Your Brand with College Events That Matter
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover and sponsor college events that align with your brand values. From hackathons to business competitions, find the perfect opportunities to connect with the next generation of professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/events">
                  <Button size="lg" className="bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark">
                    Browse Events
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-sponsorgo-purple-light/30 to-transparent rounded-full"></div>
              <Card className="bg-white shadow-xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=90" 
                    alt="Sponsor connecting with students" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Why Sponsor College Events?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                        <span>Connect with future industry leaders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                        <span>Showcase your brand to engaged audiences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                        <span>Recruit top talent directly from colleges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-sponsorgo-purple flex-shrink-0 mt-0.5" />
                        <span>Demonstrate social responsibility and impact</span>
                      </li>
                    </ul>
                    <Link to="/events">
                      <Button className="w-full mt-4 bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark">
                        Find Events to Sponsor
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Sponsorship Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore these curated events looking for sponsors like you. Connect with students and make a meaningful impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featureEvents.map((event) => (
              <Link to={`/events/${event.id}`} key={event.id}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    {event.featured && (
                      <Badge className="absolute top-2 right-2 bg-sponsorgo-purple">
                        Featured
                      </Badge>
                    )}
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
                    
                    <Button className="w-full mt-6 bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark">
                      View Event Details
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/events">
              <Button size="lg" className="bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Companies Choose SponsorGO</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join hundreds of companies that have discovered the benefits of connecting with college events through our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-sponsorgo-purple-light/50 flex items-center justify-center mb-4">
                    <span className="text-sponsorgo-purple font-bold text-xl">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Sponsors Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from companies that have successfully connected with college events through SponsorGO.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow border-0 h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <svg className="h-8 w-8 text-sponsorgo-purple opacity-50" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1.646 13.26 2.28 20.872c4.621-3.012 9.662-4.336 14.686-3.928c-.792-3.8-3.076-6.412-6.844-7.8c2.416-1.072 4.114-.44 6.014.704c-1.074-2.204-2.446-3.94-4.158-5.216C17.202 6.68 24.918 8.092 28 14.416c.68-4.156-1.21-8.382-4.732-10.952c-1.384-.802-2.89-1.258-4.466-1.36C16.098 1.566 13.068-.094 9.352 4zm1.578 24c4.86-3.456 7.674-9.266 7.042-16.872c-4.598 3-9.6 4.31-14.588 3.934c.768 3.802 3.072 6.416 6.862 7.798c-2.432 1.08-4.13.442-6.024-.704c1.076 2.206 2.448 3.94 4.174 5.214c-5.204 1.854-12.934.448-16-5.874c-.68 4.16 1.21 8.382 4.75 10.948c1.372.792 2.868 1.242 4.432 1.348c2.704.538 5.734 2.198 9.352-1.792z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">{testimonial.quote}</p>
                    <div className="flex items-center mt-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback className="bg-sponsorgo-purple text-white">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-sponsorgo-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Connect with College Events?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Start browsing events that align with your brand values and connect with the next generation of professionals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/events">
              <Button size="lg" className="bg-white text-sponsorgo-purple hover:bg-gray-100">
                Browse Events
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                Create an Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default SponsorPage;
