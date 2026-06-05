import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Heart, Users } from "lucide-react";
import providerImage from "@/assets/provider-headshot.png";
import gwenImage from "@/assets/gwen-headshot.png";
import telehealthImage from "@/assets/telehealth-session.webp";
import sunriseImage from "@/assets/sunrise-field.jpg";
import SEO from "@/components/SEO";

const rebeccaCredentials = [
  "Master of Science in Nursing – Walden University (2022)",
  "Board Certified Psychiatric Mental Health Nurse Practitioner (PMHNP)",
  "American Nurses Association Member",
  "16+ Years of Healthcare Experience",
];

const gwenCredentials = [
  "Master of Science in Nursing – Walden University (2024)",
  "Board Certified Psychiatric Mental Health Nurse Practitioner (PMHNP-BC)",
  "15+ Years of Nursing Experience",
  "Specialties: Mood Disorders, Trauma, Psychotic Disorders, Substance Use",
];

const values = [
  { icon: Heart, title: "Compassion First", desc: "Every interaction is guided by genuine care and empathy for your experience." },
  { icon: Users, title: "Individualized Care", desc: "No two journeys are the same. Your treatment plan is uniquely yours." },
  { icon: BookOpen, title: "Evidence-Based", desc: "We use proven therapeutic approaches grounded in the latest research." },
  { icon: Award, title: "Culturally Responsive", desc: "Respectful, inclusive care that honors each patient's background and identity." },
];

const About = () => {
  return (
    <main>
      <SEO
        title="About Heartland Mental Health Services | Telehealth Psychiatry"
        description="Meet our board-certified psychiatric providers offering virtual mental health care to patients across Phoenix, Tucson, Mesa, Scottsdale and all of Arizona."
        path="/about"
      />
      {/* Hero with sunrise image */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={sunriseImage} alt="Sunrise over a peaceful meadow" width={1920} height={800} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">About Us</h1>
          <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto">Get to know the heart behind Heartland Mental Health Services.</p>
        </div>
      </section>

      {/* Provider Bio */}
      <section id="rebecca" className="section-padding scroll-mt-24">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-2">
              <img src={providerImage} alt="Rebecca Nabosa, APRN, PMHNP" width={640} height={800} loading="lazy" className="rounded-2xl shadow-xl w-full object-cover aspect-[4/5]" />
            </div>
            <div className="md:col-span-3">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Meet Your Provider</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-6">Rebecca Nabosa, APRN, PMHNP</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Rebecca Nabosa is the Psychiatric Mental Health Provider behind Heartland Mental Health Services. With a Master of Science in Nursing from Walden University and over 16 years of healthcare experience, she is dedicated to delivering compassionate, patient-centered care to adolescents and adults.
                </p>
                <p>
                  Her clinical background spans a wide range of settings — from long-term care and assisted living to inpatient and outpatient mental health, crisis units, admissions, and community-based services. These experiences have given her a deep understanding of how to meet patients where they are and provide care tailored to their unique needs.
                </p>
                <p>
                  Rebecca specializes in treating substance use disorders, mood disorders, anxiety, PTSD, ADHD, psychosis, and other complex mental health concerns. Her approach emphasizes culturally responsive, individualized treatment, ensuring every patient feels heard, respected, and supported throughout their journey.
                </p>
                <p>
                  She is committed to creating a safe, supportive environment where patients can build trust and make meaningful progress. Rebecca offers virtual services, making high-quality mental health care accessible, convenient, and comfortable from the privacy of your own home.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="font-heading font-semibold text-foreground mb-3">Credentials & Background</h3>
                <ul className="space-y-2">
                  {rebeccaCredentials.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-4 w-4 text-accent shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Bio – Gwen */}
      <section id="gwen" className="section-padding bg-card scroll-mt-24">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-2">
              <img src={gwenImage} alt="Gwendoline Besong, RN, MSN, PMHNP-BC" width={640} height={800} loading="lazy" className="rounded-2xl shadow-xl w-full object-cover aspect-[4/5]" />
            </div>
            <div className="md:col-span-3">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Meet Your Provider</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-6">Gwendoline ("Gwen") Besong, RN, MSN, PMHNP-BC</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Gwen Besong is a board-certified Psychiatric Mental Health Nurse Practitioner at Heartland Mental Health Services. She earned her Master of Science in Nursing from Walden University in 2024 and brings over 15 years of diverse nursing experience to her practice.
                </p>
                <p>
                  Her extensive clinical background includes inpatient and outpatient psychiatry, community mental health, crisis stabilization, and substance-use treatment — giving her a well-rounded perspective on the many challenges patients face. Gwen is known for her warm, client-centered approach and her ability to connect with individuals from all walks of life.
                </p>
                <p>
                  Gwen specializes in the treatment of mood disorders, trauma-related conditions, psychotic disorders, substance use disorders, and chronic mental illness. She provides comprehensive psychiatric assessments and medication management rooted in evidence-based, individualized, and collaborative care.
                </p>
                <p>
                  She is deeply committed to fostering a supportive, stigma-free environment where every client feels empowered to take an active role in their healing journey and long-term wellness.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="font-heading font-semibold text-foreground mb-3">Credentials & Background</h3>
                <ul className="space-y-2">
                  {gwenCredentials.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-4 w-4 text-accent shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">Our Approach & Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything we do is guided by these core principles.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-background rounded-xl p-6 text-center border border-border/50">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Telehealth section (replaces "Our Welcoming Space") */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Virtual Care</p>
              <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">Care from the comfort of home</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We provide all of our services through secure telehealth sessions, so you can receive expert mental health care without leaving your home. No commute, no waiting rooms — just focused, compassionate care.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our virtual platform is easy to use and fully HIPAA-compliant, ensuring your privacy and comfort every step of the way.
              </p>
              <Button variant="warmCta" asChild>
                <Link to="/book">Book a Virtual Session</Link>
              </Button>
            </div>
            <img src={telehealthImage} alt="Patient having a comfortable telehealth session from home" width={1280} height={864} loading="lazy" className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
