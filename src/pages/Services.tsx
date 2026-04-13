import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, ChevronRight, Check } from "lucide-react";
import arizonaImage from "@/assets/arizona-landscape.jpg";
import comfortImage from "@/assets/comfort-hands.jpg";
import { useState } from "react";

const serviceCategories = [
  {
    name: "Mood & Emotional Disorders",
    items: [
      "Anxiety", "Anxiety Disorder", "Depression", "Mood Disorders",
      "Bipolar Disorder", "Postpartum Anxiety", "Postpartum Depression",
      "Postpartum Obsessive-Compulsive Disorder (OCD)", "Social Anxiety",
      "Panic Attack", "Panic Disorder", "Burnout", "Stress", "Stress Management",
      "Anger Management", "Agitation",
    ],
  },
  {
    name: "Trauma & Stress-Related",
    items: [
      "Post-Traumatic Stress Disorder (PTSD)", "Adjustment Disorder",
      "Dissociative Disorder", "Attachment Disorder",
      "Bereavement / Grief Counseling",
    ],
  },
  {
    name: "Behavioral & Developmental",
    items: [
      "Attention-Deficit / Hyperactivity Disorder (ADHD)",
      "Behavioral Problems", "Behavioral Therapy",
      "Oppositional Defiant Disorder (ODD)",
      "Disruptive Mood Dysregulation Disorder (DMDD)",
      "Disruptive, Impulse-Control and Conduct Disorders",
      "Impulse Control Disorder (ICD)",
    ],
  },
  {
    name: "Addiction & Substance Use",
    items: [
      "Addiction / Substance Abuse", "Addiction Consultation",
      "Addiction Follow Up", "Drug Addiction", "Alcoholism",
    ],
  },
  {
    name: "Psychotic & Thought Disorders",
    items: [
      "Psychotic Disorder", "Schizoaffective Disorder", "Schizophrenia",
      "Delusional Disorder", "Hallucination(s)",
    ],
  },
  {
    name: "Personality & Complex Conditions",
    items: [
      "Borderline Personality Disorder (BPD)", "Personality Disorder",
      "Obsessive Compulsive Disorder (OCD)", "Agoraphobia",
      "Chronic Mental Illness", "Dementia", "Alzheimer's Disease",
    ],
  },
  {
    name: "Eating & Body-Related",
    items: [
      "Eating Disorder", "Binge Eating", "Bulimia Nervosa", "Disordered Eating",
    ],
  },
  {
    name: "Child, Adolescent & Family",
    items: [
      "Adolescent / Teen Issues", "Adolescent Psychiatry",
      "Child and Adolescent Psychiatry", "Child Psychiatry Consultation",
      "Family Issues", "Family Therapy / Marriage Therapy",
      "Couples Therapy", "Couples Conflict Resolution",
      "Men's Mental Health Issues",
    ],
  },
  {
    name: "Therapy & Consultation Services",
    items: [
      "Individual Counseling", "Adult Psychotherapy", "Psychotherapy",
      "Cognitive Behavioral Therapy (CBT)",
      "Psychotherapy Intake / Initial Visit", "New Patient Visit",
      "Mental Health Consultation", "Psychiatry Consultation",
      "Mental Health Problem", "Mental Illness",
    ],
  },
  {
    name: "Medication & Psychiatric Services",
    items: [
      "Medication Management", "Medication Review",
      "Psychiatric Medication Management", "Psychiatric Medication Review",
      "Pediatric Psychiatric Medication Review",
      "Comprehensive Psychiatric Assessment",
    ],
  },
];

const Services = () => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={arizonaImage} alt="Arizona desert landscape at golden hour" width={1920} height={800} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">Issues We Treat</h1>
          <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto">
            Comprehensive mental health support across a wide range of conditions — all through secure, compassionate telehealth care.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Click on any category below to see the specific conditions and services we offer. Our providers are experienced in treating all of the following.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {serviceCategories.map((cat, i) => (
              <div key={cat.name} className="border border-border/50 rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setOpenCategory(openCategory === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground">{cat.name}</h3>
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">{cat.items.length} services</span>
                    <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${openCategory === i ? "rotate-90" : ""}`} />
                  </span>
                </button>
                {openCategory === i && (
                  <div className="px-5 pb-5 border-t border-border/30">
                    <ul className="grid grid-cols-1 gap-1.5 pt-4">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual care callout */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img src={comfortImage} alt="Hands holding a warm cup of tea" width={800} height={800} loading="lazy" className="rounded-2xl shadow-xl w-full object-cover aspect-square" />
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Virtual Care</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">Healing from the comfort of home</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All of our services are available through secure telehealth sessions, allowing you to receive high-quality mental health care from wherever you feel most comfortable.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                No commute, no waiting rooms — just compassionate, focused care designed around your schedule and your life.
              </p>
              <Button variant="warmCta" size="lg" asChild>
                <Link to="/book">Book a Virtual Session</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="section-padding">
        <div className="container-narrow mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="font-heading text-3xl font-semibold text-foreground">Insurance & Payment</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            We accept most major insurance plans and also offer self-pay options. Our team will work with you to verify benefits and explore affordable solutions so that cost is never a barrier to care.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Please contact us to verify your specific insurance coverage before your first appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="warmCta" size="lg" asChild>
              <Link to="/book">Book an Appointment</Link>
            </Button>
            <Button variant="outlineWarm" size="lg" asChild>
              <Link to="/contact" className="inline-flex items-center gap-2">
                Verify Insurance <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
