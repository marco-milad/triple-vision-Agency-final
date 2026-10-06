import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

/**
 * The test environment reports no matching media queries, so these run through
 * the phone layout: one card at a time instead of three stacked.
 */
describe("TestimonialsSection on mobile", () => {
  it("shows a single testimonial instead of stacking them", () => {
    render(<TestimonialsSection />);

    expect(screen.getByText(/Sarah Mitchell/)).toBeInTheDocument();
    expect(screen.queryByText(/James Okonkwo/)).not.toBeInTheDocument();
  });

  it("advances to the next testimonial", () => {
    render(<TestimonialsSection />);

    fireEvent.click(screen.getByRole("button", { name: /next testimonial/i }));

    expect(screen.getByText(/James Okonkwo/)).toBeInTheDocument();
  });

  it("gives the carousel controls accessible names", () => {
    render(<TestimonialsSection />);

    expect(screen.getByRole("button", { name: /previous testimonial/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show testimonial 3/i })).toBeInTheDocument();
  });
});
