import { AlertCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CrisisBanner = () => {
  return (
    <div className="bg-accent/10 border-y border-accent/20">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
        <AlertCircle className="h-4 w-4 text-accent shrink-0" />
        <span className="text-foreground">
          <strong>If you're in crisis,</strong> call or text{" "}
          <a href="tel:988" className="text-primary font-semibold hover:underline">
            <Phone className="h-3.5 w-3.5 inline -mt-0.5 mr-0.5" />988
          </a>{" "}
          for immediate support.
        </span>
        <Link to="/crisis" className="text-primary font-medium hover:underline">
          More resources →
        </Link>
      </div>
    </div>
  );
};

export default CrisisBanner;
