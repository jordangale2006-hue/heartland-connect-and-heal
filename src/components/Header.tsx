import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Lock, Phone } from "lucide-react";
import logo from "@/assets/logo-header.webp";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Conditions", path: "/conditions" },
  { label: "All Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Careers", path: "/careers" },
];

const PORTAL_URL = "https://www.optimantra.com/optimus/om/patient/login?accessPoint=c0tJNlJ2Y2UrYXNXRk5CRTgvMlBOZz09";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto w-full max-w-[1600px] flex items-center justify-between gap-4 px-4 sm:px-6 h-20 sm:h-28">
        <div className="flex items-center min-[1400px]:flex-1 min-[1400px]:justify-center">
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Heartland Mental Health Services" width={634} height={237} fetchPriority="high" decoding="async" className="h-[63px] min-[1400px]:h-16 w-auto max-w-none object-contain" />
        </Link>
        </div>

        <nav className="hidden min-[1400px]:flex items-center gap-1 shrink-0 whitespace-nowrap">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden min-[1400px]:flex items-center gap-2 shrink-0 whitespace-nowrap">
          <Button variant="ghost" size="sm" asChild>
            <a href="tel:+15205955709" aria-label="Call (520) 595-5709">
              <Phone className="h-4 w-4 mr-1.5" />
              (520) 595-5709
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" aria-label="Patient Portal (opens in new tab)">
              <Lock className="h-4 w-4 mr-1.5" />
              Patient Portal
            </a>
          </Button>
          <Button variant="warmCta" size="lg" asChild>
            <Link to="/book">Schedule Appointment</Link>
          </Button>
        </div>

        <button
          className="min-[1400px]:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="min-[1400px]:hidden bg-card border-b border-border px-4 pb-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`whitespace-nowrap px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+15205955709"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/50 flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              (520) 595-5709
            </a>
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/50 flex items-center gap-2"
            >
              <Lock className="h-4 w-4" />
              Patient Portal
            </a>
            <Button variant="warmCta" className="mt-2" asChild>
              <Link to="/book" onClick={() => setMobileOpen(false)}>Schedule Appointment</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
