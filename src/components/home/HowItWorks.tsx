
import { Calendar, Search, CreditCard, Award } from "lucide-react";

const steps = [
  {
    title: "Find Events",
    description: "Browse through a variety of college events ranging from tech hackathons to cultural festivals, all looking for sponsors.",
    icon: <Search className="h-8 w-8 text-sponsorgo-purple" />,
  },
  {
    title: "Choose & Connect",
    description: "Select events that align with your brand and connect directly with event organizers to discuss sponsorship details.",
    icon: <Calendar className="h-8 w-8 text-sponsorgo-purple" />,
  },
  {
    title: "Secure Sponsorship",
    description: "Complete the sponsorship process with secure payment options and receive official documentation for your records.",
    icon: <CreditCard className="h-8 w-8 text-sponsorgo-purple" />,
  },
  {
    title: "Make an Impact",
    description: "Showcase your brand at college events and connect with talented students, creating lasting impressions and opportunities.",
    icon: <Award className="h-8 w-8 text-sponsorgo-purple" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How SponsorGO Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform makes it simple for sponsors to find and support college events, creating valuable connections between brands and students.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-sponsorgo-purple/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
