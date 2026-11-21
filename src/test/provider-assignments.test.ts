import { describe, expect, it } from "vitest";
import { CONDITIONS } from "@/data/conditions";

const ANGELA_CONDITIONS = ["adhd", "anxiety", "depression", "bipolar-disorder"];

describe("current condition provider assignments", () => {
  it.each(CONDITIONS)("assigns $slug to Rebecca Nabosa", (condition) => {
    expect(condition.treatedBy).toContain("rebecca");
  });

  it.each(ANGELA_CONDITIONS)("assigns %s to Angela Woodman as well", (slug) => {
    const condition = CONDITIONS.find((c) => c.slug === slug);
    expect(condition?.treatedBy).toEqual(["rebecca", "angela"]);
  });

  it("assigns no other conditions to Angela Woodman", () => {
    const others = CONDITIONS.filter((c) => !ANGELA_CONDITIONS.includes(c.slug));
    for (const condition of others) {
      expect(condition.treatedBy).toEqual(["rebecca"]);
    }
  });
});
