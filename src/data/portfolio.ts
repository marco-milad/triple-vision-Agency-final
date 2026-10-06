/**
 * Portfolio.
 *
 * The clients and the services delivered for them are real: both come from the
 * Company Profile 2026 (pages 21-40).
 *
 * The web development projects carry their real screenshots, copy and links.
 *
 * TODO(client): for the remaining work the imagery and one-line summaries are
 * placeholders so the layout can be reviewed. Replace `cover` and `gallery` with the original
 * artwork, `video` with the real links, and approve the copy. Until an image
 * is supplied the UI renders a branded placeholder block rather than borrowed
 * stock photography.
 */

import { services } from './services';

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  /** Service slugs this work belongs to — drives the filters and service pages. */
  services: string[];
  industry: string;
  summary: string;
  /** null until the real artwork arrives. */
  cover: string | null;
  /** Written alt text for the cover, where we have it. */
  coverAlt?: string;
  gallery: GalleryImage[];
  video: string | null;
  year?: string;
  /** Public URL, when the work is live and may be linked. */
  liveUrl?: string | null;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'dr-bishoy-ghabrial-clinic',
    title: 'Eye Clinic Campaigns',
    client: 'Dr. Bishoy Ghabrial Clinic',
    services: ['social-media-management', 'media-production', 'print-manufacture'],
    industry: 'Healthcare',
    summary: 'Social campaigns, a brand film and printed collateral for the eye clinic.',
    cover: null,
    gallery: [],
    video: null,
    featured: true,
  },
  {
    slug: 'cairo-scan',
    title: 'Cairo Scan Awareness Campaigns',
    client: 'Cairo Scan Specialized Clinics',
    services: ['social-media-management'],
    industry: 'Healthcare',
    summary: 'Health awareness content and art direction across social platforms.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'technoscan',
    title: 'Technoscan Social Content',
    client: 'Technoscan Specialized Clinics',
    services: ['social-media-management'],
    industry: 'Healthcare',
    summary: 'Campaign concepts and content production for the clinics group.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'solve-clinic',
    title: 'SOLVE Dental & Laser',
    client: 'SOLVE',
    services: ['social-media-management'],
    industry: 'Healthcare',
    summary: 'Bilingual campaign creative for the dental and laser clinic.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'dr-bichoy-magdi',
    title: 'Dental Clinic Content Series',
    client: 'Dr. Bichoy Magdi Dental Clinic',
    services: ['social-media-management'],
    industry: 'Healthcare',
    summary: 'A 3D character-led content series for the dental clinic.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'diet-care',
    title: 'Diet Care Campaigns',
    client: 'Diet Care',
    services: ['social-media-management'],
    industry: 'Healthcare',
    summary: 'Nutrition campaign creative and art direction.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'dr-fady-fawzy',
    title: 'Physiotherapy Awareness Campaign',
    client: 'Dr. Fady Fawzy Ebied',
    services: ['social-media-management'],
    industry: 'Healthcare',
    summary: 'Everyday-pain storytelling for the physiotherapy and chiropractic practice.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'pax-dental-house',
    title: 'PAX Dental House',
    client: 'PAX Dental House',
    services: ['social-media-management'],
    industry: 'Healthcare',
    summary: 'Social identity and campaign content for the dental house.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'neurology-clinic',
    title: 'Neurology & Psychiatry Clinic',
    // TODO(client): confirm the clinic's registered name.
    client: 'Neurology & Psychiatry Clinic, Kafr El-Sheikh',
    services: ['social-media-management'],
    industry: 'Healthcare',
    summary: 'Awareness campaign built around sleep, focus and everyday symptoms.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'one-stop-gresco',
    title: 'One Stop Tyre Campaigns',
    client: 'One Stop by Gresco',
    services: ['social-media-management'],
    industry: 'Automotive',
    summary: 'Campaign creative for Kumho Tire and TBB Tires retail.',
    cover: null,
    gallery: [],
    video: null,
    featured: true,
  },
  {
    slug: 'global-auto-parts',
    title: 'Global Auto Parts Store',
    client: 'Global Auto Parts Store',
    services: ['social-media-management'],
    industry: 'Automotive',
    summary: 'Product and offer campaigns for the auto parts retailer.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'mohamed-fouda-law',
    title: 'Counselor Mohamed Fouda',
    client: 'Mohamed Fouda Law & Legal Consultations',
    services: ['social-media-management'],
    industry: 'Legal',
    summary: 'Cinematic social content positioning the practice.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'nourish-cosmetics',
    title: 'Nourish Cosmetics',
    client: 'Nourish Cosmetics',
    services: ['social-media-management'],
    industry: 'Beauty',
    summary: 'Product campaign creative for the cosmetics range.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'tbg-train-brain-to-gain',
    title: 'Train Brain To Gain',
    client: 'TBG — Train Brain To Gain',
    services: ['social-media-management'],
    industry: 'Education',
    summary: 'Campaign creative for the children\'s learning programme.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'inshaa-engineering',
    title: 'Inshaa Engineering Industries',
    client: 'Insha Engineering Industries',
    services: ['media-production'],
    industry: 'Industrial',
    summary: 'Corporate film shot across the production facilities.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'new-administrative-capital-tvc',
    title: 'New Administrative Capital TVC',
    client: 'New Administrative Capital',
    services: ['media-production'],
    industry: 'Real Estate',
    summary: 'A television commercial produced for the New Capital.',
    cover: null,
    gallery: [],
    video: null,
    featured: true,
  },
  {
    slug: 'banat-el-malek-film',
    title: 'Banat El Malek',
    client: 'Banat El Malek',
    services: ['media-production'],
    industry: 'Film',
    summary: 'Cinematography and post production for the film.',
    cover: null,
    gallery: [],
    video: null,
  },
  {
    slug: 'mm-bags',
    title: 'M.M Bags',
    client: 'M.M Bags',
    services: ['web-development'],
    industry: 'Retail & E-commerce',
    year: '2026',
    summary: 'A bilingual storefront and the operations system behind it — inventory, POS, suppliers, purchase orders, returns and reporting — built for a luggage retailer selling in Egypt.',
    liveUrl: null,
    cover: '/work/mm-bags/storefront-ar.webp',
    coverAlt: 'M.M Bags storefront home page in Arabic, right-to-left, with a navy hero and the headline \'travel smart, travel in style\'',
    gallery: [
      { src: '/work/mm-bags/admin-pos.webp', alt: 'Point of sale screen in Arabic with a payment panel on one side and a searchable product grid on the other' },
      { src: '/work/mm-bags/admin-products.webp', alt: 'Products admin in Arabic listing items with thumbnails, prices, stock levels and active toggles' },
      { src: '/work/mm-bags/admin-search.webp', alt: 'Analytics screen in Arabic showing search counts, a zero-result percentage, and tables of terms customers searched for with and without results' },
      { src: '/work/mm-bags/storefront-en.webp', alt: 'English storefront home page, left-to-right, with the headline \'travel smart, travel in style\'' },
      { src: '/work/mm-bags/mobile-menu.webp', alt: 'Mobile navigation sheet in Arabic showing collections with product counts and account links' },
      { src: '/work/mm-bags/m-catalog.webp', alt: 'Catalogue on a phone in Arabic, two products per row with prices' },
      { src: '/work/mm-bags/categories.webp', alt: 'Collections landing page in Arabic with a dark hero and category cards' },
    ],
    video: null,
    featured: true,
  },
  {
    slug: 'gold-jewelry-erp',
    title: 'Mogohrat Al-Gabaly',
    client: 'Mogohrat Al-Gabaly',
    services: ['web-development'],
    industry: 'Jewelry Retail',
    year: '2026',
    summary: 'A full operations system for a gold shop: daily karat pricing, serialized per-piece inventory, a point of sale that prices live, wholesale credit ledgers, buy-back of old gold, and Arabic documents that print correctly.',
    liveUrl: 'https://mogohrat-lotfy.vercel.app',
    cover: '/work/gold-jewelry-erp/prices.webp',
    coverAlt: 'Daily gold pricing screen in Arabic showing buy and sell prices per gram for karats 24, 22, 21, 18 and 14, with the update form below',
    gallery: [
      { src: '/work/gold-jewelry-erp/sale-receipt.webp', alt: 'Sale detail screen in Arabic showing invoice lines, totals and a return action' },
      { src: '/work/gold-jewelry-erp/buyback.webp', alt: 'Buy-back screen in Arabic with a purchase form and cards showing the scrap pool held per karat' },
      { src: '/work/gold-jewelry-erp/wholesale.webp', alt: 'Wholesale customer list in Arabic showing amounts withdrawn, paid and still owed per trader' },
      { src: '/work/gold-jewelry-erp/suppliers.webp', alt: 'Supplier ledger in Arabic showing totals purchased, paid and still owed' },
      { src: '/work/gold-jewelry-erp/coins.webp', alt: 'Gold coin pricing screen in Arabic listing coin types with their karat, weight and price' },
      { src: '/work/gold-jewelry-erp/activity.webp', alt: 'Audit log in Arabic listing operations with the user, action type and timestamp' },
      { src: '/work/gold-jewelry-erp/statement.webp', alt: 'Printable Arabic account statement showing the shop name, customer, a dated ledger with debit, credit and running balance columns, a closing balance and two signature lines' },
      { src: '/work/gold-jewelry-erp/reports.webp', alt: 'Daily closing report in Arabic with headline figures, cash drawer reconciliation, payment method breakdown and the day\'s sales' },
      { src: '/work/gold-jewelry-erp/m-receiving.webp', alt: 'Receiving screen on a phone, where the wide desktop entry grid becomes one labelled card per piece' },
      { src: '/work/gold-jewelry-erp/m-pos.webp', alt: 'Point of sale on a phone in Arabic, with search, cart, payment method and totals stacked vertically' },
      { src: '/work/gold-jewelry-erp/m-buyback.webp', alt: 'Buy-back on a phone in Arabic, with the purchase lines and the scrap pool per karat as stacked cards' },
      { src: '/work/gold-jewelry-erp/designs.webp', alt: 'Categories and designs screen in Arabic with default making charges per design' },
    ],
    video: null,
  },
  {
    slug: 'ray-lab',
    title: 'Ray Lab Group',
    client: 'Ray Lab Group',
    services: ['web-development'],
    industry: 'Healthcare',
    year: '2026',
    summary: 'A corporate platform for a multinational diagnostic healthcare group: eight brands across three countries, an investor section with its own data, and an interactive map of the branch network — shipped without a server.',
    liveUrl: 'https://raylab.health',
    cover: '/work/ray-lab/network-hero.webp',
    coverAlt: 'Ray Lab Group network page headed \'Diagnostic coverage across MENA\', with cards showing 78+ branches, 3 countries and 6 brands',
    gallery: [
      { src: '/work/ray-lab/brands.webp', alt: 'Directory grid of eight healthcare brand cards, each with a coloured top border, logo, country, branch count and founding year' },
      { src: '/work/ray-lab/physicians.webp', alt: 'Physicians section showing a four-step referral flow: refer, match, report, deliver' },
      { src: '/work/ray-lab/investors.webp', alt: 'Investor relations landing section with headline statistics and a row of tabs' },
      { src: '/work/ray-lab/roadmap.webp', alt: 'Expansion roadmap timeline showing staged growth milestones with status markers' },
      { src: '/work/ray-lab/partners.webp', alt: 'Technology partners section listing major diagnostic equipment manufacturers' },
      { src: '/work/ray-lab/financials.webp', alt: 'Investor performance cards showing operating revenue, annual exams, lab tests and new branches' },
      { src: '/work/ray-lab/map.webp', alt: 'Interactive map of Egypt with clustered teal branch markers and a row of brand filter tabs above it' },
      { src: '/work/ray-lab/reach.webp', alt: 'Network summary cards showing 78+ branches, 6 brands, 3 operating markets and 1.6M+ annual exams' },
      { src: '/work/ray-lab/m-home.webp', alt: 'Ray Lab Group home page on a phone, with the group headline and audience entry points' },
      { src: '/work/ray-lab/m-physicians.webp', alt: 'Physician referral steps on a phone, stacked as individual cards' },
      { src: '/work/ray-lab/m-partners.webp', alt: 'Technology partner cards stacked on a phone' },
    ],
    video: null,
    featured: true,
  },
  {
    slug: 'ojos-studio',
    title: 'OJOS Studio',
    client: 'OJOS Studio',
    services: ['web-development'],
    industry: 'Photography Studio',
    year: '2026',
    summary: 'A media-heavy studio site where the imagery is the product: a Cloudinary-driven image pipeline, one route serving four different media experiences, and booking that works without a backend.',
    liveUrl: null,
    cover: '/work/ojos-studio/home.webp',
    coverAlt: 'OJOS Studio home page with the headline \'It\'s more than a photo. It\'s art.\' beside a bridal portrait',
    gallery: [
      { src: '/work/ojos-studio/portraits.webp', alt: 'Portraits category page with a header and a row of portrait thumbnails' },
      { src: '/work/ojos-studio/film.webp', alt: 'Cinematic Film category page with a headline and a video player card' },
      { src: '/work/ojos-studio/events.webp', alt: 'Events category page showing a header image and a grid of event photographs' },
      { src: '/work/ojos-studio/casual.webp', alt: 'Casual category page with a black-and-white header image and a grid of photographs' },
      { src: '/work/ojos-studio/m-home.webp', alt: 'OJOS Studio home page on a phone, with the studio name, a bridal portrait and the booking call to action' },
    ],
    video: null,
  },
  {
    slug: 'brandkey',
    title: 'Brand Key Advertising',
    client: 'Brand Key Advertising',
    services: ['web-development'],
    industry: 'Signage & Printing',
    year: '2026',
    summary: 'A bilingual, Arabic-first site for a Saudi signage company, built entirely from the company\'s own un-captioned photo archive — where the hard part was deciding what could honestly be said about each photograph.',
    liveUrl: null,
    cover: '/work/brandkey/home-ar.webp',
    coverAlt: 'Brand Key home page in Arabic, right-to-left, over a night photograph of an illuminated glass bank facade in Jeddah',
    gallery: [
      { src: '/work/brandkey/work.webp', alt: 'The work page in Arabic, showing category filters and a grid of project cards with badges reading plus two, plus four and plus nine extra frames' },
      { src: '/work/brandkey/home-en.webp', alt: 'The same Brand Key home page in English, left-to-right, with the headline and calls to action mirrored to the other side' },
      { src: '/work/brandkey/project.webp', alt: 'A project detail page in Arabic showing one signage job with its photographs and a description of the work' },
      { src: '/work/brandkey/services.webp', alt: 'The services page in Arabic listing the workshop\'s service groups with photographs' },
      { src: '/work/brandkey/printing.webp', alt: 'The printing catalogue page in Arabic, a grid of printed product cards each with an order button' },
      { src: '/work/brandkey/m-home.webp', alt: 'The Brand Key home page on a phone in Arabic, with the facade photograph and the quote request button' },
    ],
    video: null,
  },
];

export const getProjectBySlug = (slug: string | undefined): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const projectsByService = (serviceSlug: string): Project[] =>
  projects.filter((project) => project.services.includes(serviceSlug));

export const featuredProjects = (limit = 4): Project[] =>
  projects.filter((project) => project.featured).slice(0, limit);

/** Only services we can actually show work for become filters. */
export const portfolioFilters = (): { slug: string; title: string }[] =>
  services
    .filter((service) => projectsByService(service.slug).length > 0)
    .map((service) => ({ slug: service.slug, title: service.title }));

/** Next project in the list, for the "what's next" link on a case study. */
export const nextProject = (slug: string): Project => {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};
