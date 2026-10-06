import { useCallback, useEffect, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '@/data/portfolio';

/** The controls fade out once the viewer has been still this long. */
const IDLE_MS = 5000;
/** Below this, a drag is a tap rather than a swipe. */
const SWIPE_PX = 50;

interface LightboxProps {
  images: GalleryImage[];
  /** Index to show, or null when the viewer is closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/**
 * Full-screen viewer for case study artwork.
 *
 * The boards are 1920 wide and carry their own headings and body copy, so on
 * the page the small print is below reading size. Opening one fills the window
 * with it.
 *
 * Built on the Radix dialog, which handles the focus trap, the scroll lock and
 * returning focus to whatever opened it. Everything below that — stepping
 * through the set, zoom, swipe and the controls getting out of the way — is
 * this component.
 */
const Lightbox = ({ images, index, onClose, onIndexChange }: LightboxProps) => {
  const open = index !== null;
  const current = open ? images[index] : undefined;

  const [zoomed, setZoomed] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Stepping wraps around, so the set never dead-ends on the last board.
  const step = useCallback(
    (delta: number) => {
      if (index === null || images.length === 0) return;
      setZoomed(false);
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  const wake = useCallback(() => {
    setIdle(false);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), IDLE_MS);
  }, []);

  useEffect(() => {
    if (!open) return;
    wake();
    return () => clearTimeout(idleTimer.current);
  }, [open, index, wake]);

  // Reset the zoom whenever the viewer is opened afresh.
  useEffect(() => {
    if (!open) setZoomed(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        wake();
        step(-1);
      } else if (event.key === 'ArrowRight') {
        wake();
        step(1);
      }
      // Escape is the dialog's own, so it is not handled here.
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step, wake]);

  // Warm the neighbours so stepping through does not wait on the network.
  useEffect(() => {
    if (index === null || images.length < 2) return;
    for (const offset of [1, -1]) {
      const neighbour = images[(index + offset + images.length) % images.length];
      const preload = new Image();
      preload.src = neighbour.src;
    }
  }, [index, images]);

  if (!current) return null;

  const multiple = images.length > 1;
  const controlClass = `absolute z-10 grid place-items-center rounded-full bg-background/70 text-foreground backdrop-blur-sm
    border border-border/50 transition-opacity duration-300 hover:bg-background focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-primary ${idle && !zoomed ? 'opacity-0' : 'opacity-100'}`;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          // A dialog needs a real title, not just a label: a screen reader
          // announces the title on open, and Radix warns without one.
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex items-center justify-center focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0"
          onMouseMove={wake}
          onPointerDownOutside={onClose}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            // While zoomed a drag pans the board rather than changing it.
            if (!start || zoomed || !multiple) return;
            const touch = event.changedTouches[0];
            const dx = touch.clientX - start.x;
            if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(touch.clientY - start.y)) {
              wake();
              step(dx < 0 ? 1 : -1);
            }
          }}
        >
          <DialogPrimitive.Title className="sr-only">
            {`${current.alt} — image ${index + 1} of ${images.length}`}
          </DialogPrimitive.Title>

          {/* Zoom fills the width and lets the page scroll the overflow. */}
          <div className={`h-full w-full ${zoomed ? 'overflow-auto' : 'overflow-hidden grid place-items-center p-4 sm:p-10'}`}>
            <img
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              onClick={() => {
                wake();
                setZoomed((was) => !was);
              }}
              className={
                zoomed
                  ? 'w-full h-auto block cursor-zoom-out'
                  : 'max-h-full max-w-full w-auto h-auto object-contain cursor-zoom-in'
              }
            />
          </div>

          {multiple && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className={`${controlClass} left-3 sm:left-6 w-12 h-12`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className={`${controlClass} right-3 sm:right-6 w-12 h-12`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <p
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/70
                  border border-border/50 backdrop-blur-sm text-muted-foreground text-xs font-semibold
                  transition-opacity duration-300 ${idle && !zoomed ? 'opacity-0' : 'opacity-100'}`}
              >
                {index + 1} / {images.length}
              </p>
            </>
          )}

          <DialogPrimitive.Close
            aria-label="Close"
            className={`${controlClass} top-3 right-3 sm:top-6 sm:right-6 w-12 h-12`}
          >
            <X className="w-6 h-6" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Lightbox;
