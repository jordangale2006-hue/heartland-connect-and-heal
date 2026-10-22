import { describe, expect, it } from "vitest";
import { CONDITIONS } from "@/data/conditions";

describe("current condition provider assignments", () => {
  it.each(CONDITIONS)("assigns $slug to Rebecca Nabosa only", (condition) => {
    expect(condition.treatedBy).toEqual(["rebecca"]);
  });
});