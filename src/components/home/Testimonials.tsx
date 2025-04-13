
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    quote: "SponsorGO made it incredibly simple to find college events that align with our brand values. We've sponsored three hackathons so far and the ROI has been fantastic.",
    name: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    avatar: "SJ",
    company: "TechCorp",
  },
  {
    quote: "As a student organizer, I was struggling to find sponsors for our business competition. SponsorGO connected us with perfect partners who believed in our vision.",
    name: "Michael Chang",
    role: "Event Organizer, Stanford Business Week",
    avatar: "MC",
    company: "Stanford",
  },
  {
    quote: "The platform streamlined our sponsorship process and helped us reach innovative companies we wouldn't have connected with otherwise. Our design expo was a huge success!",
    name: "Emma Rodriguez",
    role: "President, Design Students Association",
    avatar: "ER",
    company: "RISD",
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-sponsorgo-purple-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from sponsors and event organizers who have successfully connected through SponsorGO.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg border-0 relative h-full">
              <CardContent className="p-8">
                <QuoteIcon className="h-10 w-10 text-sponsorgo-purple opacity-20 absolute top-6 right-6" />
                <p className="text-gray-700 mb-6 relative z-10">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback className="bg-sponsorgo-purple text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
