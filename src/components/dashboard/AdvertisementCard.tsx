
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
  
  const autoplayOptions = {
    delay: 4000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };
  
  const [emblaRef] = useEmblaCarousel(
    { loop: true, skipSnaps: false },
    [Autoplay(autoplayOptions)]
  );

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const { data, error } = await supabase
          .from("advertisements")
          .select("*")
          .eq("active", true);

        if (error) {
          console.error("Error fetching advertisements:", error);
          return;
        }

        setAds(data || []);
      } catch (error) {
        console.error("Error in fetchAds:", error);
      }
    };

    fetchAds();
  }, []);

  if (ads.length === 0) return null;

  if (ads.length === 1) {
    const ad = ads[0];
    return (
      <Card className="hover:shadow-lg transition-all duration-300 h-[200px] relative overflow-hidden rounded-lg">
        {ad.link_url ? (
          <a 
            href={ad.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full relative"
          >
            <img
              src={ad.image_url}
              alt="Advertisement"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Ad
            </span>
          </a>
        ) : (
          <div className="w-full h-full relative">
            <img
              src={ad.image_url}
              alt="Advertisement"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Ad
            </span>
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 h-[200px] relative rounded-lg overflow-hidden">
      <Carousel
        ref={emblaRef}
        className="w-full h-full"
      >
        <CarouselContent>
          {ads.map((ad) => (
            <CarouselItem key={ad.id} className="min-w-0 h-full">
              {ad.link_url ? (
                <a
                  href={ad.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative"
                >
                  <img
                    src={ad.image_url}
                    alt="Advertisement"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Ad
                  </span>
                </a>
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={ad.image_url}
                    alt="Advertisement"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Ad
                  </span>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Card>
  );
}
