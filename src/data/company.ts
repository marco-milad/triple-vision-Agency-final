/**
 * Official company facts.
 *
 * SOURCE OF TRUTH: Triple Vision Agency — Company Profile 2026.
 * Do not add or change a fact here unless it comes from the profile or the
 * client confirmed it in writing. Items marked TODO are still unconfirmed.
 */

export interface PhoneNumber {
  /** Human readable, e.g. "+20 109 832 4080" */
  display: string;
  /** E.164 digits only, used for tel: and wa.me links */
  e164: string;
}

const FOUNDED_YEAR = 2015;

/** Years in business, derived so it never goes stale. */
export const yearsInBusiness = (): number => new Date().getFullYear() - FOUNDED_YEAR;

export const company = {
  name: "Triple Vision Agency",
  shortName: "Triple Vision",
  /** Profile p2. The profile itself misspells "Improve" — corrected here. */
  tagline: "Creative Solutions to Improve Your Business!",
  foundedYear: FOUNDED_YEAR,

  /** Profile p3. */
  stats: {
    clients: 250,
    projects: 600,
    industries: 25,
    countries: 6,
    /** Profile p5: "a team of 50+ dynamic and passionate digital professionals". */
    team: 50,
    /** Profile p15: "over 50 activations". */
    eventActivations: 50,
  },

  /** Profile p7. */
  mission:
    "Scaling the heights of the digital world alongside our clients, dedicated to turning their corporate dreams into reality.",
  vision:
    "Providing elite digital media solutions that guarantee maximum ROI with tangible, measurable results.",

  /** Profile p4 and p6. */
  positioning: "A fully integrated digital agency, and the ultimate digital arm for our clients.",
  story: [
    "It all started in 2015 when our founder set out to redefine the media landscape, establishing a fully integrated digital agency.",
    "Our mission is to serve as the ultimate digital arm for our clients, fulfilling their marketing and advertising needs across all channels. We leverage our core strengths in media buying, creative content production, digital art, photography, and high-end video production.",
    "This is driven by a passionate, talented team of marketing experts who push creative boundaries to deliver outstanding executions — all focused on maximizing your ROI.",
  ],

  /** Profile p41. */
  contact: {
    email: "info@triplevisionagency.com",
    phones: [
      { display: "+20 109 832 4080", e164: "+201098324080" },
      { display: "+20 127 003 9093", e164: "+201270039093" },
    ] as PhoneNumber[],
    /**
     * TODO(client): confirm which number receives WhatsApp enquiries.
     * The profile lists both numbers without saying which is WhatsApp; this is
     * the number the current site already uses.
     */
    whatsapp: "201098324080",
    address: {
      street: "Abd Al-Aziz Ismail St",
      area: "Triumph Square, Heliopolis",
      city: "Cairo",
      country: "Egypt",
      /** TODO(client): exact map pin. The current embed points at central Cairo. */
      mapsUrl: null as string | null,
    },
    /** TODO(client): opening hours are not in the profile. */
    openingHours: null as string | null,
  },

  /**
   * Official accounts, supplied by the client on 2026-10-06. Tracking
   * parameters stripped, and the Facebook share link resolved to the page it
   * redirects to.
   *
   * Supported names: Facebook, Instagram, Twitter, LinkedIn, YouTube.
   *
   * TODO(client): the YouTube channel is the founder's personal channel
   * (@dirmariomaged), not an agency channel — confirm it should be linked here.
   */
  socials: [
    { name: "Facebook", url: "https://www.facebook.com/triplevisionagency" },
    { name: "Instagram", url: "https://www.instagram.com/triplevisionagency" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/triple-vision-agency/" },
    { name: "YouTube", url: "https://www.youtube.com/@dirmariomaged" },
  ] as { name: string; url: string }[],

  /**
   * TODO(client): production domain is not decided. Override per environment
   * with VITE_SITE_URL. The company email uses triplevisionagency.com.
   */
  siteUrl: import.meta.env.VITE_SITE_URL ?? "https://triple-vision-cinematics.vercel.app",
} as const;

export const addressLine = `${company.contact.address.street}, ${company.contact.address.area}, ${company.contact.address.city}`;
