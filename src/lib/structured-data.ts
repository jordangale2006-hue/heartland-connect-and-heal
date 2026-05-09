// JSON-LD builders for Heartland Mental Health Services
// All schemas are designed for a 100% virtual psychiatric practice serving Arizona.

export const SITE_URL = "https://www.heartlandmhservices.com";
export const SITE_NAME = "Heartland Mental Health Services";
export const PHONE = "+1-520-595-5709";
export const EMAIL = "heartlandmentalhealthservices@gmail.com";
export const LOGO = `${SITE_URL}/favicon.ico`;
export const DEFAULT_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2ec260e3-f7e5-47e2-b727-e3f711dbccce/id-preview-da594496--3f7a7a80-65eb-466e-a849-db5f444ced04.lovable.app-1778023739556.png";

export const ARIZONA_CITIES = [
  "Phoenix",
  "Tucson",
  "Mesa",
  "Chandler",
  "Scottsdale",
  "Gilbert",
  "Glendale",
  "Tempe",
  "Peoria",
  "Flagstaff",
];

export const ACCEPTED_INSURANCE = [
  "Aetna",
  "BlueCross BlueShield",
  "Cigna",
  "Medicare",
  "UnitedHealthcare",
  "Tricare",
  "MultiPlan PHCS",
  "Cashpay",
];

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
  medicalSpecialty: "Psychiatric",
  description:
    "Virtual psychiatry, medication management and psychotherapy for patients across Arizona. Most major insurance accepted.",
  areaServed: [
    { "@type": "State", name: "Arizona" },
    ...ARIZONA_CITIES.map((c) => ({ "@type": "City", name: `${c}, Arizona` })),
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
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: [],
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
  author: { "@type": "Person", name: a.author || SITE_NAME },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: LOGO },
  },
  datePublished: a.datePublished,
  mainEntityOfPage: a.url,
});
