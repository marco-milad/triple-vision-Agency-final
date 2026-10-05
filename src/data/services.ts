/**
 * The 8 official services, in the order they appear in the Company Profile 2026
 * (pages 8-17).
 *
 * Copy marked "profile" is taken from the profile. Where the profile only has
 * prose, the existing site copy is kept and flagged TODO(client) so it can be
 * confirmed or replaced.
 *
 * NOTE: "PR & Media Monitoring" used to be listed on the site but is NOT in the
 * profile. It is intentionally absent; /services/pr-media-monitoring redirects.
 */

import {
  Palette,
  Share2,
  Camera,
  Megaphone,
  Video,
  Calendar,
  Printer,
  Code,
  type LucideIcon,
} from "lucide-react";

export interface ServiceOffering {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  /** One line used under the title on the detail page. */
  tagline: string;
  /** Short line used on cards. */
  summary: string;
  /** Longer paragraph used on the detail page hero. */
  description: string;
  icon: LucideIcon;
  /** Tailwind gradient classes — keep literal so Tailwind picks them up. */
  color: string;
  /** Bullets shown on the services grid. */
  features: string[];
  offerings: ServiceOffering[];
  process: ServiceProcessStep[];
}

export const services: Service[] = [
  {
    slug: "branding",
    title: "Branding",
    tagline: "Clarity is the foundation of every strong identity.",
    summary: "Brand identities that present your business in its finest, most compelling light.",
    // profile p9
    description:
      "When it comes to branding, clarity is the foundation of every strong identity. We continuously refine our craft and tools to ensure your brand is presented in its finest, most compelling light.",
    icon: Palette,
    color: "from-green-500 to-emerald-500",
    // TODO(client): confirm the branding deliverables list — the profile has prose only.
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Collateral"],
    offerings: [],
    process: [],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    tagline: "Strategic content that builds communities.",
    summary: "Brand analysis, strategy, content and art direction that grow your audience.",
    // profile p10-p11
    description:
      "We build your presence from the ground up: analysing your brand and competitors, setting the strategy, then producing the content, copy and art direction that consistently delivers results for our partners.",
    icon: Share2,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Brand & Competitive Analysis",
      "Social Media Strategy",
      "Content Creation",
      "Creative Copywriting",
      "Art Direction",
    ],
    offerings: [
      {
        title: "Brand & Competitive Analysis",
        description:
          "In branding, clarity is everything when creating or developing an identity. We sharpen our tools to deliver the most impactful image any brand could achieve.",
      },
      {
        title: "Social Media Strategy",
        description:
          "Good planning is the foundation of consistent success. Whatever the challenge, we have the strategic blueprint to guide you forward.",
      },
      {
        title: "Content Creation",
        description:
          "Uncovering the best creative ideas and aligning them with your strategic objectives — a daily commitment that delivers results for our partners.",
      },
      {
        title: "Creative Copywriting",
        description:
          "Great content connects; outstanding content resonates. Words are our passion, and your audience will adore what we write for your brand.",
      },
      {
        title: "Art Direction",
        description:
          "You've heard the promises before. At Triple Vision we turn what you can imagine into something real for your brand.",
      },
    ],
    process: [],
  },
  {
    slug: "photography",
    title: "Photography",
    tagline: "See the depth, not just the surface.",
    summary: "Photography that shows the depth of your brand values and keeps audiences captivated.",
    // profile p12
    description:
      "Photography helps people see not only the surface, but the profound depth of your brand values. At Triple Vision, we decode the digital landscape to ensure your brand stands out and keeps your audience captivated.",
    icon: Camera,
    color: "from-pink-500 to-rose-500",
    // TODO(client): which photography packages to list (product, corporate, events...).
    features: [],
    offerings: [],
    process: [],
  },
  {
    slug: "media-buying",
    title: "Media Buying",
    tagline: "It's all about numbers.",
    summary: "Data-driven campaigns built to generate measurable ROI.",
    // profile p13
    description:
      "Driven by data, we deliver performance-focused outcomes that generate measurable ROI, directly boosting our clients' profitability. The ultimate strategy to dominate the market lies in combining data, technology and expertise — tailored to craft a seamless journey for your audience.",
    icon: Megaphone,
    color: "from-amber-500 to-orange-500",
    features: ["Data-Driven Planning", "Performance Campaigns", "Measurable ROI", "Audience Targeting"],
    offerings: [],
    process: [],
  },
  {
    slug: "media-production",
    title: "Media Production",
    tagline: "Make them see the world the way you do.",
    summary: "From snackable social videos to large-scale TV and radio commercials.",
    // profile p14
    description:
      "From snackable social media videos to large-scale TV and radio commercials, we blend photography, videography and sound design using next-gen tools and distinctive artistic viewpoints. The result is compelling communication that inspires, persuades and converts.",
    icon: Video,
    color: "from-orange-500 to-red-500",
    features: ["TV & Radio Commercials", "Social Media Videos", "Videography", "Sound Design"],
    offerings: [
      {
        title: "TV & Radio Commercials",
        description: "Large-scale commercial production for broadcast.",
      },
      {
        title: "Social Media Videos",
        description: "Short-form video built for the way people watch on social platforms.",
      },
      {
        title: "Corporate Films",
        description: "Company profiles and brand films that tell your story.",
      },
      {
        title: "Videography & Photography",
        description: "Full production crews, equipment and direction.",
      },
      {
        title: "Sound Design",
        description: "Audio that carries the message as strongly as the picture.",
      },
    ],
    process: [],
  },
  {
    slug: "event-management",
    title: "Event Management",
    tagline: "Each event is a whole new story.",
    summary: "Activations, launches, grand openings and conferences, end to end.",
    // profile p15
    description:
      "We are frequently recognized as one of the most active and effective event planning and management providers in Egypt. Having successfully conducted over 50 activations, product launches, grand openings, conferences and entertainment promotions, we're ready for any challenge — no matter the scale or type of your envisioned event.",
    icon: Calendar,
    color: "from-purple-500 to-pink-500",
    features: ["Activations", "Product Launches", "Grand Openings", "Conferences", "Entertainment Promotions"],
    offerings: [],
    process: [],
  },
  {
    slug: "print-manufacture",
    title: "Print & Manufacture",
    tagline: "Superior print quality, in Egypt and abroad.",
    summary: "Collateral, packaging, signage and event props through a trusted production network.",
    // profile p16
    description:
      "We leverage strategic partnerships with a refined network of reliable print houses and manufacturers both in Egypt and abroad. From booklets, collaterals, stationery and packaging to ATL and BTL materials, we deliver superior print quality — plus a proven track record in high-end interior decoration, signage, event accessories and multipurpose props and assemblies.",
    icon: Printer,
    color: "from-teal-500 to-cyan-500",
    features: [
      "Booklets & Collaterals",
      "Stationery",
      "Packaging",
      "ATL & BTL Materials",
      "Signage & Interior Decoration",
      "Event Accessories & Props",
    ],
    offerings: [],
    process: [],
  },
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Digital experiences that perform and convert.",
    summary: "Premium, fully responsive websites that are fast, findable and built to convert.",
    // profile p17
    description:
      "A website is more than just your digital address — it's your most powerful sales and branding tool. We design and develop premium, fully responsive websites that combine striking visual aesthetics with flawless functionality. From optimized code and fast loading speeds to built-in SEO and user-centric UX/UI, we build secure, scalable digital experiences that convert visitors into loyal clients.",
    icon: Code,
    color: "from-indigo-500 to-violet-500",
    features: ["Custom Websites", "UI/UX Design", "Performance & SEO", "Secure & Scalable Builds"],
    offerings: [],
    process: [],
  },
];

export const getServiceBySlug = (slug: string | undefined): Service | undefined =>
  services.find((service) => service.slug === slug);

/**
 * Old slugs kept so links already published keep working.
 * Mirrored by permanent redirects in vercel.json.
 */
export const legacyServiceRedirects: Record<string, string> = {
  "graphics-branding": "/services/branding",
  "digital-media": "/services/social-media-management",
  "event-planning": "/services/event-management",
  "pr-media-monitoring": "/services",
  "pr-media": "/services",
};
