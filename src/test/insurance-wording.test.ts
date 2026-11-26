import { describe, expect, it } from "vitest";
import { INSURANCES_BY_STATE, planStatusMessage, isSelfPay } from "@/data/insurances";

describe("insurance checker wording", () => {
  it("describes a listed carrier as contracted, per state", () => {
    expect(planStatusMessage("Aetna", "Arizona")).toBe("HMHS is contracted with Aetna in Arizona.");
    expect(planStatusMessage("Medicare", "Iowa")).toBe("HMHS is contracted with Medicare in Iowa.");
  });

  it("never describes self-pay as a contracted insurer", () => {
    expect(planStatusMessage("Cashpay", "Arizona")).toBe("Self-pay is available in Arizona.");
    expect(planStatusMessage("Cashpay", "Iowa")).toBe("Self-pay is available in Iowa.");
  });

  it("keeps every plan listed for each state", () => {
    expect(INSURANCES_BY_STATE.Arizona).toEqual([
      "Aetna", "BlueCross BlueShield", "Cigna", "Curative", "Humana",
      "Medicare", "UnitedHealthcare", "Tricare", "MultiPlan PHCS", "Cashpay",
    ]);
    expect(INSURANCES_BY_STATE.Iowa).toEqual([
      "Wellmark Blue Cross Blue Shield of Iowa", "Medicare", "Aetna", "Cigna", "Cashpay",
    ]);
    expect(INSURANCES_BY_STATE.Iowa.filter(isSelfPay)).toEqual(["Cashpay"]);
  });
});
