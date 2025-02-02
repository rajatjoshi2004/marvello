import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BaseHeader from "@/components/shared/BaseHeader";

export default function Header() {
  return (
    <BaseHeader
      rightContent={
        <Link to="/auth">
          <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
            Get Started
          </Button>
        </Link>
      }
    />
  );
}