import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Heart, Users } from "lucide-react";
import providerImage from "@/assets/provider-headshot.png";
import officeImage from "@/assets/office-interior.jpg";

const credentials = [
  "Master of Science in Nursing – Walden University (2022)",
  "Board Certified Psychiatric Mental Health Nurse Practitioner (PMHNP)",
  "American Nurses Association Member",
  "14+ Years of Healthcare Experience",
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
      {/* Hero */}
      <section className="relative py-20 bg-primary/5">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">About Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get to know the heart behind Heartland Mental Health Services.</p>
        </div>
      </section>

      {/* Provider Bio */}
      <section className="section-padding">
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
                  Rebecca Nabosa is the Psychiatric Mental Health Provider behind Heartland Mental Health Services. With a Master of Science in Nursing from Walden University and over 14 years of healthcare experience, she is dedicated to delivering compassionate, patient-centered care to adolescents and adults.
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
                  {credentials.map((c) => (
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

      {/* Office */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">Our Welcoming Space</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our office is designed to feel like a safe haven — warm lighting, comfortable seating, and a calming atmosphere that puts you at ease from the moment you walk in.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We also offer telehealth appointments for those who prefer the comfort of their own home.
              </p>
              <Button variant="warmCta" asChild>
                <Link to="/book">Book a Visit</Link>
              </Button>
            </div>
            <img src={officeImage} alt="Comfortable therapy office" width={800} height={800} loading="lazy" className="rounded-2xl shadow-xl w-full object-cover aspect-square" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
