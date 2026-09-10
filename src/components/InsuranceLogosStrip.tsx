import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import InsuranceLogoGrid from "./InsuranceLogoGrid";
import { INSURANCES_BY_STATE } from "@/data/insurances";

const InsuranceLogosStrip = () => {
  return (
    <section className="bg-card border-y border-border/50">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <ShieldCheck className="h-4 w-4 text-primary" />
            In-Network Insurance
          </div>
          <InsuranceLogoGrid
            size="lg"
            plans={INSURANCES_BY_STATE.Arizona}
            exclude={["Cashpay"]}
            columns="showcase"
            className="w-full max-w-6xl"
          />
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
