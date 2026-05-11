import { Link } from "react-router-dom";
import { FEATURED_INSURANCES } from "@/data/insurances";
import { ShieldCheck } from "lucide-react";

const InsuranceLogosStrip = () => {
  return (
    <section className="bg-card border-y border-border/50">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <ShieldCheck className="h-4 w-4 text-primary" />
            In-Network Insurance
          </div>
          <ul className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            {FEATURED_INSURANCES.filter((n) => n !== "Cashpay").map((name) => (
              <li
                key={name}
                className="px-3 py-1.5 rounded-md bg-background border border-border/60 text-xs sm:text-sm font-medium text-foreground"
              >
                {name}
              </li>
            ))}
          </ul>
          <Link
            to="/book"
            className="text-sm text-primary font-medium hover:underline"
          >
            Verify my insurance →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsuranceLogosStrip;
