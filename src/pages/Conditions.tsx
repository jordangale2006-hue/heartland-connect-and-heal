import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import SEO from "@/components/SEO";
import { CONDITIONS } from "@/data/conditions";
import { breadcrumbSchema, SITE_URL } from "@/lib/structured-data";

const Conditions = () => {
  return (
    <main>
      <SEO
        title="Conditions We Treat | Online Psychiatry in Arizona"
        description="From ADHD and anxiety to PTSD and bipolar disorder — explore the mental health conditions our Arizona telepsychiatry practice treats."
        path="/conditions"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Conditions", url: `${SITE_URL}/conditions` },
        ])}
      />

      <section className="bg-card border-b border-border/50">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Conditions We Treat</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Expert care for the conditions that affect daily life
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our board-certified psychiatric providers offer virtual evaluation, medication management, and ongoing care for adolescents and adults across Arizona.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONDITIONS.map((c) => (
              <Link
                key={c.slug}
                to={`/conditions/${c.slug}`}
                className="group bg-card rounded-xl p-5 border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-heading text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {c.shortName ?? c.name}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {c.hero.intro}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-3">
              Don't see your concern listed above?
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
            >
              View our full list of 90+ conditions we treat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Conditions;
