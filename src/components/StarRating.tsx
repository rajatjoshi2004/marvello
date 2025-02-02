import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StarRatingProps {
  onRate: (rating: number) => void;
}

export const StarRating = ({ onRate }: StarRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    onRate(rating);
  };

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="focus:outline-none"
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(null)}
          onClick={() => handleStarClick(star)}
        >
          <Star
            className={cn(
              "w-12 h-12 transition-colors duration-200",
              (hoveredStar !== null ? star <= hoveredStar : star <= (selectedRating || 0))
                ? "fill-yellow-400 stroke-yellow-400"
                : "stroke-gray-300"
            )}
          />
        </motion.button>
      ))}
    </div>
  );
};