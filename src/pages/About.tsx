
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onGetStarted={handleGetStarted} />
      <main className="container mx-auto px-4 py-16 flex-1">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Marvello is a cutting-edge platform designed to help businesses enhance their customer engagement and feedback processes through automated marketing solutions.
          </p>
          <p className="text-lg mb-6">
            Our mission is to empower businesses of all sizes to build stronger relationships with their customers through seamless digital interactions and meaningful engagement opportunities.
          </p>
          <p className="text-lg">
            Founded with the vision of simplifying customer feedback management, Marvello has grown to become a trusted partner for businesses looking to improve their customer experience and drive growth through authentic customer relationships.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
