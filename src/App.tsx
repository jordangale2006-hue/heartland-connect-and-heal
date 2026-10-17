import { lazy, Suspense } from "react";
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
import AnnouncementBar from "@/components/AnnouncementBar";
import { AppointmentDialogProvider } from "@/components/AppointmentDialogProvider";
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const BookAppointment = lazy(() => import("./pages/BookAppointment"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const Conditions = lazy(() => import("./pages/Conditions"));
const ConditionPage = lazy(() => import("./pages/ConditionPage"));
const Crisis = lazy(() => import("./pages/Crisis"));
const Privacy = lazy(() => import("./pages/Privacy"));
const HipaaNotice = lazy(() => import("./pages/HipaaNotice"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal fallback: keeps the page area from collapsing while a route loads
const RouteFallback = () => <div className="min-h-[60vh]" aria-hidden="true" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppointmentDialogProvider>
          <AnnouncementBar />
          <Header />
          <div className="pb-20 md:pb-0">
            <Suspense fallback={<RouteFallback />}>
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
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/hipaa-notice" element={<HipaaNotice />} />
                <Route path="/unsubscribe" element={<Unsubscribe />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
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
