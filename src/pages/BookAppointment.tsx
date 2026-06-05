
import { Phone, Mail, ExternalLink, ShieldCheck, AlertCircle, CalendarClock } from "lucide-react";
import comfortImage from "@/assets/comfort-hands.jpg";
import SEO from "@/components/SEO";
import QuickAppointmentForm from "@/components/QuickAppointmentForm";
import InsuranceLogoGrid from "@/components/InsuranceLogoGrid";

const SCHEDULING_URL = "https://www.optimantra.com/optimus/patient/patientaccess/servicesall?pid=QlFYZ050NjhIYUdXVlFiMTdyMEJGQT09&lid=ek9EZkY4WjFZOVhZTWtNa25OcHFTQT09";



const BookAppointment = () => {
  return (
    <main>
      <SEO
        title="Book a Virtual Appointment | Heartland Mental Health AZ"
        description="Schedule a secure telehealth psychiatry visit in Arizona. Most insurance accepted including Aetna, BCBS, Cigna, Medicare, Tricare and UnitedHealthcare."
        path="/book"
      />
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={comfortImage} alt="Warm comforting scene" width={800} height={800} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">Book Your Appointment</h1>
          <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto">
            Two easy ways to get started — request a callback, or self-schedule below.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left column: quick form + scheduling embed */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick request form */}
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  <h2 className="font-heading text-2xl font-semibold text-foreground">Request an Appointment</h2>
                </div>
                <QuickAppointmentForm />
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">or self-schedule below</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                  <iframe
                    src={SCHEDULING_URL}
                    title="Schedule an Appointment"
                    className="w-full border-0"
                    style={{ minHeight: "700px" }}
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Having trouble with the scheduler?{" "}
                  <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent underline inline-flex items-center gap-1">
                    Open in a new window <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Prefer to Call?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We're happy to help you schedule over the phone. Don't hesitate to reach out.
                </p>
                <div className="space-y-3">
                  <a href="tel:+15205955709" className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
                    <Phone className="h-4 w-4" /> +1 (520) 595-5709
                  </a>
                  <a href="mailto:heartlandmentalhealthservices@gmail.com" className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
                    <Mail className="h-4 w-4" /> heartlandmentalhealthservices@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">What to Expect</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">1</span>
                    Select your service and preferred time
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">2</span>
                    Complete the online booking form
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">3</span>
                    Receive confirmation and intake forms via email
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">4</span>
                    Attend your session via secure telehealth
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">Insurances Accepted</h3>
                </div>
                <div className="mb-4">
                  <InsuranceLogoGrid size="lg" />
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <AlertCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We do <strong>not</strong> accept Arizona AHCCCS/Medicaid plans. Please verify with your insurance provider that you are in-network before booking.
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Don't see your plan? We may still be able to help — <a href="/contact" className="text-primary hover:text-accent underline">contact us</a> to ask about out-of-network options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookAppointment;
