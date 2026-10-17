import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAppointmentDialog } from "./AppointmentDialogProvider";

const STORAGE_KEY = "heartland-exit-intent-shown";
const SUBMITTED_KEY = "heartland-form-submitted";

// Never interrupt crisis, booking, contact, application, or legal pages
const BLOCKED_PATHS = ["/crisis", "/book", "/contact", "/careers", "/privacy", "/hipaa-notice", "/unsubscribe"];

const storage = {
  get(key: string): string | null {
    try { return sessionStorage.getItem(key); } catch { return null; }
  },
  set(key: string, value: string) {
    try { sessionStorage.setItem(key, value); } catch { /* ignore */ }
  },
};

const ExitIntentDialog = () => {
  const [open, setOpen] = useState(false);
  const triggered = useRef(false);
  const formTouched = useRef(false);
  const { open: openAppointment, isOpen: appointmentOpen } = useAppointmentDialog();
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (BLOCKED_PATHS.some((p) => pathname.startsWith(p))) return;
    if (storage.get(STORAGE_KEY)) return;
    if (storage.get(SUBMITTED_KEY)) return;

    const canShow = () =>
      !triggered.current &&
      !formTouched.current &&
      !appointmentOpen &&
      !storage.get(SUBMITTED_KEY);

    const trigger = () => {
      if (!canShow()) return;
      triggered.current = true;
      storage.set(STORAGE_KEY, "1");
      setOpen(true);
    };

    // If the visitor has focused or typed in any form field, never interrupt them
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) {
        formTouched.current = true;
      }
    };
    document.addEventListener("focusin", onFocusIn);

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    let timeoutId: number | undefined;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    const onScroll = () => {
      const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrolled >= 0.6) trigger();
    };

    if (isMobile) {
      window.addEventListener("scroll", onScroll, { passive: true });
      // Also trigger after 45s on a page if they haven't scrolled enough
      timeoutId = window.setTimeout(trigger, 45000);
    } else {
      document.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [pathname, appointmentOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-3">
            <Heart className="h-6 w-6 text-accent" />
          </div>
          <DialogTitle className="font-heading text-2xl">Not ready to book?</DialogTitle>
          <DialogDescription className="text-base">
            We can verify your insurance and call you back at a time that works for you — no pressure,
            no commitment.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-2">
          <Button
            variant="warmCta"
            size="lg"
            onClick={() => { setOpen(false); openAppointment(); }}
          >
            Request a Callback
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>No thanks</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentDialog;
