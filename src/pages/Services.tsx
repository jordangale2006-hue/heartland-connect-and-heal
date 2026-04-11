import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, CloudRain, HeartCrack, Flame, MessageCircle, Sparkles, Users, ChevronRight } from "lucide-react";
import arizonaImage from "@/assets/arizona-landscape.jpg";
import comfortImage from "@/assets/comfort-hands.jpg";

const services = [
  {
    icon: CloudRain,
    title: "Anxiety Treatment",
    desc: "Feeling overwhelmed or constantly on edge? We help you develop strategies to manage anxiety and regain a sense of calm and control in your daily life.",
    audience: "Adults & Teens",
  },
  {
    icon: HeartCrack,
    title: "Depression Support",
    desc: "When sadness feels heavy and persistent, we're here to help. Our approach addresses the root causes and helps you rediscover hope and joy.",
    audience: "Adults & Teens",
  },
  {
    icon: Flame,
    title: "Trauma & PTSD",
    desc: "Healing from trauma is possible. We use evidence-based, trauma-informed approaches to help you process difficult experiences safely and at your own pace.",
    audience: "Adults",
  },
  {
    icon: Brain,
    title: "Stress Management",
    desc: "Life's demands can feel overwhelming. Learn practical techniques to manage stress, set boundaries, and build resilience for a more balanced life.",
    audience: "Adults & Teens",
  },
  {
    icon: MessageCircle,
    title: "Individual Counseling",
    desc: "One-on-one sessions tailored to your unique needs. A safe space to explore your thoughts, feelings, and goals with a supportive professional.",
    audience: "Adults & Teens",
  },
  {
    icon: Sparkles,
    title: "Personal Growth",
    desc: "Therapy isn't just about addressing challenges — it's also about becoming the best version of yourself. We support your journey of self-discovery.",
    audience: "Adults",
  },
];

const Services = () => {
  return (
    <main>
      {/* Hero with background image */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={arizonaImage} alt="Arizona desert landscape at golden hour" width={1920} height={800} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">Our Services</h1>
          <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto">
            Comprehensive mental health support tailored to your unique needs and goals.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{s.title}</h3>
                <span className="text-xs text-accent font-medium">{s.audience}</span>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comfort image + virtual care callout */}
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
