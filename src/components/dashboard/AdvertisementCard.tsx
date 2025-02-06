
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Advertisement {
  id: string;
  image_url: string;
  link_url: string | null;
}

export default function AdvertisementCard() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  
  // Initialize carousel with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("advertisements")
        .select("*")
        .eq("active", true);

      if (error) {
        console.error("Error fetching advertisements:", error);
        return;
      }

      setAds(data || []);
    };

    fetchAds();
  }, []);

  if (ads.length === 0) return null;

  if (ads.length === 1) {
    const ad = ads[0];
    return (
      <Card className="hover:shadow-lg transition-all duration-300 min-h-[200px] relative overflow-hidden rounded-lg">
        {ad.link_url ? (
          <a 
            href={ad.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img
              src={ad.image_url}
              alt="Advertisement"
              className="w-full h-full object-cover rounded-lg"
            />
          </a>
        ) : (
          <img
            src={ad.image_url}
            alt="Advertisement"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 min-h-[200px] relative rounded-lg">
      <Carousel
        ref={emblaRef}
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent>
          {ads.map((ad) => (
            <CarouselItem key={ad.id}>
              {ad.link_url ? (
                <a
                  href={ad.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img
                    src={ad.image_url}
                    alt="Advertisement"
                    className="w-full h-[200px] object-cover rounded-lg"
                  />
                </a>
              ) : (
                <img
                  src={ad.image_url}
                  alt="Advertisement"
                  className="w-full h-[200px] object-cover rounded-lg"
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Card>
  );
}
