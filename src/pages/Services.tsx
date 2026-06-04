import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, ChevronRight, Check, ArrowUpRight } from "lucide-react";
import arizonaImage from "@/assets/arizona-landscape.jpg";
import comfortImage from "@/assets/comfort-hands.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";

// Map specific service-list items to their dedicated condition landing page slug.
// Items without a mapping render as plain text.
const CONDITION_SLUG_MAP: Record<string, string> = {
  "Anxiety": "anxiety",
  "Anxiety Disorder": "anxiety",
  "Social Anxiety": "anxiety",
  "Depression": "depression",
  "Bipolar Disorder": "bipolar-disorder",
  "Panic Attack": "panic-disorder",
  "Panic Disorder": "panic-disorder",
  "Postpartum Anxiety": "postpartum-depression",
  "Postpartum Depression": "postpartum-depression",
  "Postpartum Obsessive-Compulsive Disorder (OCD)": "ocd",
  "Post-Traumatic Stress Disorder (PTSD)": "ptsd",
  "Attention-Deficit / Hyperactivity Disorder (ADHD)": "adhd",
  "Obsessive Compulsive Disorder (OCD)": "ocd",
  "Addiction / Substance Abuse": "substance-use",
  "Drug Addiction": "substance-use",
  "Alcoholism": "substance-use",
  "Psychotic Disorder": "psychosis",
  "Schizoaffective Disorder": "psychosis",
  "Schizophrenia": "psychosis",
  "Adolescent / Teen Issues": "adolescent-mental-health",
  "Adolescent Psychiatry": "adolescent-mental-health",
  "Child and Adolescent Psychiatry": "adolescent-mental-health",
};

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
  return (
    <main>
      <SEO
        title="Conditions A–Z | Heartland Mental Health Services"
        description="The complete A–Z list of 90+ mental health conditions and services treated by our Arizona telepsychiatry team. Featured conditions link to detailed care pages."
        path="/services"
      />
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

      {/* Featured conditions callout */}
      <section className="section-padding pb-0">
        <div className="container-narrow mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-1">
                Looking for in-depth information?
              </h2>
              <p className="text-sm text-muted-foreground">
                Our most-treated conditions have dedicated care pages with symptoms, treatment approach, and FAQs.
              </p>
            </div>
            <Button variant="warmCta" asChild className="shrink-0">
              <Link to="/conditions">Browse Featured Conditions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Click on any category below to see the specific conditions and services we offer. Items marked with an arrow link to a detailed care page.
          </p>
          <Accordion type="multiple" className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            {serviceCategories.map((cat, i) => (
              <AccordionItem
                key={cat.name}
                value={`item-${i}`}
                className="border border-border/50 rounded-xl overflow-hidden bg-card transition-shadow duration-300 hover:shadow-md self-start"
              >
                <AccordionTrigger className="px-5 py-5 hover:bg-muted/50 hover:no-underline transition-colors">
                  <div className="flex items-center justify-between w-full gap-3">
                    <h3 className="font-heading text-lg font-semibold text-foreground text-left">{cat.name}</h3>
                    <span className="text-xs text-muted-foreground shrink-0">{cat.items.length} services</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 border-t border-border/30">
                  <ul className="grid grid-cols-1 gap-1.5 pt-4">
                    {cat.items.map((item) => {
                      const slug = CONDITION_SLUG_MAP[item];
                      return (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {slug ? (
                            <Link
                              to={`/conditions/${slug}`}
                              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                            >
                              <span className="underline-offset-2 group-hover:underline">{item}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 text-primary shrink-0" />
                            </Link>
                          ) : (
                            <span className="text-muted-foreground">{item}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
