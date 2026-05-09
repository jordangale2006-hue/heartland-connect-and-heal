import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAppointmentDialog } from "./AppointmentDialogProvider";

const STORAGE_KEY = "heartland-exit-intent-shown";

const ExitIntentDialog = () => {
  const [open, setOpen] = useState(false);
  const triggered = useRef(false);
  const { open: openAppointment } = useAppointmentDialog();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const trigger = () => {
      if (triggered.current) return;
      triggered.current = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

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
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

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
