import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Heart, Users } from "lucide-react";
import providerImage from "@/assets/provider-headshot.png";
import angelaImage from "@/assets/angela-woodman.jpeg.asset.json";
import telehealthImage from "@/assets/telehealth-session.webp";
import sunriseImage from "@/assets/sunrise-field.jpg";
import SEO from "@/components/SEO";

const rebeccaCredentials = [
  "Master of Science in Nursing – Walden University (2022)",
  "Board Certified Psychiatric Mental Health Nurse Practitioner (PMHNP)",
  "American Nurses Association Member",
  "16+ Years of Healthcare Experience",
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
        title="About Our Online Psychiatry Providers | Heartland"
        description="Meet Heartland's board-certified psychiatric providers offering 100% virtual mental health care to patients across Arizona and Iowa."
        path="/about"
      />
      {/* Hero with sunrise image */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={sunriseImage} alt="Sunrise over a peaceful meadow" width={1920} height={800} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">About Our Online Psychiatry Providers</h1>
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

      {/* Provider Bio — Angela Woodman */}
      <section id="angela" className="section-padding scroll-mt-24 bg-card">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-2">
              <div className="rounded-2xl shadow-xl w-full aspect-[4/5] overflow-hidden">
                <img
                  src={angelaImage.url}
                  alt="Portrait of Angela Woodman, PMHNP-BC, board-certified psychiatric mental health nurse practitioner"
                  width={640}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover scale-[1.1]"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Meet Your Provider</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-6">Angela Woodman, PMHNP-BC</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Angela Woodman is a board-certified Psychiatric Mental Health Nurse Practitioner who provides compassionate, individualized care for children, adolescents, adults, and older adults. Her clinical interests include depression, anxiety, ADHD, and bipolar disorder.
                </p>
                <p>
                  Angela believes meaningful care begins with listening. She takes time to understand each patient's experiences, concerns, and goals, creating a welcoming space where they feel heard and respected. Through evidence-based medication management and therapeutic support, she partners with patients to develop treatment plans tailored to their needs.
                </p>
                <p>
                  She values the lasting relationships she builds with patients and finds fulfillment in supporting their confidence, well-being, and progress.
                </p>
                <p>
                  Angela earned her degrees from Arizona State University and Regis College. Outside of work, she enjoys reading, gardening, spending time outdoors, and making memories with her family.
                </p>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">Areas of Focus</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["Depression", "Anxiety", "ADHD", "Bipolar Disorder"].map((s) => (
                      <span key={s} className="text-xs px-2 py-1 rounded-md bg-secondary text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">Age Groups</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["Children", "Adolescents", "Adults", "Older Adults"].map((s) => (
                      <span key={s} className="text-xs px-2 py-1 rounded-md bg-secondary text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-heading font-semibold text-foreground mb-3">Credentials & Background</h3>
                <ul className="space-y-2">
                  {[
                    "Board Certified Psychiatric Mental Health Nurse Practitioner (PMHNP-BC)",
                    "Degrees from Arizona State University and Regis College",
                  ].map((c) => (
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
      <section className="section-padding">
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
