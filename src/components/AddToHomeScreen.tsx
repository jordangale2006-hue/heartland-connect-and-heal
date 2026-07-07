import { useEffect, useState } from "react";
import { X, Share, Plus, Smartphone } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "hmh-a2hs-dismissed-v1";

const AddToHomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "other">("other");
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    const ua = window.navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const isMobile = isIOS || isAndroid;
    if (!isMobile) return;

    // Already installed / running as PWA
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error legacy iOS Safari
      window.navigator.standalone === true;
    if (standalone) return;

    setPlatform(isIOS ? "ios" : "android");

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const t = window.setTimeout(() => setVisible(true), 4000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.clearTimeout(t);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  const install = async () => {
    if (!deferred) {
      setExpanded(true);
      return;
    }
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") dismiss();
    setDeferred(null);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-2 bottom-24 md:hidden z-40">
      <div className="mx-auto max-w-sm rounded-2xl bg-card border border-border/60 shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Smartphone className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-semibold text-foreground text-sm">
              Add Heartland to your Home Screen
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Open it like an app — one tap, no browser.
            </p>
          </div>
          <button
            aria-label="Dismiss"
            onClick={dismiss}
            className="text-muted-foreground hover:text-foreground p-1 -m-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {expanded && platform === "ios" && (
          <ol className="mt-3 space-y-1.5 text-xs text-muted-foreground pl-1">
            <li className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">1.</span> Tap
              <Share className="h-3.5 w-3.5 inline text-primary" /> Share in Safari
            </li>
            <li className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">2.</span> Choose
              <Plus className="h-3.5 w-3.5 inline text-primary" /> "Add to Home Screen"
            </li>
            <li>
              <span className="font-semibold text-foreground">3.</span> Tap "Add" — done!
            </li>
          </ol>
        )}

        {expanded && platform === "android" && !deferred && (
          <ol className="mt-3 space-y-1.5 text-xs text-muted-foreground pl-1">
            <li>
              <span className="font-semibold text-foreground">1.</span> Tap the browser menu (⋮)
            </li>
            <li>
              <span className="font-semibold text-foreground">2.</span> Choose "Add to Home screen"
              or "Install app"
            </li>
            <li>
              <span className="font-semibold text-foreground">3.</span> Confirm — done!
            </li>
          </ol>
        )}

        <div className="mt-3 flex gap-2">
          <button
            onClick={install}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium py-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            {deferred ? "Install app" : expanded ? "Got it" : "Show me how"}
          </button>
          <button
            onClick={dismiss}
            className="text-xs text-muted-foreground px-3"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToHomeScreen;
