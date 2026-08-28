import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Hola Paje Progress Plan", () => {
  it("contains the approved five construction-linked payment milestones totalling 100%", () => {
    const homeSource = readFileSync(
      path.resolve(process.cwd(), "client/src/pages/Home.tsx"),
      "utf8",
    );

    const progressPlanSection = homeSource.slice(
      homeSource.indexOf("{/* Option 1 */}"),
      homeSource.indexOf("{/* Option 2 */}"),
    );

    expect(progressPlanSection).toContain("Reservation fee upon signing of the Purchase and Sale Agreement.");
    expect(progressPlanSection).toContain("Upon completion of foundation footings.");
    expect(progressPlanSection).toContain("Upon completion of the roof concrete structure.");
    expect(progressPlanSection).toContain("Upon completion of first-fix electrical and plumbing.");
    expect(progressPlanSection).toContain("Upon completion of the pre-handover inspection.");

    const percentages = [...progressPlanSection.matchAll(/hp-plan-pct">(\d+)%/g)].map(
      ([, value]) => Number(value),
    );

    expect(percentages).toEqual([20, 20, 30, 20, 10]);
    expect(percentages.reduce((total, value) => total + value, 0)).toBe(100);
  });
});
