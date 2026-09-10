import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const STORAGE_KEY = "heartland-iowa-announcement-dismissed";

const AnnouncementBar = () => {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      setDismissed(false);
    }
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage errors
    }
  };

  if (dismissed) return null;

  return (
    <div
      role="banner"
      className="bg-accent text-accent-foreground px-4 py-2.5 text-center text-sm relative"
    >
      <div className="container-narrow mx-auto flex items-center justify-center gap-3">
        <p className="leading-snug">
          <span className="font-semibold">New:</span>{" "}
          Now accepting Iowa patients — Wellmark BCBS HMO & self-pay.{" "}
          <Link
            to="/book"
            className="font-semibold underline underline-offset-2 hover:text-white/90"
          >
            Book now
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
