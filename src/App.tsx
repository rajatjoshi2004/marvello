
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import NewBusiness from "@/pages/NewBusiness";
import BusinessDetails from "@/pages/BusinessDetails";
import BusinessReview from "@/pages/BusinessReview";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import CancellationPolicy from "@/pages/CancellationPolicy";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import LoadingScreen from "@/components/shared/LoadingScreen";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/business/new" element={<NewBusiness />} />
            <Route path="/business/:id" element={<BusinessDetails />} />
            <Route path="/review/:id" element={<BusinessReview />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
