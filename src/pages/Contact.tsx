import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import arizonaImage from "@/assets/arizona-landscape.jpg";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(5, "Please share a bit more").max(1000),
});

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-contact", {
        body: {
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
        },
      });
      if (error || !data?.success) throw error || new Error("Submission failed");

      toast.success("Message sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero with background image */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={arizonaImage} alt="Peaceful Arizona landscape" width={1920} height={800} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with questions or to schedule your first visit.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-heading font-medium text-foreground mb-2 text-sm">Name</label>
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
                  <label className="block font-heading font-medium text-foreground mb-2 text-sm">Email</label>
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
                <div>
                  <label className="block font-heading font-medium text-foreground mb-2 text-sm">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={1000}
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                <Button type="submit" variant="warmCta" size="lg" disabled={submitting} className="w-full text-base">
                  {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : (<>Send Message <Send className="h-4 w-4" /></>)}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-5">
                <h3 className="font-heading text-xl font-semibold text-foreground">Get in Touch</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (520) 595-5709</p>
                    <p className="text-xs text-muted-foreground">Fax: +1 (520) 595-5851</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Email</p>
                    <p className="text-sm text-muted-foreground">heartlandmentalhealthservices@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Mailing Address</p>
                    <p className="text-sm text-muted-foreground">21168 E Ocotillo Rd #1146</p>
                    <p className="text-sm text-muted-foreground">Queen Creek, AZ 85142</p>
                    <p className="text-xs text-muted-foreground/70 mt-1 italic">This is a mailing address only, not a walk-in location.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Office Hours</p>
                    <p className="text-sm text-muted-foreground">Monday – Friday: 8am – 5pm</p>
                    <p className="text-sm text-muted-foreground">Saturday: 9am – 2pm</p>
                    <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
