import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function EmptyStateCard() {
  const navigate = useNavigate();

  return (
    <Card className="flex items-center justify-center min-h-[200px] hover:shadow-lg transition-shadow">
      <Button variant="ghost" onClick={() => navigate("/business/new")}>
        + Add New Business
      </Button>
    </Card>
  );
}