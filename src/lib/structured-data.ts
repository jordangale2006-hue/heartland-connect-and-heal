// JSON-LD builders for Heartland Mental Health Services
// All schemas are designed for a 100% virtual psychiatric practice serving Arizona and Iowa.
import { INSURANCES_BY_STATE } from "@/data/insurances";

export const SITE_URL = "https://heartlandmhservices.com";
export const SITE_NAME = "Heartland Mental Health Services";
export const PHONE = "+1-520-595-5709";
export const EMAIL = "infor@heartlandmhservices.com";
export const LOGO = `${SITE_URL}/heartland-social-logo.png`;
export const DEFAULT_OG_IMAGE = LOGO;

export const ACCEPTED_INSURANCE = [...new Set(Object.values(INSURANCES_BY_STATE).flat())];

export const medicalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO,
  image: DEFAULT_OG_IMAGE,
  telephone: PHONE,
  email: EMAIL,
  priceRange: "$$",
  medicalSpecialty: "Psychiatry",
  description:
    "Virtual psychiatry, medication management and psychotherapy for patients across Arizona and Iowa. Insurance options vary by state.",
  areaServed: [
    { "@type": "State", name: "Arizona" },
    { "@type": "State", name: "Iowa" },
  ],
  availableService: [
    "Psychiatric Evaluation",
    "Medication Management",
    "Psychotherapy",
    "ADHD Treatment",
    "Anxiety Treatment",
    "Depression Treatment",
    "Bipolar Disorder Treatment",
    "PTSD Treatment",
    "OCD Treatment",
  ].map((s) => ({ "@type": "MedicalTherapy", name: s })),
  paymentAccepted: ACCEPTED_INSURANCE.join(", "),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/HeartlandMentalHealthServices",
    "https://www.instagram.com/Heartlandmhservices",
    "https://www.linkedin.com/company/heart-land-mental-health-services/",
  ],
});

export const faqPageSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

export const articleSchema = (a: {
  title: string;
  description?: string;
  image?: string;
  author?: string;
  datePublished?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  image: a.image || DEFAULT_OG_IMAGE,
  author: { "@type": "Organization", name: a.author || SITE_NAME },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: LOGO },
  },
  datePublished: a.datePublished,
  mainEntityOfPage: a.url,
});
