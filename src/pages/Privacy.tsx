import { Link } from "react-router-dom";
import LegalPage, { PrivacyContact } from "@/components/LegalPage";

const Privacy = () => (
  <LegalPage
    title="Privacy Policy"
    seoTitle="Privacy Policy | Heartland Mental Health"
    description="How Heartland Mental Health Services collects, uses, and protects your information, including health information handled under HIPAA."
    path="/privacy"
    effectiveDate="October 5, 2026"
  >
    <section>
      <p>
        Heartland Mental Health Services ("Heartland," "we," "us") provides virtual psychiatric care. This policy
        explains what information we collect through this website, how we use it, and how we protect it.
      </p>
    </section>
    <section>
      <h2>Information we collect</h2>
      <ul>
        <li><strong>Contact form:</strong> your name, email, phone number, and the message you send us.</li>
        <li><strong>Appointment requests:</strong> your name, contact details, state, preferred times, insurance, and any reason for visit you choose to share.</li>
        <li><strong>Job applications:</strong> information and documents you submit through our careers page.</li>
        <li><strong>Site analytics:</strong> basic, non-identifying usage data such as pages visited, device and browser type, and approximate region, used to understand how the site is used.</li>
      </ul>
      <p>Please do not include detailed medical information in website forms. We will discuss your care through secure channels.</p>
    </section>
    <section>
      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your questions and schedule appointments.</li>
        <li>To send confirmations and follow-up messages related to your request.</li>
        <li>To verify insurance and coordinate your care.</li>
        <li>To maintain, secure, and improve this website.</li>
      </ul>
    </section>
    <section>
      <h2>Protected health information</h2>
      <p>
        Any protected health information (PHI) you share with us as a patient or prospective patient is handled in
        accordance with the Health Insurance Portability and Accountability Act (HIPAA). For details on how your
        health information may be used and disclosed and your rights, see our{" "}
        <Link to="/hipaa-notice">HIPAA Notice of Privacy Practices</Link>.
      </p>
    </section>
    <section>
      <h2>We do not sell your information</h2>
      <p>
        We do not sell, rent, or trade your personal information. We share information only with service providers
        who help us operate our practice (such as our secure patient portal and email delivery), under obligations
        to protect it, or when required by law.
      </p>
    </section>
    <section>
      <h2>Security</h2>
      <p>
        We use reasonable administrative, technical, and physical safeguards to protect your information. No method
        of transmission over the internet is completely secure, but we work to protect your data.
      </p>
    </section>
    <section>
      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The effective date above shows when it was last revised.</p>
    </section>
    <section>
      <h2>Questions about privacy</h2>
      <PrivacyContact />
    </section>
  </LegalPage>
);

export default Privacy;
