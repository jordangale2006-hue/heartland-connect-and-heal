import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock, Users, Phone, Mail, MapPin, Star, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-nature.jpg";
import lakeImage from "@/assets/calm-lake.jpg";
import officeImage from "@/assets/office-interior.jpg";

const benefits = [
  { icon: Heart, title: "Patient-Centered Care", desc: "Your well-being is at the heart of everything we do." },
  { icon: Shield, title: "Confidential & Private", desc: "A safe space protected by strict HIPAA guidelines." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Appointments that work around your life and needs." },
  { icon: Users, title: "Compassionate Support", desc: "A warm, non-judgmental approach to your healing journey." },
];

const testimonials = [
  { text: "I finally feel heard and supported. The care I've received has truly changed my life.", author: "A.M.", stars: 5 },
  { text: "A safe, welcoming space where I can be myself. I'm so grateful I took the first step.", author: "R.K.", stars: 5 },
  { text: "Professional, compassionate, and understanding. I highly recommend their services.", author: "J.T.", stars: 5 },
];

const faqs = [
  { q: "Do you accept insurance?", a: "We accept most major insurance plans. Please contact us to verify your specific coverage before your first appointment." },
  { q: "What should I expect at my first session?", a: "Your first session is an opportunity for us to get to know you, understand your concerns, and develop a personalized care plan together." },
  { q: "Is everything I share confidential?", a: "Absolutely. All sessions and communications are protected by strict HIPAA privacy regulations. Your information is safe with us." },
  { q: "How long are sessions?", a: "Standard sessions are typically 45–60 minutes. Initial evaluations may be longer to ensure we understand your needs fully." },
  { q: "Do you offer telehealth appointments?", a: "Yes, we offer secure video sessions for your convenience, allowing you to receive care from the comfort of your home." },
];

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Peaceful sunlit meadow with rolling hills" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-foreground/20" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
              Helping you connect with the support you need.
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/85 mb-8 leading-relaxed font-light" style={{ animationDelay: "0.15s" }}>
              Compassionate, confidential mental health care in a warm and welcoming environment. You don't have to face this alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" style={{ animationDelay: "0.3s" }}>
              <Button variant="warmCta" size="lg" className="text-base px-8 py-6" asChild>
                <Link to="/book">Schedule an Appointment</Link>
              </Button>
              <Button variant="outlineWarm" size="lg" className="text-base px-8 py-6 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">Why Choose Heartland?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We believe that seeking help is a courageous step, and we're here to walk alongside you every step of the way.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-background rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-border/50">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <b.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={officeImage} alt="Welcoming therapy office with natural light" width={800} height={800} loading="lazy" className="rounded-2xl shadow-xl w-full object-cover aspect-square" />
            </div>
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">About Our Practice</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">A safe space for your healing journey</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Heartland Mental Health Services, we understand that reaching out for help can feel overwhelming. That's why we've created a warm, welcoming environment where you can feel safe to share, heal, and grow.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our approach is rooted in compassion, evidence-based practices, and a genuine commitment to your well-being. Every individual's journey is unique, and we tailor our care to meet your specific needs.
              </p>
              <Button variant="outlineWarm" asChild>
                <Link to="/about" className="inline-flex items-center gap-2">
                  Learn More About Us <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary/5">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground">Your trust means everything to us.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-sm border border-border/50">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground italic leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-sm text-muted-foreground font-medium">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img src={lakeImage} alt="Calm lake at sunrise" width={1280} height={720} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary-foreground mb-4">Ready to Take the First Step?</h2>
          <p className="text-primary-foreground/85 max-w-xl mx-auto mb-8 text-lg">
            Reaching out is the hardest part — and you've already made it this far. We're here whenever you're ready.
          </p>
          <Button variant="warmCta" size="lg" className="text-base px-8 py-6" asChild>
            <Link to="/book">Schedule Your Appointment</Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-background rounded-xl border border-border/50 overflow-hidden">
                <summary className="cursor-pointer px-6 py-4 font-heading font-medium text-foreground flex items-center justify-between list-none">
                  {faq.q}
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 sm:p-10">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">Call Us</h3>
                <p className="text-sm text-muted-foreground">+1 (520) 595-5709</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">Email Us</h3>
                <p className="text-sm text-muted-foreground">info@heartlandmhs.com</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">Visit Us</h3>
                <p className="text-sm text-muted-foreground">Tucson, Arizona</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
