import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import QuickAppointmentForm from "./QuickAppointmentForm";

interface Ctx {
  open: (source?: string) => void;
  close: () => void;
}

const AppointmentDialogContext = createContext<Ctx | null>(null);

export const useAppointmentDialog = () => {
  const ctx = useContext(AppointmentDialogContext);
  if (!ctx) throw new Error("useAppointmentDialog must be used within AppointmentDialogProvider");
  return ctx;
};

export const AppointmentDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Allow non-React triggers (e.g. ExitIntentDialog) via custom event
  useEffect(() => {
    const h = () => setIsOpen(true);
    window.addEventListener("open-appointment-dialog", h);
    return () => window.removeEventListener("open-appointment-dialog", h);
  }, []);

  return (
    <AppointmentDialogContext.Provider value={{ open, close }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Request an Appointment</DialogTitle>
            <DialogDescription>
              We'll reach out within one business day to verify your insurance and confirm a time.
            </DialogDescription>
          </DialogHeader>
          <QuickAppointmentForm onSuccess={() => setTimeout(close, 2500)} compact />
        </DialogContent>
      </Dialog>
    </AppointmentDialogContext.Provider>
  );
};
