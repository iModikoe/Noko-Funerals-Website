/**
 * A template re-mounts on every navigation, unlike a layout. That gives each
 * route a short fade as it arrives, so moving through the site feels composed
 * rather than abrupt.
 *
 * The fade is suppressed by the reduced-motion rules in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
