
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Business } from "@/types/business";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BusinessCard from "@/components/dashboard/BusinessCard";
import EmptyStateCard from "@/components/dashboard/EmptyStateCard";
import AdvertisementCard from "@/components/dashboard/AdvertisementCard";
import Footer from "@/components/shared/Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
    return session;
  };

  const fetchBusinesses = async () => {
    try {
      const session = await checkUser();
      if (!session) return;

      const { data: businessesData, error: businessesError } = await supabase
        .from("businesses")
        .select(`
          *,
          reviews (*)
        `)
        .eq('owner_id', session.user.id);

      if (businessesError) throw businessesError;
      setBusinesses(businessesData || []);
    } catch (error: any) {
      console.error("Error fetching businesses:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader onSignOut={handleSignOut} />

      {/* Main Content */}
      <main className="flex-1 container px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AdvertisementCard />
          {businesses.map((business, index) => (
            <BusinessCard 
              key={business.id} 
              business={business} 
              businessCount={index + 1}
            />
          ))}
          <EmptyStateCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
