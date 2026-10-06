import { motion } from 'framer-motion';
import type { GalleryImage } from '@/data/portfolio';

interface FigureProps {
  image: GalleryImage;
  /** Narrow shots (phone screens) sit in a column rather than full width. */
  compact?: boolean;
  className?: string;
}

/**
 * A screenshot shown at its own shape.
 *
 * Case study images are screenshots of real screens: a tall storefront and a
 * wide dashboard are not the same picture, and cropping both into one fixed box
 * hides the thing the reader came to see. Width and height come from the file,
 * so the browser reserves the right space before the image loads.
 */
const Figure = ({ image, compact = false, className = '' }: FigureProps) => (
  <motion.figure
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5 }}
    className={className}
  >
    <div
      className={`overflow-hidden rounded-2xl border-2 border-border/50 bg-background-secondary shadow-2xl ${
        compact ? 'rounded-xl' : ''
      }`}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="w-full h-auto block"
      />
    </div>

    {image.caption && (
      <figcaption className="text-muted-foreground/70 text-sm mt-3 text-center">{image.caption}</figcaption>
    )}
  </motion.figure>
);

/** Phone screenshots are tall and narrow; anything else reads as a wide shot. */
export const isPortrait = (image: GalleryImage): boolean =>
  Boolean(image.width && image.height && image.height / image.width > 1.3);

export default Figure;
