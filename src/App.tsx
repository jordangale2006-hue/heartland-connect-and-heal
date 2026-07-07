import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ExitIntentDialog from "@/components/ExitIntentDialog";
import AddToHomeScreen from "@/components/AddToHomeScreen";
import { AppointmentDialogProvider } from "@/components/AppointmentDialogProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import BookAppointment from "./pages/BookAppointment";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Unsubscribe from "./pages/Unsubscribe";
import Conditions from "./pages/Conditions";
import ConditionPage from "./pages/ConditionPage";
import Crisis from "./pages/Crisis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppointmentDialogProvider>
          <Header />
          <div className="pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/book" element={<BookAppointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/conditions" element={<Conditions />} />
              <Route path="/conditions/:slug" element={<ConditionPage />} />
              <Route path="/crisis" element={<Crisis />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          <StickyMobileCTA />
          <ExitIntentDialog />
          <AddToHomeScreen />
        </AppointmentDialogProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
