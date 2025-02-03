import { Button } from "@/components/ui/button";
import BaseHeader from "@/components/shared/BaseHeader";

interface HeaderProps {
  onGetStarted: () => void;
}

export default function Header({ onGetStarted }: HeaderProps) {
  return (
    <BaseHeader
      rightContent={
        <Button 
          className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          onClick={onGetStarted}
        >
          Get Started
        </Button>
      }
    />
  );
}