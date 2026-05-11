import { DollarSign, Info } from "lucide-react";
import { Link } from "react-router-dom";

const CostEstimate = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Transparent Pricing</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-3">
            What will it cost?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe in clear answers up front. Here's what most patients pay.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="bg-background rounded-2xl border border-border/50 p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-1">With insurance</p>
            <p className="font-heading text-3xl font-semibold text-foreground mb-1">$0 – $40</p>
            <p className="text-sm text-muted-foreground">per visit (typical copay range)</p>
          </div>

          <div className="bg-background rounded-2xl border border-border/50 p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
            <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-1">Self-pay</p>
            <p className="font-heading text-3xl font-semibold text-foreground mb-1">$250 / $150</p>
            <p className="text-sm text-muted-foreground">initial eval / follow-up</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-6 flex items-start gap-2 p-4 rounded-xl bg-accent/10 border border-accent/20">
          <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Final cost depends on your specific plan, deductible, and visit type. We verify your benefits before your first visit so there are no surprises. <Link to="/book" className="text-primary font-medium hover:underline">Request a verification</Link>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CostEstimate;
