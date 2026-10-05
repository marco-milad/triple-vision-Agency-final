import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { company } from '@/data/company';

interface SeoProps {
  /** Page title without the brand suffix. Omit on the home page. */
  title?: string;
  description: string;
  /** Keeps a page out of search results (used by 404). */
  noIndex?: boolean;
}

/**
 * Per-route metadata. Without this every route served the home page's title,
 * description and canonical URL, which told search engines each page was a
 * duplicate of the home page.
 *
 * NOTE: the site is still client-rendered, so crawlers that do not run
 * JavaScript (including most social preview scrapers) see the tags in
 * index.html. Prerendering is the follow-up that makes these per-page tags
 * visible to them too.
 */
const Seo = ({ title, description, noIndex }: SeoProps) => {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} | ${company.name}` : `${company.name} | Integrated Digital Agency in Cairo`;
  const canonical = `${company.siteUrl}${pathname === '/' ? '' : pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default Seo;
