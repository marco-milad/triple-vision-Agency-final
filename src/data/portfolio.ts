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
  caption?: string;
}

/**
 * A block of the case study narrative.
 *
 * `overview`, `challenge`, `approach` and `outcome` are prose; `solution`
 * carries a figure; `features` is a list of what was built.
 */
export interface CaseSection {
  type: 'overview' | 'challenge' | 'approach' | 'solution' | 'features' | 'outcome';
  title?: string;
  body?: string[];
  items?: { title: string; body: string; figure?: GalleryImage }[];
  figure?: GalleryImage;
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
  /** Sub-category within the service, e.g. "ERP & POS" under web development. */
  category?: string;
  /** Technologies used, shown as chips on the case study. */
  stack?: string[];
  /** The written case study. Projects without one fall back to the summary. */
  sections?: CaseSection[];
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
    category: 'E-commerce & retail operations',
    industry: 'Retail & E-commerce',
    year: '2026',
    summary: 'A bilingual storefront and the operations system behind it — inventory, POS, suppliers, purchase orders, returns and reporting — built for a luggage retailer selling in Egypt.',
    stack: ['nextjs', 'react', 'typescript', 'tailwind', 'supabase', 'postgres', 'serverActions', 'zod', 'zustand', 'recharts', 'puppeteer', 'resend', 'twilio', 'vercel'],
    liveUrl: null,
    cover: '/work/mm-bags/storefront-ar.webp',
    coverAlt: 'M.M Bags storefront home page in Arabic, right-to-left, with a navy hero and the headline \'travel smart, travel in style\'',
    sections: [
    {
      type: 'overview',
      body: [
        'M.M Bags is a luggage retailer established in 1998 with two branches in Upper Egypt, and no online presence before this project. It needed two things at once: a storefront customers would actually buy from, and a way to run the shop that did not depend on a paper notebook.',
        'So the platform is one system with two faces. The public side is Arabic-first and right-to-left, with an English version, designed mobile-first for Egyptian networks. The private side is an operations surface: products and collections, stock, a point of sale for the counter, returns, suppliers, purchase orders, orders, reports, analytics and the content of the home page itself.',
        'The hardest part was never the interface. It was payment: the way money actually moves in Egypt does not fit the checkout flow that e-commerce frameworks assume.',
      ],
    },
    {
      type: 'challenge',
      title: 'The business problem',
      body: [
        'InstaPay is how a large share of Egyptians move money, and it has no merchant API. There is no callback that says an order was paid, so automatic confirmation is impossible. A checkout that assumes a payment gateway will simply be wrong here.',
        'At the same time, stock is physical and shared. The same bag can be sold online and taken off the shelf at the counter within the same minute. If the two channels keep separate counts, the shop oversells and someone has to apologise to a customer.',
      ],
    },
    {
      type: 'approach',
      title: 'The shape of the product',
      body: [
        'Two decisions came before any screen. The first was that this is one system, not a website plus an admin tool bought separately: the storefront and the shop counter read and write the same stock, because they are selling the same physical bags.',
        'The second was that Arabic is the default and English is the alternate — not a language toggle added at the end. The customer this shop actually serves reads Arabic on a phone, on a network that is not fast, so that is the case the design starts from and the English version mirrors.',
      ],
    },
    {
      type: 'solution',
      title: 'The storefront',
      body: [
        'Arabic-first means the default experience is right-to-left, not a translation bolted onto an English layout. Both directions render from one component tree; there is no forked UI.',
      ],
      figure: {
        src: '/work/mm-bags/storefront-ar.webp',
        alt: 'Arabic storefront home page with navy hero, product promise badges and two calls to action',
        caption: 'The default experience: Arabic, right-to-left, mobile-first.',
      },
    },
    {
      type: 'features',
      title: 'What the system runs',
      items: [
        {
          title: 'Storefront',
          body: 'Catalog with collections and filtering, product pages with variants, comparison, wishlist, cart, checkout, order confirmation, order tracking and a back-in-stock waitlist.',
        },
        {
          title: 'Point of sale',
          body: 'Counter sales against the same stock as the website, plus POS returns.',
          figure: {
            src: '/work/mm-bags/admin-pos.webp',
            alt: 'Point of sale screen in Arabic with a payment panel on one side and a searchable product grid on the other',
            caption: 'The counter and the website draw down the same stock.',
          },
        },
        {
          title: 'Catalogue management',
          body: 'Products and variants with bilingual names, collection, price, stock and the flags that drive the storefront.',
          figure: {
            src: '/work/mm-bags/admin-products.webp',
            alt: 'Products admin in Arabic listing items with thumbnails, prices, stock levels and active toggles',
          },
        },
        {
          title: 'Stock and suppliers',
          body: 'A stock ledger, supplier records, purchase orders with a branded PDF, and a supplier account ledger.',
        },
        {
          title: 'Orders and returns',
          body: 'Order management with CSV export, a full returns flow, and atomic restock so a return cannot double-count inventory.',
        },
        {
          title: 'Reports and analytics',
          body: 'Daily and monthly reports, best sellers, stock value, supplier ledger and returns — exportable as CSV or PDF — plus first-party analytics with a nightly rollup.',
        },
        {
          title: 'Content and staff',
          body: 'Home-page merchandising controlled from the admin, reviews, a newsletter, and staff accounts across three roles.',
        },
      ],
    },
    {
      type: 'outcome',
      title: 'Outcome',
      body: [
        'A shop that had no online presence now sells through a bilingual storefront and runs its counter, stock, suppliers and reporting from the same system, with one shared stock ledger behind both.',
        'The payment path reflects how money actually moves in Egypt: manual where it has to be, automatic where it can be, and never claiming an order is paid when it is not.',
      ],
    },
    ],
    gallery: [
      { src: '/work/mm-bags/mobile-menu.webp', alt: 'Mobile navigation sheet in Arabic showing collections with product counts and account links' },
      { src: '/work/mm-bags/m-catalog.webp', alt: 'Catalogue on a phone in Arabic, two products per row with prices' },
      { src: '/work/mm-bags/categories.webp', alt: 'Collections landing page in Arabic with a dark hero and category cards' },
      { src: '/work/mm-bags/admin-analytics.webp', alt: 'M.M Bags — Admin analytics' },
      { src: '/work/mm-bags/admin-dashboard.webp', alt: 'M.M Bags — Admin dashboard' },
      { src: '/work/mm-bags/admin-orders.webp', alt: 'M.M Bags — Admin orders' },
      { src: '/work/mm-bags/admin-purchase-orders.webp', alt: 'M.M Bags — Admin purchase orders' },
      { src: '/work/mm-bags/admin-reports.webp', alt: 'M.M Bags — Admin reports' },
      { src: '/work/mm-bags/admin-stock.webp', alt: 'M.M Bags — Admin stock' },
      { src: '/work/mm-bags/admin-suppliers.webp', alt: 'M.M Bags — Admin suppliers' },
      { src: '/work/mm-bags/cart.webp', alt: 'M.M Bags — Cart' },
      { src: '/work/mm-bags/catalog.webp', alt: 'M.M Bags — Catalog' },
      { src: '/work/mm-bags/checkout.webp', alt: 'M.M Bags — Checkout' },
      { src: '/work/mm-bags/home-en.webp', alt: 'M.M Bags — Home English' },
      { src: '/work/mm-bags/home.webp', alt: 'M.M Bags — Home' },
      { src: '/work/mm-bags/product.webp', alt: 'M.M Bags — Product' },
      { src: '/work/mm-bags/track.webp', alt: 'M.M Bags — Track' },
    ],
    video: null,
    featured: true,
  },
  {
    slug: 'gold-jewelry-erp',
    title: 'Mogohrat Al-Gabaly',
    client: 'Mogohrat Al-Gabaly',
    services: ['web-development'],
    category: 'ERP & POS',
    industry: 'Jewelry Retail',
    year: '2026',
    summary: 'A full operations system for a gold shop: daily karat pricing, serialized per-piece inventory, a point of sale that prices live, wholesale credit ledgers, buy-back of old gold, and Arabic documents that print correctly.',
    stack: ['nextjs', 'react', 'typescript', 'tailwind', 'supabase', 'postgres', 'serverActions', 'zod', 'puppeteer', 'vercel'],
    liveUrl: 'https://mogohrat-lotfy.vercel.app',
    cover: '/work/gold-jewelry-erp/prices.webp',
    coverAlt: 'Daily gold pricing screen in Arabic showing buy and sell prices per gram for karats 24, 22, 21, 18 and 14, with the update form below',
    sections: [
    {
      type: 'overview',
      body: [
        'A gold and jewelry retailer runs its whole day on numbers that move. The price of a gram changes every morning, every ring has its own weight and making charge, and the shop\'s actual margin hides inside that making charge rather than in the headline price on the receipt.',
        'This is the system the shop runs on: an Arabic, right-to-left admin with no public side at all. It covers the full cycle of gold through the shop — supply, stock, retail and wholesale selling, returns, buying old gold back from customers, and melting or converting it into something sellable again. Every movement of weight is written to one ledger, and every operation is written to an audit log.',
        'It is twenty-two admin screens and five printable Arabic documents, over nine database migrations and twenty-three tables.',
      ],
    },
    {
      type: 'challenge',
      title: 'Why a gold shop cannot use ordinary retail software',
      body: [
        'In normal retail a product has a price. Here it does not. A piece is worth its weight times today\'s rate for its karat, plus a making charge, and the shop\'s profit lives almost entirely in that making charge. An invoice of a hundred thousand pounds might be ninety percent gold value that simply passes through at the day\'s rate.',
        'Treat revenue as profit and every report lies. Discount against the gold value instead of the making charge and the shop can sell at a loss without noticing.',
        'On top of that, jewelry is unique per piece while bars and coins are standard products sold by count — two different inventory models that still have to share one ledger of grams. And the wholesale side of the business was being tracked in a paper notebook.',
      ],
    },
    {
      type: 'approach',
      title: 'Modelling the domain before the screens',
      body: [
        'The decision that shaped everything else was to keep one internal model and let a single field tell the two product worlds apart. A ring and a gold coin are both a row in the same table, with a serial number and a lifecycle status; what differs is how they are received, priced and printed.',
        'That keeps the ledger of grams honest — every gram is tracked the same way regardless of what it is attached to — while still letting the counter treat a coin as \'five of these\' and a ring as \'this exact one\'.',
        'Prices were the other early decision: nothing stores a computed price. The rate is entered once a day, the calculation is a pure function, and the number written onto a sale is a snapshot taken at that moment.',
      ],
    },
    {
      type: 'solution',
      title: 'The system in use',
      body: [
        'The day starts on this screen. Prices for each karat are entered once, they land in history, and every other calculation in the system reads from them.',
      ],
      figure: {
        src: '/work/gold-jewelry-erp/prices.webp',
        alt: 'Gold price screen listing five karat cards with buy and sell rates per gram, above a form for updating each one',
        caption: 'Today\'s rates. Entered once, read everywhere.',
      },
    },
    {
      type: 'features',
      title: 'What it covers',
      items: [
        {
          title: 'Point of sale',
          body: 'A cart that prices live from the day\'s rate, with an optional customer, a discount that is capped to the making charge, and a printable Arabic receipt.',
          figure: {
            src: '/work/gold-jewelry-erp/sale-receipt.webp',
            alt: 'Sale detail screen in Arabic showing invoice lines, totals and a return action',
          },
        },
        {
          title: 'Buy-back and scrap',
          body: 'Old gold bought from customers by weight and karat, accumulating in a scrap pool that can be sold for melting or converted into a new sellable piece.',
          figure: {
            src: '/work/gold-jewelry-erp/buyback.webp',
            alt: 'Buy-back screen in Arabic with a purchase form and cards showing the scrap pool held per karat',
          },
        },
        {
          title: 'Wholesale on credit',
          body: 'Traders withdraw stock against their account and pay over time, with a running balance and a printable statement.',
          figure: {
            src: '/work/gold-jewelry-erp/wholesale.webp',
            alt: 'Wholesale customer list in Arabic showing amounts withdrawn, paid and still owed per trader',
          },
        },
        {
          title: 'Suppliers and receiving',
          body: 'Supply invoices with partial payments and discounts, and a receiving screen for entering jewelry per piece or bullion by type and count.',
          figure: {
            src: '/work/gold-jewelry-erp/suppliers.webp',
            alt: 'Supplier ledger in Arabic showing totals purchased, paid and still owed',
          },
        },
        {
          title: 'Bars and coins',
          body: 'A typed catalogue with its own pricing pages, kept separate from jewelry because the two are bought and sold in completely different ways.',
          figure: {
            src: '/work/gold-jewelry-erp/coins.webp',
            alt: 'Gold coin pricing screen in Arabic listing coin types with their karat, weight and price',
          },
        },
        {
          title: 'Reports and audit',
          body: 'Daily closing, a monthly report against the previous month, profit analytics that rank by profit rather than revenue, and an audit log of every operation.',
          figure: {
            src: '/work/gold-jewelry-erp/activity.webp',
            alt: 'Audit log in Arabic listing operations with the user, action type and timestamp',
          },
        },
      ],
    },
    {
      type: 'outcome',
      title: 'Outcome',
      body: [
        'The shop runs its day on this: prices in the morning, sales and buy-backs through the day, and a closing report that reconciles against the drawer at night. The wholesale notebook became a ledger with a running balance and a statement a trader can sign.',
        'What matters in it is not the number of screens. It is the guarantees: a piece cannot be sold twice, a price is always recomputed on the server, the reports agree with each other, and the Arabic documents print correctly from a serverless function.',
      ],
    },
    ],
    gallery: [
      { src: '/work/gold-jewelry-erp/m-receiving.webp', alt: 'Receiving screen on a phone, where the wide desktop entry grid becomes one labelled card per piece' },
      { src: '/work/gold-jewelry-erp/m-pos.webp', alt: 'Point of sale on a phone in Arabic, with search, cart, payment method and totals stacked vertically' },
      { src: '/work/gold-jewelry-erp/m-buyback.webp', alt: 'Buy-back on a phone in Arabic, with the purchase lines and the scrap pool per karat as stacked cards' },
      { src: '/work/gold-jewelry-erp/designs.webp', alt: 'Categories and designs screen in Arabic with default making charges per design' },
      { src: '/work/gold-jewelry-erp/customers.webp', alt: 'Mogohrat Al-Gabaly — Customers' },
      { src: '/work/gold-jewelry-erp/dashboard.webp', alt: 'Mogohrat Al-Gabaly — Dashboard' },
      { src: '/work/gold-jewelry-erp/inventory.webp', alt: 'Mogohrat Al-Gabaly — Inventory' },
      { src: '/work/gold-jewelry-erp/pos.webp', alt: 'Mogohrat Al-Gabaly — POS' },
      { src: '/work/gold-jewelry-erp/prices-bullion.webp', alt: 'Mogohrat Al-Gabaly — Prices bullion' },
      { src: '/work/gold-jewelry-erp/prices-coins.webp', alt: 'Mogohrat Al-Gabaly — Prices coins' },
      { src: '/work/gold-jewelry-erp/receiving.webp', alt: 'Mogohrat Al-Gabaly — Receiving' },
      { src: '/work/gold-jewelry-erp/sales.webp', alt: 'Mogohrat Al-Gabaly — Sales' },
      { src: '/work/gold-jewelry-erp/settings.webp', alt: 'Mogohrat Al-Gabaly — Settings' },
      { src: '/work/gold-jewelry-erp/staff.webp', alt: 'Mogohrat Al-Gabaly — Staff' },
      { src: '/work/gold-jewelry-erp/wholesale-statement.webp', alt: 'Mogohrat Al-Gabaly — Wholesale statement' },
      { src: '/work/gold-jewelry-erp/m-activity.webp', alt: 'Mogohrat Al-Gabaly — Mobile activity' },
      { src: '/work/gold-jewelry-erp/m-customers.webp', alt: 'Mogohrat Al-Gabaly — Mobile customers' },
      { src: '/work/gold-jewelry-erp/m-dashboard.webp', alt: 'Mogohrat Al-Gabaly — Mobile dashboard' },
    ],
    video: null,
  },
  {
    slug: 'ray-lab',
    title: 'Ray Lab Group',
    client: 'Ray Lab Group',
    services: ['web-development'],
    category: 'Enterprise healthcare',
    industry: 'Healthcare',
    year: '2026',
    summary: 'A corporate platform for a multinational diagnostic healthcare group: eight brands across three countries, an investor section with its own data, and an interactive map of the branch network — shipped without a server.',
    stack: ['tanstackStart', 'react', 'typescript', 'vite', 'tailwind', 'maplibre'],
    liveUrl: 'https://raylab.health',
    cover: '/work/ray-lab/network-hero.webp',
    coverAlt: 'Ray Lab Group network page headed \'Diagnostic coverage across MENA\', with cards showing 78+ branches, 3 countries and 6 brands',
    sections: [
    {
      type: 'overview',
      body: [
        'Ray Lab Group is a multinational diagnostic healthcare group headquartered in Malta, operating across Egypt, Saudi Arabia and Jordan. It is not one business with one voice: it is eight diagnostic and clinical platforms, each with its own name, colour, market and history, sitting under one group.',
        'The corporate platform had to carry all of that at once — and then send three very different visitors somewhere useful. An investor wants governance, growth and shareholders. A referring physician wants to know how a referral works and what comes back. A supplier or partner wants to know who they would be dealing with.',
        'Delivered by Triple Vision Agency.',
      ],
    },
    {
      type: 'challenge',
      title: 'Three audiences, eight brands, and someone else\'s infrastructure',
      body: [
        'The content problem was breadth. Eight brands, each with a different country, colour and founding story. Dozens of branches across three markets, which somebody is trying to find while standing in a street. An investor section that had to hold real numbers rather than a brochure paragraph.',
        'The engineering problem arrived later, and it was not technical in origin. The site needed server-side rendering for SEO — but the client\'s domain sits with an external DNS provider that blocks the routing the hosting platform needs, and the client would not move their nameservers. That constraint, not a preference, decided the architecture.',
      ],
    },
    {
      type: 'approach',
      title: 'Content as typed data, not a CMS',
      body: [
        'With no server to run, a content management system was off the table anyway — but it was also the wrong tool. This content is highly structured and changes rarely: eight brands, a list of branches, a fixed set of investor tabs.',
        'So content lives in typed modules the compiler checks. A brand is an object with a colour, a market and a description. A branch is a record with coordinates. Adding one is a data change, and a missing key is caught while developing rather than rendering as a blank space.',
      ],
    },
    {
      type: 'solution',
      title: 'One group, eight brands',
      body: [
        'Each platform keeps its own identity — its colour, its market, the year it was founded — while the page treats them as one system.',
      ],
      figure: {
        src: '/work/ray-lab/brands.webp',
        alt: 'Directory grid of eight healthcare brand cards, each with a coloured top border, logo, country, branch count and founding year',
        caption: 'Eight platforms rendered from one component and eight data records.',
      },
    },
    {
      type: 'features',
      title: 'What the platform does',
      items: [
        {
          title: 'Audience routing',
          body: 'Investors, physicians and partners each get a tailored path from the home page rather than a single undifferentiated story.',
          figure: {
            src: '/work/ray-lab/physicians.webp',
            alt: 'Physicians section showing a four-step referral flow: refer, match, report, deliver',
          },
        },
        {
          title: 'Investor relations',
          body: 'A dedicated section with tabs for thesis, performance, shareholders, strategy, expansion, governance, risk and press — each reading from its own data.',
          figure: {
            src: '/work/ray-lab/investors.webp',
            alt: 'Investor relations landing section with headline statistics and a row of tabs',
          },
        },
        {
          title: 'Expansion roadmap',
          body: 'A staged timeline of the group\'s growth plan, rendered from data rather than drawn as an image.',
          figure: {
            src: '/work/ray-lab/roadmap.webp',
            alt: 'Expansion roadmap timeline showing staged growth milestones with status markers',
          },
        },
        {
          title: 'Partner network',
          body: 'The diagnostic equipment vendors behind the group\'s imaging capability.',
          figure: {
            src: '/work/ray-lab/partners.webp',
            alt: 'Technology partners section listing major diagnostic equipment manufacturers',
          },
        },
        {
          title: 'Investor figures',
          body: 'The performance tab renders its numbers from the same typed content modules as everything else, rather than being set as an image.',
          figure: {
            src: '/work/ray-lab/financials.webp',
            alt: 'Investor performance cards showing operating revenue, annual exams, lab tests and new branches',
          },
        },
      ],
    },
    {
      type: 'outcome',
      title: 'Outcome',
      body: [
        'The group has one platform that speaks to investors, physicians and partners without flattening eight brands into one voice, and a branch network that can be explored rather than read.',
        'It is live on the client\'s own hosting with no server to maintain, and the search-engine work survived four changes of deployment because none of it depends on runtime rendering.',
      ],
      figure: {
        src: '/work/ray-lab/reach.webp',
        alt: 'Network summary cards showing 78+ branches, 6 brands, 3 operating markets and 1.6M+ annual exams',
        caption: 'Group figures as published by the client.',
      },
    },
    ],
    gallery: [
      { src: '/work/ray-lab/m-home.webp', alt: 'Ray Lab Group home page on a phone, with the group headline and audience entry points' },
      { src: '/work/ray-lab/m-physicians.webp', alt: 'Physician referral steps on a phone, stacked as individual cards' },
      { src: '/work/ray-lab/m-partners.webp', alt: 'Technology partner cards stacked on a phone' },
      { src: '/work/ray-lab/home.webp', alt: 'Ray Lab Group — Home' },
      { src: '/work/ray-lab/brand-detail.webp', alt: 'Ray Lab Group — Brand detail' },
      { src: '/work/ray-lab/directory.webp', alt: 'Ray Lab Group — Directory' },
      { src: '/work/ray-lab/overview.webp', alt: 'Ray Lab Group — Overview' },
      { src: '/work/ray-lab/expansion-roadmap.webp', alt: 'Ray Lab Group — Expansion roadmap' },
      { src: '/work/ray-lab/financial-highlights.webp', alt: 'Ray Lab Group — Financial highlights' },
      { src: '/work/ray-lab/governance.webp', alt: 'Ray Lab Group — Governance' },
      { src: '/work/ray-lab/growth-strategy.webp', alt: 'Ray Lab Group — Growth strategy' },
      { src: '/work/ray-lab/investment-thesis.webp', alt: 'Ray Lab Group — Investment thesis' },
      { src: '/work/ray-lab/platform-vision.webp', alt: 'Ray Lab Group — Platform vision' },
      { src: '/work/ray-lab/press-room.webp', alt: 'Ray Lab Group — Press room' },
      { src: '/work/ray-lab/risk-mitigation.webp', alt: 'Ray Lab Group — Risk mitigation' },
      { src: '/work/ray-lab/shareholders.webp', alt: 'Ray Lab Group — Shareholders' },
      { src: '/work/ray-lab/investors-expansion-roadmap.webp', alt: 'Ray Lab Group — Investors expansion roadmap' },
    ],
    video: null,
    featured: true,
  },
  {
    slug: 'ojos-studio',
    title: 'OJOS Studio',
    client: 'OJOS Studio',
    services: ['web-development'],
    category: 'Media-heavy brand site',
    industry: 'Photography Studio',
    year: '2026',
    summary: 'A media-heavy studio site where the imagery is the product: a Cloudinary-driven image pipeline, one route serving four different media experiences, and booking that works without a backend.',
    stack: ['react', 'vite', 'typescript', 'tailwind', 'radix', 'framerMotion', 'reactRouter', 'emailjs', 'cloudinary', 'vercel'],
    liveUrl: null,
    cover: '/work/ojos-studio/home.webp',
    coverAlt: 'OJOS Studio home page with the headline \'It\'s more than a photo. It\'s art.\' beside a bridal portrait',
    sections: [
    {
      type: 'overview',
      body: [
        'OJOS Studio is a photography and media-production studio in Cairo. Its site has one job — turn someone browsing into someone booking — and one complication: the thing it has to show off is also the heaviest thing on the page.',
        'The studio\'s differentiator is a dual identity. Mina Makaram leads the photography; Alber Makram, a film director trained at the French University in Egypt and a first-place winner at the Youssef Chahine Short Film Festival, leads the film side. A site that only showed photographs would have undersold half the business, and one that only showed films would have undersold the other.',
        'There is no backend, no CMS and no database. Every page is static, the content is modelled in code as typed constants, and all media is served from a CDN.',
      ],
    },
    {
      type: 'challenge',
      title: 'The product is the payload',
      body: [
        'On most sites, images are decoration you can compress until the complaints start. Here they are the argument. A studio that shows a soft, slow, badly cropped photograph has just told you what it thinks \'good\' looks like.',
        'So the brief pulls in two directions at once: hundreds of high-resolution photographs and a wall of video, delivered to people in Cairo on phones, fast enough that nobody waits to be impressed — and all of it without a server to render or resize anything.',
      ],
    },
    {
      type: 'approach',
      title: 'Content modelled in code',
      body: [
        'With no CMS, the content had to live somewhere it could still be trusted. It is modelled as typed constants: each portfolio category declares its own media, copy and display mode, and the compiler checks the shape.',
        'That is the right trade for a site the studio does not edit daily. It costs a deploy to change a caption, and it buys no database, no admin to secure, no CMS bill, and no runtime that can fail while a client is looking at the work.',
      ],
    },
    {
      type: 'solution',
      title: 'One brand, two crafts',
      body: [
        'The home page has to carry both halves of the studio at once — the photography and the film work — and get to a booking prompt without making anyone scroll for it.',
      ],
      figure: {
        src: '/work/ojos-studio/home.webp',
        alt: 'OJOS Studio home page: large studio wordmark, a bridal portrait, and calls to action to view the portfolio or book',
      },
    },
    {
      type: 'features',
      title: 'Four ways to show work',
      items: [
        {
          title: 'Photo galleries',
          body: 'Six of the nine categories render as a thumbnail grid that opens into a lightbox, where the full-resolution image is requested only once someone actually opens it.',
          figure: {
            src: '/work/ojos-studio/portraits.webp',
            alt: 'Portraits category page with a header and a row of portrait thumbnails',
          },
        },
        {
          title: 'Cinematic film',
          body: 'The film category swaps the grid for a video-led layout, because a director\'s work does not read as a contact sheet.',
          figure: {
            src: '/work/ojos-studio/film.webp',
            alt: 'Cinematic Film category page with a headline and a video player card',
          },
        },
        {
          title: 'Vertical reels',
          body: 'Short clips render as a horizontal scroll-snap row of vertical cards that play muted on hover and reset when the pointer leaves.',
        },
        {
          title: 'Booking',
          body: 'A packages page with real hourly tiers, and a booking form that reaches the studio by email and by WhatsApp at once.',
        },
      ],
    },
    {
      type: 'outcome',
      title: 'Outcome',
      body: [
        'A studio whose product is imagery has a site that shows it at full quality and still loads light, with both halves of the business — the photography and the film work — presented on their own terms.',
        'It runs as static files on the studio\'s own hosting, with no server, no database and no CMS bill, and a booking path that matches how its clients actually get in touch.',
      ],
    },
    ],
    gallery: [
      { src: '/work/ojos-studio/m-home.webp', alt: 'OJOS Studio home page on a phone, with the studio name, a bridal portrait and the booking call to action' },
      { src: '/work/ojos-studio/news.webp', alt: 'OJOS Studio — News' },
      { src: '/work/ojos-studio/packages.webp', alt: 'OJOS Studio — Packages' },
      { src: '/work/ojos-studio/portfolio-casual.webp', alt: 'OJOS Studio — Portfolio casual' },
      { src: '/work/ojos-studio/portfolio-cinematic-film.webp', alt: 'OJOS Studio — Portfolio cinematic film' },
      { src: '/work/ojos-studio/portfolio-events.webp', alt: 'OJOS Studio — Portfolio events' },
      { src: '/work/ojos-studio/portfolio-media-coverage.webp', alt: 'OJOS Studio — Portfolio media coverage' },
      { src: '/work/ojos-studio/portfolio-media-production.webp', alt: 'OJOS Studio — Portfolio media production' },
      { src: '/work/ojos-studio/portfolio-others.webp', alt: 'OJOS Studio — Portfolio others' },
      { src: '/work/ojos-studio/portfolio-portraits.webp', alt: 'OJOS Studio — Portfolio portraits' },
      { src: '/work/ojos-studio/portfolio-products.webp', alt: 'OJOS Studio — Portfolio products' },
      { src: '/work/ojos-studio/portfolio-wedding.webp', alt: 'OJOS Studio — Portfolio wedding' },
      { src: '/work/ojos-studio/m-news.webp', alt: 'OJOS Studio — Mobile news' },
      { src: '/work/ojos-studio/m-packages.webp', alt: 'OJOS Studio — Mobile packages' },
      { src: '/work/ojos-studio/m-portfolio-casual.webp', alt: 'OJOS Studio — Mobile portfolio casual' },
    ],
    video: null,
  },
  {
    slug: 'brandkey',
    title: 'Brand Key Advertising',
    client: 'Brand Key Advertising',
    services: ['web-development'],
    category: 'Arabic-first marketing site',
    industry: 'Signage & Printing',
    year: '2026',
    summary: 'A bilingual, Arabic-first site for a Saudi signage company, built entirely from the company\'s own un-captioned photo archive — where the hard part was deciding what could honestly be said about each photograph.',
    stack: ['nextjs', 'react', 'typescript', 'tailwind', 'vercel'],
    liveUrl: null,
    cover: '/work/brandkey/home-ar.webp',
    coverAlt: 'Brand Key home page in Arabic, right-to-left, over a night photograph of an illuminated glass bank facade in Jeddah',
    sections: [
    {
      type: 'overview',
      title: 'A portfolio with no captions to build it from',
      body: [
        'Brand Key Advertising makes signs: illuminated letters, shop facades, exhibition stands, cut acrylic, welded steel housings. They work in Jeddah, they sell in Arabic, and their customers find them on WhatsApp.',
        'What they had was an Instagram account. What they did not have was a logo file, a company email, a postal address, or a single caption on any of it — the Instagram API returned an empty description on all 72 posts. The entire evidence base for the site was 86 photographs and 11 clips with nothing written about any of them.',
        'So the engineering problem was not the site. It was deciding, photograph by photograph, what could honestly be said about work nobody had written down.',
      ],
    },
    {
      type: 'challenge',
      title: 'Everything that was missing was a decision waiting to be made',
      body: [
        'An archive with no captions means client names, locations, dates, scopes, materials and dimensions are genuinely unknown. The easy path is to write plausible ones. A sign company\'s portfolio reads perfectly well with invented project titles and confident dates, and nobody would check.',
        'There was more missing than captions. No original logo artwork existed beyond a 150-pixel Instagram avatar. There was no company email. There was no building number and no commercial registration number. Resolution across the archive was uneven: 63 stills were 1440 pixels on the long edge and the rest fell away to 320.',
        'The brief also listed services the photographs could not support, and the archive contained images that were not this company\'s work at all.',
      ],
    },
    {
      type: 'approach',
      title: 'Content as data, so the site cannot drift from its own evidence',
      body: [
        'Nothing in the interface hardcodes an image path or a string. Projects, services, products, the FAQ and the site\'s own contact details are typed data; components are presentational. Adding a job is one entry.',
        'That is not tidiness for its own sake. It is what made the provenance rules enforceable: the file that holds the portfolio opens with the rule that nothing may be invented, every entry sits under it, and the one place to check a claim is the one place to change it.',
      ],
    },
    {
      type: 'outcome',
      title: 'Where it landed',
      body: [
        'The site is live and in production, in Arabic and English, carrying 84 jobs across 7 categories on 199 statically prerendered pages.',
        'What it does not have is as deliberate as what it does. No invented client names. No dates nobody could verify. No service category the photographs could not support. No stock photography, and nothing in the portfolio that belongs to somebody else.',
        'What is still outstanding is written down rather than quietly left: the full workshop address, a company email, original logo artwork. If any of them arrives, the file that lists them says exactly what to change.',
      ],
    },
    ],
    gallery: [
      { src: '/work/brandkey/project.webp', alt: 'A project detail page in Arabic showing one signage job with its photographs and a description of the work' },
      { src: '/work/brandkey/services.webp', alt: 'The services page in Arabic listing the workshop\'s service groups with photographs' },
      { src: '/work/brandkey/printing.webp', alt: 'The printing catalogue page in Arabic, a grid of printed product cards each with an order button' },
      { src: '/work/brandkey/m-home.webp', alt: 'The Brand Key home page on a phone in Arabic, with the facade photograph and the quote request button' },
      { src: '/work/brandkey/home-en.webp', alt: 'Brand Key home page in English, left-to-right, with the same night facade photography' },
      { src: '/work/brandkey/work.webp', alt: 'Brand Key work page showing completed signage and facade projects' },
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

/**
 * Projects for a service, grouped by their sub-category — so web development
 * reads as "ERP & POS", "E-commerce" and so on rather than one flat list.
 * Projects without a category fall into a single unnamed group.
 */
export const projectsByCategory = (serviceSlug: string): { category: string | null; projects: Project[] }[] => {
  const groups = new Map<string | null, Project[]>();
  for (const project of projectsByService(serviceSlug)) {
    const key = project.category ?? null;
    groups.set(key, [...(groups.get(key) ?? []), project]);
  }
  return [...groups.entries()].map(([category, items]) => ({ category, projects: items }));
};

/** Next project in the list, for the "what's next" link on a case study. */
export const nextProject = (slug: string): Project => {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};
