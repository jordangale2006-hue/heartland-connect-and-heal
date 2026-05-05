import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      setMessage("No unsubscribe token was provided.");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );
        const data = await res.json();
        if (res.ok && data.valid) setState("valid");
        else if (data.reason === "already_unsubscribed") setState("already");
        else {
          setState("invalid");
          setMessage(data.error || "This unsubscribe link is invalid or has expired.");
        }
      } catch {
        setState("error");
        setMessage("Could not reach the unsubscribe service. Please try again.");
      }
    })();
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success || data?.reason === "already_unsubscribed") setState("done");
      else {
        setState("error");
        setMessage(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="max-w-md w-full bg-card border border-border/50 rounded-2xl p-8 text-center">
        {state === "loading" && (
          <>
            <Loader2 className="h-8 w-8 mx-auto text-muted-foreground animate-spin mb-4" />
            <p className="text-muted-foreground">Checking your unsubscribe link…</p>
          </>
        )}
        {state === "valid" && (
          <>
            <h1 className="font-heading text-2xl font-semibold text-foreground mb-3">
              Unsubscribe from emails
            </h1>
            <p className="text-muted-foreground mb-6 text-sm">
              Click below to stop receiving emails from Heartland Mental Health Services.
            </p>
            <Button onClick={handleConfirm} variant="warmCta" size="lg" className="w-full">
              Confirm Unsubscribe
            </Button>
          </>
        )}
        {state === "submitting" && (
          <>
            <Loader2 className="h-8 w-8 mx-auto text-muted-foreground animate-spin mb-4" />
            <p className="text-muted-foreground">Processing your request…</p>
          </>
        )}
        {state === "done" && (
          <>
            <CheckCircle2 className="h-10 w-10 mx-auto text-primary mb-4" />
            <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
              You've been unsubscribed
            </h1>
            <p className="text-muted-foreground text-sm">
              You will no longer receive emails from us. We're sorry to see you go.
            </p>
          </>
        )}
        {state === "already" && (
          <>
            <CheckCircle2 className="h-10 w-10 mx-auto text-primary mb-4" />
            <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
              Already unsubscribed
            </h1>
            <p className="text-muted-foreground text-sm">
              This email address has already been unsubscribed.
            </p>
          </>
        )}
        {(state === "invalid" || state === "error") && (
          <>
            <AlertCircle className="h-10 w-10 mx-auto text-destructive mb-4" />
            <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
              Something went wrong
            </h1>
            <p className="text-muted-foreground text-sm">{message}</p>
          </>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
