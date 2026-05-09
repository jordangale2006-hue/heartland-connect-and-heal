import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FEATURED_INSURANCES } from "@/data/insurances";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(40)
    .regex(/^[+\d().\-\s]+$/, "Please enter a valid phone"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  insurance: z.string().trim().min(1, "Please choose an option").max(80),
  reason: z.string().trim().max(500).optional(),
  preferredTime: z.string().trim().max(120).optional(),
});

type FormState = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
  compact?: boolean;
}

const QuickAppointmentForm = ({ onSuccess, compact = false }: Props) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [values, setValues] = useState<FormState>({
    name: "", phone: "", email: "", insurance: "", reason: "", preferredTime: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const update = (k: keyof FormState, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fe: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-appointment-request", {
        body: parsed.data,
      });
      if (error) throw error;
      setDone(true);
      toast({ title: "Request received", description: "We'll be in touch within one business day." });
      onSuccess?.();
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again, or call us at (520) 595-5709.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <ShieldCheck className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Thank you</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Your request was received. A team member will reach out within one business day to confirm
          your insurance and schedule your visit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {!compact && (
        <p className="text-sm text-muted-foreground">
          Tell us a little about you and we'll call you back to verify insurance and book a time —
          usually within one business day.
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="qa-name">Full name</Label>
          <Input id="qa-name" autoComplete="name" value={values.name}
            onChange={(e) => update("name", e.target.value)} className="h-12" />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="qa-phone">Phone</Label>
          <Input id="qa-phone" type="tel" autoComplete="tel" inputMode="tel"
            value={values.phone} onChange={(e) => update("phone", e.target.value)} className="h-12" />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="qa-email">Email</Label>
        <Input id="qa-email" type="email" autoComplete="email" inputMode="email"
          value={values.email} onChange={(e) => update("email", e.target.value)} className="h-12" />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="qa-insurance">Insurance</Label>
          <Select value={values.insurance} onValueChange={(v) => update("insurance", v)}>
            <SelectTrigger id="qa-insurance" className="h-12">
              <SelectValue placeholder="Select your insurance" />
            </SelectTrigger>
            <SelectContent>
              {FEATURED_INSURANCES.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
              <SelectItem value="Other / Not listed">Other / Not listed</SelectItem>
            </SelectContent>
          </Select>
          {errors.insurance && <p className="text-xs text-destructive">{errors.insurance}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="qa-time">Best time to reach you <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <Input id="qa-time" placeholder="e.g. Weekday mornings"
            value={values.preferredTime} onChange={(e) => update("preferredTime", e.target.value)} className="h-12" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="qa-reason">What brings you in? <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Textarea id="qa-reason" rows={3} maxLength={500}
          placeholder="A few words is plenty — e.g. anxiety, ADHD evaluation, medication management."
          value={values.reason} onChange={(e) => update("reason", e.target.value)} />
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        For your privacy, please <strong>do not</strong> include sensitive health information here.
        This form is for scheduling only — full intake happens securely after we connect.
      </p>

      <Button type="submit" variant="warmCta" size="lg" className="w-full h-12 text-base" disabled={submitting}>
        {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending…</> : "Request Appointment"}
      </Button>
    </form>
  );
};

export default QuickAppointmentForm;
