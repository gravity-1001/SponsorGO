
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import Chatbot from "@/components/shared/Chatbot";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "SponsorGO | Connect College Events with Sponsors";
  }, []);
  
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedEvents />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Chatbot />
    </MainLayout>
  );
};

export default Index;
