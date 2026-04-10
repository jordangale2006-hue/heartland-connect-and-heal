import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Heart, Users } from "lucide-react";
import providerImage from "@/assets/provider-headshot.jpg";
import officeImage from "@/assets/office-interior.jpg";

const credentials = [
  "Licensed Professional Counselor (LPC)",
  "Board Certified in Clinical Mental Health",
  "Master's in Clinical Psychology",
  "Certified Trauma-Informed Care Specialist",
  "10+ Years of Clinical Experience",
];

const values = [
  { icon: Heart, title: "Compassion First", desc: "Every interaction is guided by genuine care and empathy for your experience." },
  { icon: Users, title: "Individualized Care", desc: "No two journeys are the same. Your treatment plan is uniquely yours." },
  { icon: BookOpen, title: "Evidence-Based", desc: "We use proven therapeutic approaches grounded in the latest research." },
  { icon: Award, title: "Professional Excellence", desc: "Committed to ongoing education and the highest standards of care." },
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
              <img src={providerImage} alt="Mental health provider portrait" width={640} height={800} loading="lazy" className="rounded-2xl shadow-xl w-full object-cover aspect-[4/5]" />
            </div>
            <div className="md:col-span-3">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Meet Your Provider</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-6">A Warm Welcome From Our Founder</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Welcome to Heartland Mental Health Services. I founded this practice with a simple belief: everyone deserves access to compassionate, high-quality mental health care in a safe and supportive environment.
                </p>
                <p>
                  With over a decade of experience in clinical mental health, I've had the privilege of walking alongside individuals through some of life's most challenging moments. My approach is rooted in empathy, respect, and the understanding that healing is not a linear journey.
                </p>
                <p>
                  I specialize in treating anxiety, depression, trauma, and stress-related conditions, using evidence-based therapeutic methods tailored to each individual's unique needs and goals. Whether you're navigating a difficult transition, processing past experiences, or simply seeking a space to be heard — I'm here for you.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="font-heading font-semibold text-foreground mb-3">Credentials & Certifications</h3>
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
