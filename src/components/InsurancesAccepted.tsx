import { ShieldCheck, AlertCircle } from "lucide-react";
import { FEATURED_INSURANCES } from "@/data/insurances";

interface Props {
  variant?: "section" | "card";
}

const InsurancesAccepted = ({ variant = "section" }: Props) => {
  const Inner = (
    <>
      <div className="flex items-center justify-center gap-2 mb-3">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <p className="text-accent font-semibold text-sm uppercase tracking-wider">In-Network Insurance</p>
      </div>
      <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground text-center mb-3">
        Insurances we accept
      </h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
        Quality mental health care should be accessible. Below are the insurance plans currently in-network with Heartland.
      </p>

      {/* Featured insurances */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-6">
        {FEATURED_INSURANCES.map((name) => (
          <div
            key={name}
            className="bg-background rounded-xl border border-border/50 px-4 py-4 text-center text-sm font-medium text-foreground shadow-sm"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto mt-6 flex items-start gap-2 p-4 rounded-xl bg-accent/10 border border-accent/20">
        <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          We do <strong>not</strong> accept Arizona AHCCCS/Medicaid plans. Plan availability may vary by state and product. Please verify with your insurance provider that you are in-network with this provider before booking.
        </p>
      </div>
    </>
  );

  if (variant === "card") {
    return <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8">{Inner}</div>;
  }

  return (
    <section className="section-padding bg-card">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">{Inner}</div>
    </section>
  );
};

export default InsurancesAccepted;
