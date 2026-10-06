/**
 * Portfolio.
 *
 * The clients and the services delivered for them are real: both come from the
 * Company Profile 2026 (pages 21-40).
 *
 * TODO(client): the imagery and the one-line summaries are placeholders so the
 * layout can be reviewed. Replace `cover` and `gallery` with the original
 * artwork, `video` with the real links, and approve the copy. Until an image
 * is supplied the UI renders a branded placeholder block rather than borrowed
 * stock photography.
 */

import { services } from './services';

export interface Project {
  slug: string;
  title: string;
  client: string;
  /** Service slugs this work belongs to — drives the filters and service pages. */
  services: string[];
  industry: string;
  /** TODO(client): placeholder copy. */
  summary: string;
  /** null until the real artwork arrives. */
  cover: string | null;
  gallery: string[];
  video: string | null;
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
    slug: 'diagnostics-platform',
    title: 'Diagnostics Group Platform',
    // TODO(client): confirm the client name and the live URL.
    client: 'Diagnostics Group',
    services: ['web-development'],
    industry: 'Healthcare',
    summary: 'A responsive platform covering diagnostics across Egypt, Saudi Arabia and Jordan.',
    cover: null,
    gallery: [],
    video: null,
    featured: true,
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
