import AboutSection from "@/components/AboutSection";
import FleetSection from "@/components/FleetSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { ServiceLocations } from "@/components/ServiceLocations";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="">
      <Navbar/>
      <Hero/>
      <WhyChooseUs/>
      <FleetSection/>
      <ServicesSection/>
      <AboutSection/>
      <Testimonials/>
      <ServiceLocations/>
      <WhatsAppButton/>
      <Footer/>
    </main>
  );
}
