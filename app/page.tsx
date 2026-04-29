import EmergencyTicker from "@/components/EmergencyTicker";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <EmergencyTicker />
      <Header />
      <HeroSection />
      <ServicesSection />
      <BeforeAfterGallery />
      <QuoteForm />
      <Footer />
    </main>
  );
}
