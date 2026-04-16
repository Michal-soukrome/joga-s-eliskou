import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
