import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ContactProvider } from "@/contexts/ContactContext";
import Portfolio from "@/pages/Portfolio";
import WorkDetail from "@/pages/WorkDetail";
import { projects, projectsByService, portfolioFilters, nextProject } from "@/data/portfolio";
import { services } from "@/data/services";

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <ContactProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/work/:slug" element={<WorkDetail />} />
          </Routes>
        </MemoryRouter>
      </ContactProvider>
    </HelmetProvider>,
  );

describe("portfolio data", () => {
  it("gives every project a unique slug", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it("only tags projects with real service slugs", () => {
    const valid = new Set(services.map((s) => s.slug));
    for (const project of projects) {
      expect(project.services.length).toBeGreaterThan(0);
      for (const slug of project.services) expect(valid.has(slug)).toBe(true);
    }
  });

  it("offers filters only for services that have work", () => {
    for (const filter of portfolioFilters()) {
      expect(projectsByService(filter.slug).length).toBeGreaterThan(0);
    }
  });

  it("always has a next project to move on to", () => {
    for (const project of projects) {
      expect(nextProject(project.slug).slug).not.toBe(project.slug);
    }
  });
});

describe("Portfolio page", () => {
  it("links each project to its own case study page", () => {
    renderAt("/portfolio");
    const first = projects[0];
    const link = screen.getAllByRole("link", { name: new RegExp(first.title, "i") })[0];
    expect(link).toHaveAttribute("href", `/work/${first.slug}`);
  });

  it("filters the grid by service", async () => {
    renderAt("/portfolio");
    const production = services.find((s) => s.slug === "media-production")!;

    fireEvent.click(screen.getByRole("button", { name: new RegExp(`filter projects by ${production.title}`, "i") }));

    // The filter is applied...
    expect(
      screen.getByRole("button", { name: new RegExp(`filter projects by ${production.title}`, "i") }),
    ).toHaveAttribute("aria-pressed", "true");

    // ...and every project for that service is on screen.
    const shown = projectsByService("media-production");
    for (const project of shown) {
      expect(screen.getAllByRole("link", { name: new RegExp(project.title, "i") }).length).toBeGreaterThan(0);
    }

    // Exclusion is asserted on the data, because framer-motion keeps exiting
    // cards mounted until an animation that never runs in jsdom completes.
    const socialOnly = projects.find((p) => p.services.length === 1 && p.services[0] === "social-media-management")!;
    expect(shown).not.toContain(socialOnly);
  });
});

describe("Work detail page", () => {
  it("shows the client, industry and the services delivered", () => {
    const project = projects[0];
    renderAt(`/work/${project.slug}`);

    expect(screen.getByRole("heading", { level: 1, name: project.title })).toBeInTheDocument();
    expect(screen.getAllByText(project.client).length).toBeGreaterThan(0);
    expect(screen.getByText(project.industry)).toBeInTheDocument();

    for (const slug of project.services) {
      const service = services.find((s) => s.slug === slug)!;
      expect(screen.getAllByRole("link", { name: service.title })[0]).toHaveAttribute("href", `/services/${slug}`);
    }
  });

  it("points at the next project", () => {
    const project = projects[0];
    renderAt(`/work/${project.slug}`);
    const next = nextProject(project.slug);
    const link = screen.getByRole("link", { name: new RegExp(next.title, "i") });
    expect(link).toHaveAttribute("href", `/work/${next.slug}`);
  });

  it("falls back to a placeholder while artwork is missing", () => {
    const project = projects.find((p) => p.cover === null)!;
    renderAt(`/work/${project.slug}`);
    const placeholders = screen.getAllByRole("img", { name: /artwork coming soon/i });
    expect(placeholders.length).toBeGreaterThan(0);
    // No borrowed stock photography stands in for real work.
    expect(within(document.body).queryByRole("img", { name: /unsplash/i })).not.toBeInTheDocument();
  });
});
