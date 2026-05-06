import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Briefcase } from "lucide-react";
import { toast } from "sonner";
import careersHero from "@/assets/careers-hero.jpg";

const Careers = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [convicted, setConvicted] = useState<"" | "yes" | "no">("");
  const [convictionDetails, setConvictionDetails] = useState("");
  const [fingerprintCard, setFingerprintCard] = useState<"" | "yes" | "no">("");
  const [resume, setResume] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !lastName || !phone || !convicted || !fingerprintCard) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (convicted === "yes" && !convictionDetails.trim()) {
      toast.error("Please provide details about your conviction.");
      return;
    }
    toast.success("Application submitted! We'll review it and get back to you.");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setConvicted("");
    setConvictionDetails("");
    setFingerprintCard("");
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <main>
      <section className="relative py-20 bg-primary/5 overflow-hidden">
        <img
          src={careersHero}
          alt="Welcoming team of mental health professionals collaborating around a sunlit table"
          width={1536}
          height={768}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">Careers</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our team at Heartland Mental Health Services. We're looking for compassionate professionals dedicated to making a difference.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-10">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">Apply Now</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">First Name *</label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Last Name *</label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                  <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
              </div>

              {/* Criminal conviction question */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Have you ever been convicted of a crime, including felonies or misdemeanors? *
                </label>
                <div className="flex gap-4">
                  {(["yes", "no"] as const).map((val) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="convicted"
                        value={val}
                        checked={convicted === val}
                        onChange={() => setConvicted(val)}
                        className="accent-primary h-4 w-4"
                      />
                      <span className="text-sm capitalize">{val === "yes" ? "Yes" : "No"}</span>
                    </label>
                  ))}
                </div>
                {convicted === "yes" && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Please explain *
                    </label>
                    <Textarea
                      value={convictionDetails}
                      onChange={(e) => setConvictionDetails(e.target.value)}
                      placeholder="Please provide details..."
                      rows={3}
                      required
                    />
                  </div>
                )}
              </div>

              {/* Fingerprint clearance card */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Do you have a valid Fingerprint Clearance Card? *
                </label>
                <div className="flex gap-4">
                  {(["yes", "no"] as const).map((val) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fingerprintCard"
                        value={val}
                        checked={fingerprintCard === val}
                        onChange={() => setFingerprintCard(val)}
                        className="accent-primary h-4 w-4"
                      />
                      <span className="text-sm capitalize">{val === "yes" ? "Yes" : "No"}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Resume upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Attach Resume</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/40 transition-colors"
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {resume ? resume.name : "Click to upload your resume (PDF, DOC, DOCX)"}
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <Button type="submit" variant="warmCta" size="lg" className="w-full">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;
