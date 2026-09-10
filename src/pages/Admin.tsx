import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, RefreshCw, FileText } from "lucide-react";

interface Appt {
  id: string; name: string; email: string; phone: string;
  insurance: string | null; reason: string | null; preferred_time: string | null;
  status: string; created_at: string;
}
interface Contact {
  id: string; name: string; email: string; message: string; created_at: string;
}
interface App {
  id: string; first_name: string; last_name: string; email: string; phone: string;
  convicted: string; conviction_details: string | null; fingerprint_card: string;
  resume_path: string | null; status: string; created_at: string;
}

const fmt = (d: string) =>
  new Date(d).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card rounded-xl border border-border/50 p-5 space-y-2">{children}</div>
);

const Field = ({ label, value }: { label: string; value?: string | null }) =>
  value ? (
    <p className="text-sm text-muted-foreground">
      <span className="font-medium text-foreground">{label}: </span>
      <span className="whitespace-pre-wrap">{value}</span>
    </p>
  ) : null;

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appts, setAppts] = useState<Appt[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [apps, setApps] = useState<App[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    const [a, c, j] = await Promise.all([
      supabase.from("appointment_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("job_applications").select("*").order("created_at", { ascending: false }),
    ]);
    setAppts((a.data as Appt[]) ?? []);
    setContacts((c.data as Contact[]) ?? []);
    setApps((j.data as App[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/login", { replace: true });
        return;
      }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: sess.session.user.id,
        _role: "admin",
      });
      if (!active) return;
      setAllowed(Boolean(isAdmin));
      setChecking(false);
      if (isAdmin) load();
    })();
    return () => { active = false; };
  }, [navigate, load]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  const openResume = async (path: string) => {
    const { data, error } = await supabase.storage.from("resumes").createSignedUrl(path, 300);
    if (error || !data) {
      toast({ title: "Couldn't open the resume", variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  if (checking) {
    return (
      <main className="section-padding text-center">
        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
      </main>
    );
  }

  if (!allowed) {
    return (
      <main className="section-padding">
        <SEO title="Staff Area" description="Restricted staff area." path="/admin" noIndex />
        <div className="container-narrow mx-auto px-4 text-center max-w-lg">
          <h1 className="font-heading text-2xl font-semibold mb-3">Not authorized yet</h1>
          <p className="text-muted-foreground mb-6">
            Your account is signed in but hasn't been given access to the submissions area yet.
          </p>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="section-padding">
      <SEO title="Form Submissions" description="Restricted staff area." path="/admin" noIndex />
      <div className="container-narrow mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <h1 className="font-heading text-3xl font-semibold text-foreground">Form Submissions</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="appts">
          <TabsList className="mb-6">
            <TabsTrigger value="appts">Appointments ({appts.length})</TabsTrigger>
            <TabsTrigger value="contacts">Messages ({contacts.length})</TabsTrigger>
            <TabsTrigger value="apps">Applications ({apps.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="appts" className="space-y-4">
            {appts.map((r) => (
              <Card key={r.id}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h2 className="font-heading text-lg font-semibold text-foreground">{r.name}</h2>
                  <span className="text-xs text-muted-foreground">{fmt(r.created_at)}</span>
                </div>
                <Field label="Phone" value={r.phone} />
                <Field label="Email" value={r.email} />
                <Field label="Insurance" value={r.insurance} />
                <Field label="Best time" value={r.preferred_time} />
                <Field label="Reason" value={r.reason} />
              </Card>
            ))}
            {!appts.length && <p className="text-muted-foreground">Nothing here yet.</p>}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            {contacts.map((r) => (
              <Card key={r.id}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h2 className="font-heading text-lg font-semibold text-foreground">{r.name}</h2>
                  <span className="text-xs text-muted-foreground">{fmt(r.created_at)}</span>
                </div>
                <Field label="Email" value={r.email} />
                <Field label="Message" value={r.message} />
              </Card>
            ))}
            {!contacts.length && <p className="text-muted-foreground">Nothing here yet.</p>}
          </TabsContent>

          <TabsContent value="apps" className="space-y-4">
            {apps.map((r) => (
              <Card key={r.id}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    {r.first_name} {r.last_name}
                  </h2>
                  <span className="text-xs text-muted-foreground">{fmt(r.created_at)}</span>
                </div>
                <Field label="Phone" value={r.phone} />
                <Field label="Email" value={r.email} />
                <Field label="Prior conviction" value={r.convicted} />
                <Field label="Details" value={r.conviction_details} />
                <Field label="Fingerprint card" value={r.fingerprint_card} />
                {r.resume_path && (
                  <Button variant="outline" size="sm" onClick={() => openResume(r.resume_path!)}>
                    <FileText className="h-4 w-4 mr-2" /> View resume
                  </Button>
                )}
              </Card>
            ))}
            {!apps.length && <p className="text-muted-foreground">Nothing here yet.</p>}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;
