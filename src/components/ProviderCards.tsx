import { Link } from "react-router-dom";
import { Calendar, Clock, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import providerImage from "@/assets/provider-headshot.png";
import gwenImage from "@/assets/gwen-headshot.png";
import { useAppointmentDialog } from "@/components/AppointmentDialogProvider";

interface ProviderInfo {
  id: "rebecca" | "gwen";
  name: string;
  credentials: string;
  image: string;
  specialties: string[];
  availability: string;
  experience: string;
}

const providers: ProviderInfo[] = [
  {
    id: "rebecca",
    name: "Rebecca Nabosa",
    credentials: "APRN, PMHNP",
    image: providerImage,
    specialties: ["ADHD", "Anxiety", "Depression", "PTSD", "Substance Use"],
    availability: "Typically books within 5–7 days",
    experience: "16+ years experience",
  },
  {
    id: "gwen",
    name: "Gwendoline Besong",
    credentials: "RN, MSN, PMHNP-BC",
    image: gwenImage,
    specialties: ["Mood Disorders", "Trauma", "Substance Use", "Chronic Mental Illness"],
    availability: "Typically books within 5–7 days",
    experience: "15+ years experience",
  },
];

interface Props {
  /** Optional: filter availability tagline by condition slug for context */
  conditionContext?: string;
  heading?: string;
  subheading?: string;
}

const ProviderCards = ({ heading, subheading }: Props) => {
  const { open } = useAppointmentDialog();

  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Your Care Team</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            {heading ?? "Meet our board-certified providers"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subheading ?? "Arizona-licensed PMHNPs delivering compassionate virtual psychiatric care."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {providers.map((p) => (
            <article
              key={p.id}
              className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-4 p-5 sm:p-6">
                <img
                  src={p.image}
                  alt={`${p.name}, ${p.credentials}`}
                  width={160}
                  height={200}
                  loading="lazy"
                  className="w-24 h-28 sm:w-32 sm:h-36 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-xl font-semibold text-foreground leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{p.credentials}</p>

                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                    <Award className="h-3.5 w-3.5" />
                    Board-Certified PMHNP
                  </div>

                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    {p.availability}
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  Specialties
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1 rounded-md bg-secondary text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-3 mt-auto flex flex-col sm:flex-row gap-2">
                <Button variant="warmCta" className="flex-1" onClick={() => open(`provider-${p.id}`)}>
                  <Calendar className="h-4 w-4 mr-1.5" />
                  Book with {p.name.split(" ")[0]}
                </Button>
                <Button variant="outlineWarm" className="flex-1" asChild>
                  <Link to={`/about#${p.id}`}>Read Bio</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground inline-flex items-center justify-center gap-1.5 w-full">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          HIPAA-secure telehealth · Licensed in Arizona
        </p>
      </div>
    </section>
  );
};

export default ProviderCards;
