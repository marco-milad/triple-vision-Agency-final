import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "@/components/ui/button";

/**
 * A call to action like "Get a Free Consultation" is wider than the card that
 * holds it at phone width. These guard the three properties that keep it inside
 * that card, because the failure is invisible until someone opens the site on a
 * phone.
 */
describe("Button sizing on small screens", () => {
  it("never lets a button grow past its container", () => {
    render(<Button>Anything</Button>);
    expect(screen.getByRole("button").className).toContain("max-w-full");
  });

  it.each(["lg", "xl"] as const)("lets a %s label wrap before the sm breakpoint", (size) => {
    const classes = buttonVariants({ size });

    // Wrapping at phone width, nowrap once there is room for it.
    expect(classes).toContain("whitespace-normal");
    expect(classes).toContain("sm:whitespace-nowrap");

    // A fixed height would clip the second line, so the height is a minimum
    // until the label is back on one line.
    expect(classes).toMatch(/min-h-\d+/);
    expect(classes).toMatch(/sm:h-\d+/);
  });

  it("lets the content shrink so the text can wrap inside the button", () => {
    // Without this a flex child refuses to go below its max-content width and
    // the label runs off the side instead of wrapping.
    expect(buttonVariants({})).toContain("[&>*]:min-w-0");
  });
});
