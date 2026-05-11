import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import CrisisBanner from "@/components/CrisisBanner";
import ProviderCards from "@/components/ProviderCards";
import { CONDITIONS, getCondition } from "@/data/conditions";
import { breadcrumbSchema, faqPageSchema, SITE_URL } from "@/lib/structured-data";

const ConditionPage = () => {
  const { slug = "" } = useParams();
  const condition = getCondition(slug);

  if (!condition) return <Navigate to="/conditions" replace />;

  const url = `${SITE_URL}/conditions/${condition.slug}`;

  const medicalConditionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: condition.name,
    url,
    signOrSymptom: condition.symptoms.map((s) => ({ "@type": "MedicalSymptom", name: s })),
    possibleTreatment: condition.treatmentApproach.map((t) => ({
      "@type": "MedicalTherapy",
      name: t,
    })),
  };

  const related = CONDITIONS.filter((c) => c.slug !== condition.slug).slice(0, 4);

  return (
    <main>
      <SEO
        title={condition.metaTitle}
        description={condition.metaDescription}
        path={`/conditions/${condition.slug}`}
        jsonLd={[
          medicalConditionSchema,
          faqPageSchema(condition.faqs),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Conditions", url: `${SITE_URL}/conditions` },
            { name: condition.shortName ?? condition.name, url },
          ]),
        ]}
      />

      <CrisisBanner />

      {/* Hero */}
      <section className="bg-card border-b border-border/50">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/conditions" className="hover:text-primary">Conditions</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{condition.shortName ?? condition.name}</span>
          </nav>

          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">{condition.hero.eyebrow}</p>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
            {condition.hero.headline}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-6">
            {condition.hero.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="warmCta" size="lg" asChild>
              <Link to="/book">Book an Evaluation</Link>
            </Button>
            <Button variant="outlineWarm" size="lg" asChild>
              <a href="tel:+15205955709">
                <Phone className="h-4 w-4 mr-2" />
                (520) 595-5709
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Symptoms + Approach */}
      <section className="section-padding">
        <div className="container-narrow mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              Common signs and symptoms
            </h2>
            <ul className="space-y-3">
              {condition.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              How we treat it
            </h2>
            <ul className="space-y-3">
              {condition.treatmentApproach.map((t) => (
                <li key={t} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Providers */}
      <ProviderCards
        heading={`Providers who treat ${condition.shortName ?? condition.name}`}
        subheading="Both of our PMHNPs are accepting new patients across Arizona."
      />

      {/* FAQ */}
      {condition.faqs.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container-narrow mx-auto">
            <h2 className="font-heading text-3xl font-semibold text-foreground mb-8 text-center">
              Frequently asked questions
            </h2>
            <Accordion type="multiple" className="max-w-3xl mx-auto space-y-3">
              {condition.faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`f-${i}`}
                  className="bg-background rounded-xl border border-border/50 overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 font-heading font-medium text-foreground hover:bg-muted/50 hover:no-underline text-left">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-6">
            Related conditions we treat
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {related.map((c) => (
              <Link
                key={c.slug}
                to={`/conditions/${c.slug}`}
                className="bg-card rounded-xl p-4 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <h3 className="font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {c.shortName ?? c.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm text-primary">
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConditionPage;
