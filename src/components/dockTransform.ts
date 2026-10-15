/** The smallest part of a DOMRect the move needs. */
export interface Rect {
  left: number;
  top: number;
  width: number;
}

/**
 * The transform that carries `from` onto `to`, scaled about the top-left
 * corner.
 *
 * Corner to corner, not centre to centre. With `transform-origin: top left` a
 * centre-based move leaves the element half the difference in width off target
 * — for the intro mark landing on the header logo that is about 158px, most of
 * the header logo's own width.
 *
 * Nothing about either element's layout may change between measuring and
 * moving, or the transform starts from somewhere other than where it was read.
 */
export const dockTransform = (from: Rect, to: Rect): string => {
  const scale = to.width / from.width;
  return `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${scale})`;
};
