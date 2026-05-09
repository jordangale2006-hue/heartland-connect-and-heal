import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock, Users, Phone, Mail, MapPin, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/hero-nature.webp";
import lakeImage from "@/assets/calm-lake.jpg";
import telehealthImage from "@/assets/telehealth-session.webp";
import supportiveImage from "@/assets/supportive-conversation.webp";
import InsurancesAccepted from "@/components/InsurancesAccepted";
import InsuranceChecker from "@/components/InsuranceChecker";
import PsychiatryQuiz from "@/components/PsychiatryQuiz";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { medicalBusinessSchema, faqPageSchema } from "@/lib/structured-data";

const benefits = [
  { icon: Heart, title: "Patient-Centered Care", desc: "Your well-being is at the heart of everything we do." },
  { icon: Shield, title: "Confidential & Private", desc: "A safe space protected by strict HIPAA guidelines." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Appointments that work around your life and needs." },
  { icon: Users, title: "Compassionate Support", desc: "A warm, non-judgmental approach to your healing journey." },
];

const testimonials = [
  { text: "Rebecca was awesome! She's a great listener and gave me insight on how I was feeling and suggestions on how to overcome it.", author: "Roni K.", stars: 5 },
  { text: "Very insightful and patient. I left my appointment feeling seen, heard, and understood. Highly recommend.", author: "Alicia C.", stars: 5 },
  { text: "Very thorough and personable. Easy to talk to. I felt hopeful after my first visit that I was on a path to healing.", author: "Lori C.", stars: 5 },
  { text: "She really takes her time to understand what you're going through. I never felt rushed or dismissed. Truly a wonderful provider.", author: "Marcus T.", stars: 5 },
  { text: "I was nervous about starting therapy, but the team made me feel so comfortable from the very first session. Life-changing experience.", author: "Sarah M.", stars: 5 },
  { text: "The telehealth option is incredibly convenient. I get the same quality of care from my living room. Couldn't ask for more.", author: "David R.", stars: 5 },
  { text: "Compassionate, knowledgeable, and genuinely caring. I finally feel like someone is in my corner. Thank you, Heartland!", author: "Jessica W.", stars: 5 },
  { text: "After years of struggling, I found a place that actually listens. The personalized approach has made all the difference in my recovery.", author: "Angela P.", stars: 5 },
  { text: "Professional yet warm. They treat you like a person, not a number. I recommend Heartland to everyone I know.", author: "Chris L.", stars: 5 },
];

const faqs = [
  { q: "Do you accept insurance?", a: "We accept most major insurance plans. Please contact us to verify your specific coverage before your first appointment." },
  { q: "What should I expect at my first session?", a: "Your first session is an opportunity for us to get to know you, understand your concerns, and develop a personalized care plan together." },
  { q: "Is everything I share confidential?", a: "Absolutely. All sessions and communications are protected by strict HIPAA privacy regulations. Your information is safe with us." },
  { q: "How long are sessions?", a: "Standard sessions are typically 45–60 minutes. Initial evaluations may be longer to ensure we understand your needs fully." },
  { q: "Do you offer telehealth appointments?", a: "Yes, we offer secure video sessions for your convenience, allowing you to receive care from the comfort of your home." },
];

const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive items per page
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  // Reset current if it exceeds new totalPages
  useEffect(() => {
    if (current >= totalPages) setCurrent(0);
  }, [totalPages, current]);

  const next = useCallback(() => setCurrent((c) => (c + 1) % totalPages), [totalPages]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + totalPages) % totalPages), [totalPages]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section className="section-padding bg-primary/5">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground">Your trust means everything to us.</p>
        </div>
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden px-1">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIdx) => {
                const pageItems = testimonials.slice(
                  pageIdx * itemsPerPage,
                  pageIdx * itemsPerPage + itemsPerPage
                );
                return (
                  <div key={pageIdx} className="w-full shrink-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
                    {pageItems.map((t, i) => (
                      <div
                        key={pageIdx * itemsPerPage + i}
                        className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-lg transition-shadow duration-300"
                      >
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
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} aria-label="Previous testimonials" className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent/10 hover:scale-110 transition-all duration-200">
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-8" : "bg-border w-2.5 hover:bg-primary/40"}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next testimonials" className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent/10 hover:scale-110 transition-all duration-200">
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://www.zocdoc.com/doctor/rebecca-nabosa-aprn-pmhnp-466350?insuranceCarrier=-1&insurancePlan=-1&reason_visit=171"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors duration-200 group"
            >
              Read more reviews on Zocdoc
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <main>
      <SEO
        title="Online Psychiatrist in Arizona"
        description="Virtual psychiatry & medication management across Arizona. Aetna, BCBS, Cigna, Medicare, Tricare & UnitedHealthcare accepted. Book a telehealth visit today."
        path="/"
        jsonLd={[medicalBusinessSchema(), faqPageSchema(faqs)]}
      />
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Peaceful sunlit meadow with rolling hills" width={1920} height={1080} fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-foreground/20" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
              Online Psychiatry in Arizona — often booked within the week.
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/85 mb-6 leading-relaxed font-light" style={{ animationDelay: "0.15s" }}>
              Compassionate, virtual mental health care from Arizona-licensed providers.
              Most major insurance accepted. Same-week openings often available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6" style={{ animationDelay: "0.3s" }}>
              <Button variant="warmCta" size="lg" className="text-base px-8 py-6" asChild>
                <Link to="/book">Book Appointment</Link>
              </Button>
              <Button variant="outlineWarm" size="lg" className="text-base px-8 py-6 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <a href="tel:+15205955709"><Phone className="h-4 w-4 mr-2" />Call (520) 595-5709</a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/85">
              <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" /> HIPAA-secure telehealth</span>
              <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-accent text-accent" /> 5-star ZocDoc reviews</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> Mon–Sat appointments</span>
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

      {/* About preview with supportive image */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={supportiveImage} alt="Warm supportive conversation between two people" width={800} height={640} loading="lazy" className="rounded-2xl shadow-xl w-full object-cover aspect-square" />
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

      {/* Telehealth callout */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Virtual Care</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">Quality care from the comfort of home</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All of our appointments are conducted through secure, HIPAA-compliant telehealth sessions. No commute, no waiting rooms — just focused, compassionate care designed around your schedule.
              </p>
              <Button variant="warmCta" asChild>
                <Link to="/book" className="inline-flex items-center gap-2">
                  Book a Virtual Session <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <img src={telehealthImage} alt="Patient having a telehealth therapy session from home" width={1280} height={864} loading="lazy" className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Insurances Accepted */}
      <InsurancesAccepted />

      {/* Insurance Checker — interactive */}
      <InsuranceChecker />

      {/* Self-check quiz — interactive */}
      <PsychiatryQuiz />

      {/* Testimonials Slider */}
      <TestimonialsSlider />

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
          <Accordion type="multiple" className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background rounded-xl border border-border/50 overflow-hidden transition-shadow duration-300 hover:shadow-md"
              >
                <AccordionTrigger className="px-6 py-4 font-heading font-medium text-foreground hover:bg-muted/50 hover:no-underline transition-colors text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border/30 pt-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
                <p className="text-sm text-muted-foreground">heartlandmentalhealthservices@gmail.com</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">Mailing Address</h3>
                <p className="text-sm text-muted-foreground text-center">21168 E Ocotillo Rd #1146<br />Queen Creek, AZ 85142</p>
                <p className="text-xs text-muted-foreground italic">Mailing address only</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
