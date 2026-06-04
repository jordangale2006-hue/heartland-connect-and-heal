import { createContext, useContext } from "react";

export interface AppointmentDialogCtx {
  open: (source?: string) => void;
  close: () => void;
}

export const AppointmentDialogContext = createContext<AppointmentDialogCtx | null>(null);

export const useAppointmentDialog = () => {
  const ctx = useContext(AppointmentDialogContext);
  if (!ctx) throw new Error("useAppointmentDialog must be used within AppointmentDialogProvider");
  return ctx;
};
