import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronRight, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

const serviceOptions = [
  "Anxiety Treatment",
  "Depression Support",
  "Trauma & PTSD",
  "Stress Management",
  "Individual Counseling",
  "Personal Growth",
  "Initial Consultation",
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const BookAppointment = () => {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appointment request submitted! We'll contact you shortly to confirm.");
    setService("");
    setDate("");
    setTime("");
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <main>
      <section className="relative py-20 bg-primary/5">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">Book Your Appointment</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Taking the first step is the hardest part — and we're so glad you're here. Choose a time that works for you.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 space-y-6">
                <div>
                  <label className="block font-heading font-medium text-foreground mb-2">Select Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Choose a service...</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-heading font-medium text-foreground mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" /> Preferred Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block font-heading font-medium text-foreground mb-2">
                      <Clock className="inline h-4 w-4 mr-1" /> Preferred Time
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a time...</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-heading font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      maxLength={100}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block font-heading font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-heading font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={255}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <Button type="submit" variant="warmCta" size="lg" className="w-full text-base py-6">
                  Book Your Appointment <ChevronRight className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Prefer to Call?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We're happy to help you schedule over the phone. Don't hesitate to reach out.
                </p>
                <div className="space-y-3">
                  <a href="tel:+15205955709" className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
                    <Phone className="h-4 w-4" /> +1 (520) 595-5709
                  </a>
                  <a href="mailto:heartlandmentalhealthservices@gmail.com" className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
                    <Mail className="h-4 w-4" /> heartlandmentalhealthservices@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">What to Expect</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">1</span>
                    Submit your preferred date and time
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">2</span>
                    We'll confirm your appointment within 24 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">3</span>
                    Receive intake forms via email before your visit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">4</span>
                    Attend your session in-person or via telehealth
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookAppointment;
