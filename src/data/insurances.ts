import aetnaLogo from "@/assets/aetna.jpg.asset.json";
import humanaLogo from "@/assets/humana.png.asset.json";
import cignaLogo from "@/assets/cigna.webp.asset.json";
import bcbsLogo from "@/assets/bcbs.webp.asset.json";
import uhcLogo from "@/assets/uhc.png.asset.json";
import tricareLogo from "@/assets/tricare.svg.asset.json";
import medicareLogo from "@/assets/medicare.png.asset.json";
import cashpayLogo from "@/assets/cashpay.webp.asset.json";
import multiplanLogo from "@/assets/multiplan.webp.asset.json";

export const FEATURED_INSURANCES = [
  "Aetna",
  "BlueCross BlueShield",
  "Cigna",
  "Humana",
  "Medicare",
  "UnitedHealthcare",
  "Tricare",
  "MultiPlan PHCS",
  "Cashpay",
];

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
  logoClass?: string;
}

export const INSURANCE_BRANDS: Record<string, InsuranceBrand> = {
  "Aetna": { name: "Aetna", short: "aetna", bg: "#FFFFFF", fg: "#7D3F98", logo: aetnaLogo.url },
  "BlueCross BlueShield": { name: "BlueCross BlueShield", short: "BCBS", bg: "#FFFFFF", fg: "#0066B2", logo: bcbsLogo.url },
  "Cigna": { name: "Cigna", short: "Cigna.", bg: "#FFFFFF", fg: "#00A9E0", logo: cignaLogo.url },
  "Humana": { name: "Humana", short: "Humana.", bg: "#FFFFFF", fg: "#78BE20", logo: humanaLogo.url },
  "Medicare": { name: "Medicare", short: "MEDICARE", bg: "#FFFFFF", fg: "#003D7A", logo: medicareLogo.url },
  "UnitedHealthcare": { name: "UnitedHealthcare", short: "UHC", bg: "#FFFFFF", fg: "#002677", logo: uhcLogo.url },
  "Tricare": { name: "Tricare", short: "TRICARE", bg: "#FFFFFF", fg: "#023F88", logo: tricareLogo.url },
  "MultiPlan PHCS": { name: "MultiPlan PHCS", short: "MultiPlan", bg: "#FFFFFF", fg: "#00427A", logo: multiplanLogo.url, logoClass: "max-h-[4.5rem]" },
  "Cashpay": { name: "Cashpay", short: "Cash Pay", bg: "#FFFFFF", fg: "#1F2937", logo: cashpayLogo.url },
};
