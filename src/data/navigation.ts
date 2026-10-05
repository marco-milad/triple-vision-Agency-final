/** Site navigation, kept in one place so the navbar and footer cannot drift apart. */

import { services } from "./services";

export interface NavItem {
  name: string;
  path: string;
}

export const mainNav: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

export const companyNav: NavItem[] = [
  { name: "About Us", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Services", path: "/services" },
  { name: "Contact Us", path: "/contact" },
];

/** Derived from the official service list, so the footer always matches. */
export const servicesNav: NavItem[] = services.map((service) => ({
  name: service.title,
  path: `/services/${service.slug}`,
}));
