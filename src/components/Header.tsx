import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container-narrow mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-accent fill-accent/20" />
          <span className="font-heading text-lg sm:text-xl font-semibold text-foreground leading-tight">
            Heartland<span className="hidden sm:inline"> Mental Health</span>
          </span>
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

        <div className="hidden md:block">
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
