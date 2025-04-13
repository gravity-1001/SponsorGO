
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="bg-sponsorgo-purple text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Make Impactful Connections?</h2>
            <p className="text-lg text-white/80 mb-8">
              Whether you're a brand looking to sponsor college events or an event organizer seeking sponsorships, SponsorGO has you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/sponsor">
                <Button size="lg" className="bg-white text-sponsorgo-purple hover:bg-gray-100 flex items-center gap-2">
                  Sponsor an Event <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/create-event">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 flex items-center gap-2">
                  List Your Event <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=90" 
              alt="College student working on laptop" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
