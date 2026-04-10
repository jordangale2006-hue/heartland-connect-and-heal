import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src={logo} alt="Heartland Mental Health Services" className="h-16 w-auto brightness-0 invert" />
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Compassionate mental health care for individuals seeking support, growth, and healing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "About", path: "/about" },
                { label: "Book Appointment", path: "/book" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <div>
                  <p>+1 (520) 595-5709</p>
                  <p className="text-xs">Fax: +1 (520) 595-5851</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span>heartlandmentalhealthservices@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>21168 E Ocotillo Rd #1146<br />Queen Creek, AZ 85142</span>
              </div>
            </div>
          </div>

          {/* Social & Hours */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Office Hours</h4>
            <div className="text-sm text-primary-foreground/70 space-y-1">
              <p>Monday – Friday: 8am – 5pm</p>
              <p>Saturday: 9am – 2pm</p>
              <p>Sunday: Closed</p>
            </div>
            <div className="flex gap-3 mt-4">
              {[
                { label: "Facebook", url: "https://www.facebook.com/HeartlandMentalHealthServices" },
                { label: "Instagram", url: "https://www.instagram.com/Heartlandmhservices" },
                { label: "LinkedIn", url: "https://www.linkedin.com/company/heart-land-mental-health-services/" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full border border-primary-foreground/20 text-primary-foreground/70 hover:border-accent hover:text-accent transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
            <p>© {new Date().getFullYear()} Heartland Mental Health Services. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">HIPAA Notice</a>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/40 mt-4 leading-relaxed">
            Disclaimer: This website is for informational purposes only and does not constitute medical advice. 
            All communications are handled in accordance with HIPAA privacy regulations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
