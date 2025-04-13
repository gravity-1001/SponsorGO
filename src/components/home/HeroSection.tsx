
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, IndianRupee } from 'lucide-react';
import { formatIndianCurrency } from '@/lib/utils';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold text-sponsorgo-gray-dark tracking-tight mb-6">
              Connect College Events with Perfect Sponsors
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              SponsorGO bridges the gap between college event organizers and sponsors, making collaboration seamless and successful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/sponsor">
                <Button size="lg" className="bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark flex items-center gap-2">
                  Be a Sponsor <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/create-event">
                <Button size="lg" variant="outline" className="border-sponsorgo-purple text-sponsorgo-purple hover:bg-sponsorgo-purple hover:text-white flex items-center gap-2">
                  Get a Sponsor <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-sponsorgo-purple-light/50 to-transparent rounded-full"></div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=600&auto=format&fit=crop&q=90" 
                alt="College Hackathon Event" 
                className="rounded-lg mb-6 w-full"
              />
              <div className="flex justify-between items-end">
                <div>
                  <span className="inline-block bg-sponsorgo-purple/10 text-sponsorgo-purple px-3 py-1 rounded-full text-sm font-medium mb-2">
                    Hackathon
                  </span>
                  <h3 className="text-xl font-bold">TechFest 2025</h3>
                  <p className="text-gray-500">Stanford University</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-bold text-sponsorgo-purple flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    5,00,000
                  </p>
                  <p className="text-sm text-gray-500">Sponsored</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sponsorgo-purple text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left font-medium">
            Looking for the perfect event to sponsor? Browse our curated collection.
          </p>
          <Link to="/events">
            <Button variant="secondary" className="bg-white text-sponsorgo-purple hover:bg-gray-100 whitespace-nowrap">
              Explore Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
