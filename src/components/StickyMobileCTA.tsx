import { Phone, CalendarPlus } from "lucide-react";
import { useAppointmentDialog } from "./AppointmentDialogProvider";

const StickyMobileCTA = () => {
  const { open } = useAppointmentDialog();
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 p-2">
        <a
          href="tel:+15205955709"
          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border bg-background text-foreground font-medium text-sm py-3 active:scale-[0.98] transition"
          aria-label="Call Heartland Mental Health"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <button
          onClick={() => open("sticky")}
          className="flex-[2] flex items-center justify-center gap-2 rounded-lg bg-accent text-accent-foreground font-semibold text-sm py-3 shadow-sm active:scale-[0.98] transition"
        >
          <CalendarPlus className="h-4 w-4" /> Request Appointment
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
