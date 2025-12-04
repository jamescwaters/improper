import Hero from "./components/Hero";
import WaveDivider from "./components/WaveDivider";
import MapSection from "./components/MapSection";
import WhyImproper from "./components/WhyImproper";
import Improper500 from "./components/Improper500";
import BeerCarousel from "./components/BeerCarousel";
import Countdown from "./components/Countdown";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WaveDivider />
      <MapSection />
      <WaveDivider />
      <WhyImproper />
      <WaveDivider />
      <Improper500 />
      <WaveDivider />
      <BeerCarousel />
      <WaveDivider />
      <Countdown />
      <Footer />
    </main>
  );
}
