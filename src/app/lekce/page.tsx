import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnlineVideos from "@/components/OnlineVideos";

export default function LecePage() {
  return (
    <>
      <Header />
      <div className="pt-20">
        <OnlineVideos />
      </div>
      <Footer />
    </>
  );
}
