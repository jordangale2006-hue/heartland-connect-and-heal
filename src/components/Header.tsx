import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Lock, Phone } from "lucide-react";
import logo from "@/assets/logo.webp";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Careers", path: "/careers" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container-narrow mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20 sm:h-28 overflow-visible">
        <Link to="/" className="flex items-center gap-2 sm:-ml-4">
          <img src={logo} alt="Heartland Mental Health Services" width={1024} height={683} fetchPriority="high" decoding="async" className="h-28 sm:h-96 w-auto object-contain -my-20" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href="tel:+15205955709" aria-label="Call (520) 595-5709">
              <Phone className="h-4 w-4 mr-1.5" />
              (520) 595-5709
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://www.optimantra.com/optimus/om/patient/login?accessPoint=c0tJNlJ2Y2UrYXNXRk5CRTgvMlBOZz09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Patient Portal (opens in new tab)"
            >
              <Lock className="h-4 w-4 mr-1.5" />
              Patient Portal
            </a>
          </Button>
          <Button variant="warmCta" size="lg" asChild>
            <Link to="/book">Schedule Appointment</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.optimantra.com/optimus/om/patient/login?accessPoint=c0tJNlJ2Y2UrYXNXRk5CRTgvMlBOZz09"
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
