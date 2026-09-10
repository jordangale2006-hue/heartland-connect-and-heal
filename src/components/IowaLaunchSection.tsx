import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, ShieldCheck, Clock } from "lucide-react";

const IowaLaunchSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Statewide Expansion
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-8">
            Heartland is now licensed in Iowa
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Heartland Mental Health Services is now licensed to treat patients in
                Iowa. Anywhere in the state — Des Moines, Cedar Rapids, Davenport, or a
                town with no psychiatrist for fifty miles — you can see a licensed
                psychiatric provider from home. No drive, no months-long waitlist.
              </p>
              <p>
                <strong className="text-foreground">Insurance:</strong> Wellmark Blue
                Cross Blue Shield of Iowa (HMO).
              </p>
              <p>
                <strong className="text-foreground">Also available:</strong> Self-pay,
                with a superbill provided for out-of-network reimbursement.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">Hours</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Monday – Friday: 8am – 5pm Arizona</li>
                  <li className="pl-0 md:pl-4">Iowa: 10am – 7pm Central (current equivalent)</li>
                  <li>Saturday: 9am – 2pm Arizona</li>
                  <li className="pl-0 md:pl-4">Iowa: 11am – 4pm Central (current equivalent)</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Wellmark HMO plans may require a referral from your primary care
                    provider for behavioral health visits. Not sure about yours? Call us
                    and we'll check before your first appointment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button variant="warmCta" size="lg" asChild>
              <Link to="/book" className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Book an Iowa appointment →
              </Link>
            </Button>
            <Button variant="outlineWarm" size="lg" asChild>
              <Link to="/contact">Ask about insurance</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IowaLaunchSection;
