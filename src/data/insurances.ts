import aetnaLogo from "@/assets/aetna.jpg.asset.json";
import humanaLogo from "@/assets/humana.png.asset.json";

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
}

export const INSURANCE_BRANDS: Record<string, InsuranceBrand> = {
  "Aetna": { name: "Aetna", short: "aetna", bg: "#FFFFFF", fg: "#7D3F98", logo: aetnaLogo.url },
  "BlueCross BlueShield": { name: "BlueCross BlueShield", short: "BCBS", bg: "#0066B2", fg: "#FFFFFF" },
  "Cigna": { name: "Cigna", short: "Cigna.", bg: "#F58220", fg: "#FFFFFF" },
  "Humana": { name: "Humana", short: "Humana.", bg: "#FFFFFF", fg: "#78BE20", logo: humanaLogo.url },
  "Medicare": { name: "Medicare", short: "MEDICARE", bg: "#003D7A", fg: "#FFFFFF" },
  "UnitedHealthcare": { name: "UnitedHealthcare", short: "UHC", bg: "#002677", fg: "#FFFFFF" },
  "Tricare": { name: "Tricare", short: "TRICARE", bg: "#005EB8", fg: "#FFFFFF" },
  "MultiPlan PHCS": { name: "MultiPlan PHCS", short: "MultiPlan", bg: "#00427A", fg: "#FFFFFF" },
  "Cashpay": { name: "Cashpay", short: "Cash Pay", bg: "#1F2937", fg: "#FFFFFF" },
};
