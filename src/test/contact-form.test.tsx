import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "@/components/forms/ContactForm";
import { company } from "@/data/company";
import { services } from "@/data/services";

describe("services data", () => {
  it("has the 8 official services with unique slugs", () => {
    expect(services).toHaveLength(8);
    expect(new Set(services.map((s) => s.slug)).size).toBe(8);
  });

  it("no longer offers PR & Media Monitoring", () => {
    expect(services.some((s) => s.slug === "pr-media-monitoring")).toBe(false);
  });
});

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("blocks submission until the required fields are filled", () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: /send via whatsapp/i }));

    expect(open).not.toHaveBeenCalled();
    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
  });

  it("opens WhatsApp with the enquiry prefilled", () => {
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);
    render(<ContactForm preSelectedService="media-production" />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Nadia" } });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "We need a brand film for a product launch." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send via whatsapp/i }));

    expect(open).toHaveBeenCalledTimes(1);
    const url = open.mock.calls[0][0] as string;
    expect(url).toContain(`https://wa.me/${company.contact.whatsapp}`);
    expect(decodeURIComponent(url)).toContain("Nadia");
    expect(decodeURIComponent(url)).toContain("Media Production");
    // The visitor still has to press send inside WhatsApp — say so honestly.
    expect(screen.getByText(/press send there/i)).toBeInTheDocument();
  });

  it("offers a fallback link when the popup is blocked", () => {
    vi.spyOn(window, "open").mockReturnValue(null);
    render(<ContactForm preSelectedService="branding" />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Omar" } });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "Looking for a full brand identity." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send via whatsapp/i }));

    expect(screen.getByText(/blocked the new tab/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me"),
    );
  });
});
