import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ContactProvider } from "@/contexts/ContactContext";
import Portfolio from "@/pages/Portfolio";
import WorkDetail from "@/pages/WorkDetail";
import {
  projects,
  projectsByService,
  projectsByCategory,
  portfolioFilters,
  nextProject,
} from "@/data/portfolio";
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

  it("offers a filter for every official service", () => {
    expect(portfolioFilters().map((f) => f.slug)).toEqual(services.map((s) => s.slug));
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
    // Rendering the whole animated grid twice in jsdom is slow; this is an
    // environment limit, not the page being slow in a browser.
  }, 20000);

  it("offers a way forward for a service whose work is not published yet", () => {
    const empty = services.find((s) => projectsByService(s.slug).length === 0)!;
    renderAt("/portfolio");

    fireEvent.click(screen.getByRole("button", { name: new RegExp(`filter projects by ${empty.title}`, "i") }));

    expect(screen.getByRole("button", { name: /request samples/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /what this service includes/i })).toHaveAttribute(
      "href",
      `/services/${empty.slug}`,
    );
  }, 20000);
});

describe("Work detail page", () => {
  it("shows the default brief and the services delivered", () => {
    const project = projects.find((p) => !p.facts)!;
    renderAt(`/work/${project.slug}`);

    expect(screen.getByRole("heading", { level: 1, name: project.title })).toBeInTheDocument();
    expect(screen.getAllByText(project.client).length).toBeGreaterThan(0);
    expect(screen.getByText(project.industry)).toBeInTheDocument();

    for (const slug of project.services) {
      const service = services.find((s) => s.slug === slug)!;
      expect(screen.getAllByRole("link", { name: service.title })[0]).toHaveAttribute("href", `/services/${slug}`);
    }
  });

  it("shows the four-field brief when a project carries one", () => {
    const project = projects.find((p) => p.facts)!;
    renderAt(`/work/${project.slug}`);

    for (const fact of project.facts!) {
      expect(screen.getByText(fact.label)).toBeInTheDocument();
      expect(screen.getAllByText(fact.value).length).toBeGreaterThan(0);
    }
  });

  it.each(["deck", "scroll", "feed"] as const)(
    "runs a %s campaign edge to edge, cover first and in order",
    (model) => {
      const project = projects.find((p) => p.campaignStyle === model)!;
      expect(project).toBeDefined();
      const { container } = renderAt(`/work/${project.slug}`);

      const artwork = Array.from(container.querySelectorAll('img[src^="/work/"]'));
      expect(artwork.map((img) => img.getAttribute("src"))).toEqual([
        project.cover,
        ...project.gallery.map((image) => image.src),
      ]);
    },
  );

  it("gives every social project one of the three models", () => {
    const social = projects.filter((p) => p.services.includes("social-media-management"));
    expect(social.length).toBeGreaterThan(0);
    for (const project of social) {
      expect(["deck", "scroll", "feed"]).toContain(project.campaignStyle);
    }
  });

  it("sizes every piece of a campaign so nothing shifts as it loads", () => {
    const project = projects.find((p) => p.campaignStyle && p.gallery.length > 0)!;
    const { container } = renderAt(`/work/${project.slug}`);

    // The layout's own logos share the page, so only the artwork is checked.
    const artwork = Array.from(container.querySelectorAll('img[src^="/work/"]'));
    expect(artwork.length).toBeGreaterThan(0);

    for (const img of artwork) {
      expect(img.getAttribute("width")).toBeTruthy();
      expect(img.getAttribute("height")).toBeTruthy();
    }
  });

  it("points at the next project", () => {
    const project = projects[0];
    renderAt(`/work/${project.slug}`);
    const next = nextProject(project.slug);
    const link = screen.getByRole("link", { name: new RegExp(next.title, "i") });
    expect(link).toHaveAttribute("href", `/work/${next.slug}`);
  });

  it("renders the written case study, its figures and the stack", () => {
    const project = projects.find((p) => p.sections?.length)!;
    renderAt(`/work/${project.slug}`);

    for (const section of project.sections!) {
      if (section.title) {
        expect(screen.getByRole("heading", { name: section.title })).toBeInTheDocument();
      }
      for (const paragraph of section.body ?? []) {
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      }
      for (const item of section.items ?? []) {
        expect(screen.getByRole("heading", { name: item.title })).toBeInTheDocument();
      }
    }

    for (const tech of project.stack ?? []) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  }, 20000);

  it("groups a service's work by sub-category", () => {
    const groups = projectsByCategory("web-development");
    expect(groups.length).toBeGreaterThan(1);
    for (const group of groups) {
      expect(group.category).toBeTruthy();
      expect(group.projects.length).toBeGreaterThan(0);
    }
    // Every web project is accounted for exactly once.
    const total = groups.reduce((sum, g) => sum + g.projects.length, 0);
    expect(total).toBe(projectsByService("web-development").length);
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
