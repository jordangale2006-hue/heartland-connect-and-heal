import aetnaLogo from "@/assets/aetna.jpg.asset.json";
import humanaLogo from "@/assets/humana.png.asset.json";
import cignaLogo from "@/assets/cigna.webp.asset.json";
import bcbsLogo from "@/assets/bcbs.webp.asset.json";
import uhcLogo from "@/assets/uhc.png.asset.json";
import tricareLogo from "@/assets/tricare.svg.asset.json";
import medicareLogo from "@/assets/medicare.png.asset.json";
import cashpayLogo from "@/assets/cashpay.webp.asset.json";
import multiplanLogo from "@/assets/multiplan.webp.asset.json";
import curativeLogo from "@/assets/curative.webp.asset.json";
import wellmarkLogo from "@/assets/wellmark.png.asset.json";

export const FEATURED_INSURANCES = [
  "Aetna",
  "BlueCross BlueShield",
  "Cigna",
  "Curative",
  "Humana",
  "Medicare",
  "UnitedHealthcare",
  "Tricare",
  "MultiPlan PHCS",
  "Cashpay",
];

export type ServiceState = "Arizona" | "Iowa";

export const INSURANCES_BY_STATE: Record<ServiceState, string[]> = {
  Arizona: FEATURED_INSURANCES,
  Iowa: ["Wellmark Blue Cross Blue Shield of Iowa (HMO)", "Cashpay"],
};

export const INSURANCE_NOTICES: Record<ServiceState, string> = {
  Arizona: "We do not accept Arizona AHCCCS/Medicaid plans.",
  Iowa: "In Iowa, we currently accept Wellmark Blue Cross Blue Shield of Iowa HMO and cash pay only.",
};

// We accept only the plans listed above.
export const ALL_INSURANCES: string[] = FEATURED_INSURANCES;

// Brand styling for logo cards. Colors approximate each carrier's identity.
// Swap `logo` in with a real image path (or .asset.json url) when available.
export interface InsuranceBrand {
  name: string;
  short: string;
  bg: string;
  fg: string;
  logo?: string;
  logoClass?: string | Partial<Record<"sm" | "md" | "lg", string>>;
}

export const INSURANCE_BRANDS: Record<string, InsuranceBrand> = {
  "Aetna": { name: "Aetna", short: "aetna", bg: "#FFFFFF", fg: "#7D3F98", logo: aetnaLogo.url },
  "BlueCross BlueShield": { name: "BlueCross BlueShield", short: "BCBS", bg: "#FFFFFF", fg: "#0066B2", logo: bcbsLogo.url, logoClass: { sm: "max-h-10", md: "max-h-14", lg: "max-h-24" } },
  "Wellmark Blue Cross Blue Shield of Iowa (HMO)": { name: "Wellmark Blue Cross Blue Shield of Iowa (HMO)", short: "Wellmark BCBS Iowa HMO", bg: "#FFFFFF", fg: "#0066B2", logo: wellmarkLogo.url, logoClass: { sm: "max-h-16", md: "max-h-20", lg: "max-h-24" } },
  "Cigna": { name: "Cigna", short: "Cigna.", bg: "#FFFFFF", fg: "#00A9E0", logo: cignaLogo.url },
  "Curative": { name: "Curative", short: "curative", bg: "#FFFFFF", fg: "#FF6B5B", logo: curativeLogo.url, logoClass: { sm: "max-h-[3.5rem]", md: "max-h-[5rem]", lg: "max-h-24" } },
  "Humana": { name: "Humana", short: "Humana.", bg: "#FFFFFF", fg: "#78BE20", logo: humanaLogo.url },
  "Medicare": { name: "Medicare", short: "MEDICARE", bg: "#FFFFFF", fg: "#003D7A", logo: medicareLogo.url },
  "UnitedHealthcare": { name: "UnitedHealthcare", short: "UHC", bg: "#FFFFFF", fg: "#002677", logo: uhcLogo.url },
  "Tricare": { name: "Tricare", short: "TRICARE", bg: "#FFFFFF", fg: "#023F88", logo: tricareLogo.url },
  "MultiPlan PHCS": { name: "MultiPlan PHCS", short: "MultiPlan", bg: "#FFFFFF", fg: "#00427A", logo: multiplanLogo.url, logoClass: { sm: "max-h-10", md: "max-h-14", lg: "max-h-24" } },
  "Cashpay": { name: "Cashpay", short: "Cash Pay", bg: "#FFFFFF", fg: "#1F2937", logo: cashpayLogo.url },
};
