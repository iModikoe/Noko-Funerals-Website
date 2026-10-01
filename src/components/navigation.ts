/**
 * The site's primary navigation, shared by the header and the footer.
 * Add a page here and it appears in both, in this order.
 */
export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/plans", label: "Plans & Packages" },
  { href: "/contact", label: "Contact" },
] as const;
