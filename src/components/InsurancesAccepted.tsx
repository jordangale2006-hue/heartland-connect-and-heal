import { useMemo, useState } from "react";
import { ShieldCheck, AlertCircle, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FEATURED_INSURANCES, ALL_INSURANCES } from "@/data/insurances";

interface Props {
  variant?: "section" | "card";
}

const InsurancesAccepted = ({ variant = "section" }: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_INSURANCES;
    return ALL_INSURANCES.filter((n) => n.toLowerCase().includes(q));
  }, [query]);

  const Inner = (
    <>
      <div className="flex items-center justify-center gap-2 mb-3">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <p className="text-accent font-semibold text-sm uppercase tracking-wider">In-Network Insurance</p>
      </div>
      <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground text-center mb-3">
        We accept 200+ insurance plans
      </h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
        Quality mental health care should be accessible. Search below to see if your insurance is in-network with Heartland.
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

      {/* Toggle */}
      <div className="flex justify-center mb-4">
        <Button
          variant="outlineWarm"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="all-insurances-panel"
          className="inline-flex items-center gap-2"
        >
          {open ? (
            <>Hide full list <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>View all 200+ in-network plans <ChevronDown className="h-4 w-4" /></>
          )}
        </Button>
      </div>

      {/* Expandable list */}
      {open && (
        <div
          id="all-insurances-panel"
          className="max-w-3xl mx-auto bg-background rounded-2xl border border-border/50 shadow-sm overflow-hidden animate-fade-in-up"
        >
          <div className="p-4 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your insurance plan…"
                className="pl-9"
                aria-label="Search insurance plans"
              />
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto p-4">
            {filtered.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-6">
                We couldn't find that plan. <a href="/contact" className="text-primary hover:text-accent underline">Contact us</a> to verify coverage.
              </p>
            ) : (
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {filtered.map((name) => (
                  <li key={name} className="text-sm text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="px-4 py-3 border-t border-border/50 text-xs text-muted-foreground text-center">
            Showing {filtered.length} of {ALL_INSURANCES.length} plans
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto mt-6 flex items-start gap-2 p-4 rounded-xl bg-accent/10 border border-accent/20">
        <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          We do <strong>not</strong> accept Arizona AHCCCS plans. Plan availability may vary by state and product. Please verify with your insurance provider that you are in-network with this provider before booking.
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
