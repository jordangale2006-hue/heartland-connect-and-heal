import LegalPage, { PrivacyContact } from "@/components/LegalPage";

const HipaaNotice = () => (
  <LegalPage
    title="HIPAA Notice of Privacy Practices"
    seoTitle="HIPAA Notice of Privacy Practices | Heartland"
    description="Heartland Mental Health Services' Notice of Privacy Practices: how your health information may be used and disclosed, and your rights under HIPAA."
    path="/hipaa-notice"
    effectiveDate="October 5, 2026"
  >
    <section>
      <p className="font-semibold text-foreground">
        This notice describes how medical information about you may be used and disclosed and how you can get access
        to this information. Please review it carefully.
      </p>
      <p>
        Heartland Mental Health Services will provide a copy of this notice to every patient, and you may request a
        paper or electronic copy at any time, even if you agreed to receive it electronically.
      </p>
    </section>

    <section>
      <h2>Your rights</h2>
      <p>When it comes to your health information, you have certain rights.</p>
      <h3>Get a copy of your health and claims records</h3>
      <p>You can ask to see or get an electronic or paper copy of your health records. We will usually provide a copy or summary within 30 days of your request and may charge a reasonable, cost-based fee.</p>
      <h3>Ask us to correct (amend) your records</h3>
      <p>You can ask us to correct health information you think is incorrect or incomplete. We may say "no," but we will tell you why in writing within 60 days.</p>
      <h3>Request confidential communications</h3>
      <p>You can ask us to contact you in a specific way (for example, a particular phone or email) or to send mail to a different address. We will say "yes" to all reasonable requests.</p>
      <h3>Ask us to limit (restrict) what we use or share</h3>
      <p>You can ask us not to use or share certain health information for treatment, payment, or operations. We are not required to agree, and may say "no" if it would affect your care. If you pay for a service out-of-pocket in full, you can ask us not to share that information with your health insurer, and we will say "yes" unless the law requires us to share it.</p>
      <h3>Get a list of those with whom we've shared information (accounting of disclosures)</h3>
      <p>You can ask for a list of the times we've shared your health information for six years prior to the date you ask, who we shared it with, and why. This excludes disclosures for treatment, payment, health care operations, and certain others. We provide one accounting a year for free.</p>
      <h3>Get a copy of this notice</h3>
      <p>You can ask for a paper copy of this notice at any time.</p>
      <h3>Choose someone to act for you</h3>
      <p>If you have given someone medical power of attorney or someone is your legal guardian, that person can exercise your rights and make choices about your health information.</p>
    </section>

    <section>
      <h2>Your choices</h2>
      <p>For certain health information, you can tell us your choices about what we share, such as sharing with family or close friends involved in your care, or in a disaster relief situation. If you are not able to tell us your preference (for example, if you are unconscious), we may share your information if we believe it is in your best interest, or when needed to lessen a serious and imminent threat to health or safety.</p>
      <p>We never share your information for marketing purposes or sell your information unless you give us written permission. Psychotherapy notes are shared only with your written authorization, except as permitted by law.</p>
    </section>

    <section>
      <h2>Our uses and disclosures</h2>
      <h3>Treat you</h3>
      <p>We can use your health information and share it with other professionals who are treating you, such as your primary care provider or pharmacy.</p>
      <h3>Run our organization</h3>
      <p>We can use and share your health information to run our practice, improve your care, and contact you when necessary.</p>
      <h3>Bill for your services</h3>
      <p>We can use and share your health information to bill and get payment from health plans or other entities.</p>
      <h3>Other permitted or required uses</h3>
      <ul>
        <li>Helping with public health and safety issues, such as reporting suspected abuse, neglect, or domestic violence, or preventing a serious threat to anyone's health or safety.</li>
        <li>Doing research, under conditions required by law.</li>
        <li>Complying with the law, including sharing with the Department of Health and Human Services.</li>
        <li>Responding to organ and tissue donation requests and working with a medical examiner or funeral director.</li>
        <li>Addressing workers' compensation, law enforcement, and other government requests.</li>
        <li>Responding to lawsuits and legal actions, such as a court or administrative order or subpoena.</li>
      </ul>
    </section>

    <section>
      <h2>Our responsibilities</h2>
      <ul>
        <li>We are required by law to maintain the privacy and security of your protected health information.</li>
        <li>We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information.</li>
        <li>We must follow the duties and privacy practices described in this notice and give you a copy of it.</li>
        <li>We will not use or share your information other than as described here unless you tell us we can in writing. You may change your mind at any time by letting us know in writing.</li>
      </ul>
      <p>We can change the terms of this notice, and the changes will apply to all information we have about you. The new notice will be available on request and on this website.</p>
    </section>

    <section>
      <h2>How to file a complaint</h2>
      <p>If you believe your privacy rights have been violated, you can complain to us using the contact information below.</p>
      <p>
        You can also file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights by
        sending a letter to 200 Independence Avenue, S.W., Washington, D.C. 20201, calling 1-877-696-6775, or visiting{" "}
        <a href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/" target="_blank" rel="noopener noreferrer">hhs.gov/ocr/privacy/hipaa/complaints</a>.
      </p>
      <p>We will not retaliate against you for filing a complaint.</p>
    </section>

    <section>
      <h2>Contact our Privacy Officer</h2>
      <PrivacyContact />
    </section>
  </LegalPage>
);

export default HipaaNotice;
