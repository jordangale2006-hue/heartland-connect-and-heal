import { ReactNode } from "react";
import SEO from "@/components/SEO";

interface Props {
  title: string;
  seoTitle: string;
  description: string;
  path: string;
  effectiveDate: string;
  children: ReactNode;
}

const LegalPage = ({ title, seoTitle, description, path, effectiveDate, children }: Props) => (
  <main className="section-padding">
    <SEO title={seoTitle} description={description} path={path} />
    <article className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
      <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-3">{title}</h1>
      <p className="text-sm text-muted-foreground mb-10">Effective date: {effectiveDate}</p>
      <div className="space-y-8 text-muted-foreground leading-relaxed [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_p]:mb-3 [&_a]:text-primary [&_a]:underline">
        {children}
      </div>
    </article>
  </main>
);

export const PrivacyContact = () => (
  <p>
    Heartland Mental Health Services — Privacy Officer<br />
    21168 E Ocotillo Rd #1146, Queen Creek, AZ 85142 (mailing address only)<br />
    Phone: <a href="tel:+15205955709">+1 (520) 595-5709</a><br />
    Email: <a href="mailto:infor@heartlandmhservices.com">infor@heartlandmhservices.com</a>
  </p>
);

export default LegalPage;
