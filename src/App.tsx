import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import NewBusiness from "@/pages/NewBusiness";
import BusinessDetails from "@/pages/BusinessDetails";
import BusinessReview from "@/pages/BusinessReview";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/business/new" element={<NewBusiness />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
        <Route path="/review/:id" element={<BusinessReview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;