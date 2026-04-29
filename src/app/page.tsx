import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import Reservations from "@/components/Reservations";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Pricing />
      {/* <Reservations /> */}
      <Testimonials />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
