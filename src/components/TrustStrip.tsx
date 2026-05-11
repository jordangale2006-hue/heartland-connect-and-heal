import { Award, ShieldCheck, MapPin, Clock } from "lucide-react";

const items = [
  { icon: Award, text: "Board-Certified PMHNPs" },
  { icon: Clock, text: "16+ years experience" },
  { icon: ShieldCheck, text: "HIPAA-secure telehealth" },
  { icon: MapPin, text: "Licensed in Arizona" },
];

const TrustStrip = () => {
  return (
    <section className="bg-foreground text-primary-foreground">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
          {items.map(({ icon: Icon, text }) => (
            <li key={text} className="inline-flex items-center gap-2 text-sm font-medium">
              <Icon className="h-4 w-4 text-accent" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustStrip;
