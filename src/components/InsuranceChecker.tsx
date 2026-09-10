import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { INSURANCES_BY_STATE, type ServiceState } from "@/data/insurances";
import { useAppointmentDialog } from "./AppointmentDialogProvider";

const NOT_ACCEPTED = ["Arizona AHCCCS", "Arizona Medicaid"];

const InsuranceChecker = () => {
  const [selected, setSelected] = useState<string>("");
  const [state, setState] = useState<ServiceState>("Arizona");
  const { open } = useAppointmentDialog();

  const plans = INSURANCES_BY_STATE[state];
  const isAccepted = plans.includes(selected);
  const isMedicaid = state === "Arizona" && NOT_ACCEPTED.includes(selected);
  const isOther = selected && !isAccepted && !isMedicaid;

  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <p className="text-accent font-semibold text-sm uppercase tracking-wider">Insurance Checker</p>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground text-center mb-3">
            Do we take your insurance?
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Choose your state and plan to see the insurance options available for virtual care.
          </p>

          <div className="max-w-md mx-auto">
            <Select value={state} onValueChange={(value: ServiceState) => { setState(value); setSelected(""); }}>
              <SelectTrigger className="h-12 text-base mb-3" aria-label="Select the state where you will receive care">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arizona">Arizona</SelectItem>
                <SelectItem value="Iowa">Iowa</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selected} onValueChange={setSelected}>
              <SelectTrigger className="h-12 text-base" aria-label="Select your insurance">
                <SelectValue placeholder="Select your insurance" />
              </SelectTrigger>
              <SelectContent>
                {plans.map((n) => (
                  <SelectItem key={n} value={n}>{n}</SelectItem>
                ))}
                {state === "Arizona" && NOT_ACCEPTED.map((n) => (
                  <SelectItem key={n} value={n}>{n}</SelectItem>
                ))}
                <SelectItem value="Other">Other / Not listed</SelectItem>
              </SelectContent>
            </Select>

            {isAccepted && (
              <div className="mt-5 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium mb-1">
                    Yes — we accept {selected} for telehealth psychiatry in {state}.
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Coverage details vary by plan. We'll verify your specific benefits before your visit.
                  </p>
                  <Button variant="warmCta" size="sm" onClick={() => open("insurance-checker")}>
                    Request Appointment
                  </Button>
                </div>
              </div>
            )}

            {isMedicaid && (
              <div className="mt-5 p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium mb-1">
                    We do not accept Arizona AHCCCS / Medicaid plans.
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    We do offer affordable cash-pay options. Reach out and we'll walk you through pricing.
                  </p>
                  <Button variant="outlineWarm" size="sm" onClick={() => open("insurance-checker")}>
                    Ask About Cash Pay
                  </Button>
                </div>
              </div>
            )}

            {isOther && (
              <div className="mt-5 p-4 rounded-xl bg-muted border border-border flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium mb-1">
                    Not sure? We can check for you.
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Some plans may still be covered as out-of-network. Send us a quick request and
                    we'll verify your benefits at no cost.
                  </p>
                  <Button variant="warmCta" size="sm" onClick={() => open("insurance-checker")}>
                    Verify My Insurance
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceChecker;
