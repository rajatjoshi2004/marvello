
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onGetStarted={handleGetStarted} />
      <main className="container mx-auto px-4 py-16 flex-1">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="max-w-2xl">
          <p className="text-lg mb-8 text-muted-foreground">
            Have questions or need assistance? Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <Input id="name" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <Textarea id="message" placeholder="How can we help?" required className="min-h-[150px]" />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
