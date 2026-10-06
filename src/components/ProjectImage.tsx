import { ImageIcon } from 'lucide-react';

interface ProjectImageProps {
  src: string | null;
  alt: string;
  /** Shown inside the placeholder so each slot is identifiable. */
  label: string;
  className?: string;
  /** Larger type for hero/cover slots. */
  size?: 'card' | 'hero';
}

/**
 * Renders project artwork, or a branded placeholder while the real asset is
 * still missing.
 *
 * Deliberately not stock photography: a placeholder that is obviously a
 * placeholder is better than a borrowed photo that reads as the agency's work.
 */
const ProjectImage = ({ src, alt, label, className = '', size = 'card' }: ProjectImageProps) => {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" decoding="async" className={className} />;
  }

  return (
    <div
      role="img"
      aria-label={`${alt} — artwork coming soon`}
      className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/20 via-background-secondary to-purple-500/20 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,140,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <ImageIcon className={`relative text-primary/70 ${size === 'hero' ? 'w-12 h-12' : 'w-7 h-7'}`} />
      <p
        className={`relative text-center px-4 font-bold text-foreground/80 ${
          size === 'hero' ? 'text-lg md:text-xl' : 'text-xs md:text-sm'
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default ProjectImage;
