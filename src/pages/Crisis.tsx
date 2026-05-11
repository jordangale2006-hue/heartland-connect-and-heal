import { Phone, MessageCircle, Globe, AlertTriangle, Heart } from "lucide-react";
import SEO from "@/components/SEO";

const resources = [
  {
    title: "988 Suicide & Crisis Lifeline",
    desc: "Free, confidential, 24/7 support for anyone in emotional distress or suicidal crisis.",
    actions: [
      { label: "Call 988", href: "tel:988", icon: Phone },
      { label: "Text 988", href: "sms:988", icon: MessageCircle },
      { label: "Chat 988lifeline.org", href: "https://988lifeline.org/chat/", icon: Globe },
    ],
  },
  {
    title: "Veterans Crisis Line",
    desc: "Confidential support for Veterans, service members, and their families. Press 1 after dialing.",
    actions: [
      { label: "Call 988, press 1", href: "tel:988", icon: Phone },
      { label: "Text 838255", href: "sms:838255", icon: MessageCircle },
    ],
  },
  {
    title: "SAMHSA National Helpline",
    desc: "24/7, free, confidential treatment referral and information service for individuals and families facing mental health and/or substance use disorders.",
    actions: [
      { label: "Call 1-800-662-4357", href: "tel:18006624357", icon: Phone },
    ],
  },
  {
    title: "Crisis Text Line",
    desc: "Text HOME to 741741 from anywhere in the U.S. to text with a trained crisis counselor.",
    actions: [
      { label: "Text HOME to 741741", href: "sms:741741?body=HOME", icon: MessageCircle },
    ],
  },
  {
    title: "Arizona Statewide Crisis Line",
    desc: "Connect with local crisis services anywhere in Arizona.",
    actions: [
      { label: "Call 1-844-534-4673", href: "tel:18445344673", icon: Phone },
    ],
  },
];

const Crisis = () => {
  return (
    <main>
      <SEO
        title="Mental Health Crisis Resources"
        description="If you or someone you love is in a mental health crisis, here are immediate resources. Call or text 988 for 24/7 confidential support."
        path="/crisis"
      />

      {/* Hero */}
      <section className="bg-accent/10 border-b border-accent/20">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
              <AlertTriangle className="h-4 w-4" />
              Need help right now?
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-foreground mb-4">
              You are not alone. Help is one call away.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              If you or someone you love is in immediate danger, call <strong>911</strong> or go to the nearest emergency room. For a mental health crisis, the resources below are free, confidential, and available 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* 988 large CTA */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 sm:p-12 text-center">
            <Heart className="h-10 w-10 mx-auto mb-4 text-accent" />
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-3">988</h2>
            <p className="text-lg sm:text-xl mb-6 text-primary-foreground/90">
              Suicide & Crisis Lifeline — call or text, 24/7.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:988"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <Phone className="h-5 w-5" /> Call 988
              </a>
              <a
                href="sms:988"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/20 transition-colors"
              >
                <MessageCircle className="h-5 w-5" /> Text 988
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* All resources */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl font-semibold text-foreground mb-8 text-center">
            More crisis & support resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((r) => (
              <article
                key={r.title}
                className="bg-background rounded-xl p-6 border border-border/50"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {r.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {r.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {r.actions.map((a) => (
                    <a
                      key={a.label}
                      href={a.href}
                      target={a.href.startsWith("http") ? "_blank" : undefined}
                      rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                    >
                      <a.icon className="h-4 w-4" />
                      {a.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            Heartland Mental Health Services is an outpatient telehealth practice. We do not provide 24/7 crisis services. If you need immediate help, please use the resources above or call 911.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Crisis;
