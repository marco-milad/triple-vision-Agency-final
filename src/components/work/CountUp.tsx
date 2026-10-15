import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * A figure that counts up to itself when it scrolls into view.
 *
 * The figures are authored as display strings — "EGP 286,000", "1.84M", "3.4x" —
 * so the number is pulled out of the string and put back in the same shape it
 * arrived in. The data stays readable as data, and nobody has to keep a number
 * and its formatting in two places.
 */

export interface ParsedFigure {
  prefix: string;
  value: number;
  suffix: string;
  /** Decimal places the original showed, so 3.40 never lands as 3.4. */
  decimals: number;
  /** Whether the original grouped its thousands. */
  grouped: boolean;
}

/**
 * Split a display figure into the number and everything around it.
 *
 * Returns null when there is no number to count — "—", "n/a", a word — and the
 * caller then simply prints what it was given.
 */
export const parseFigure = (display: string): ParsedFigure | null => {
  const match = /^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/.exec(display);
  if (!match) return null;

  const [, prefix, number, suffix] = match;
  const plain = number.replace(/,/g, '');
  const dot = plain.indexOf('.');

  return {
    prefix,
    value: Number(plain),
    suffix,
    decimals: dot === -1 ? 0 : plain.length - dot - 1,
    grouped: number.includes(','),
  };
};

/** Put a counted number back into the shape its figure arrived in. */
export const formatFigure = (n: number, figure: ParsedFigure): string => {
  const body = figure.grouped
    ? n.toLocaleString('en-US', {
        minimumFractionDigits: figure.decimals,
        maximumFractionDigits: figure.decimals,
      })
    : n.toFixed(figure.decimals);
  return `${figure.prefix}${body}${figure.suffix}`;
};

const wantsLessMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface CountUpProps {
  /** The figure as it should finally read. */
  value: string;
  durationMs?: number;
  /** Held after the figure comes into view, to fall in with its bar. */
  delayMs?: number;
  /** Matches framer-motion's `viewport.margin` on the bars, so a number and
   *  the bar it labels start together. */
  rootMargin?: string;
  className?: string;
}

const CountUp = ({
  value,
  durationMs = 1100,
  delayMs = 0,
  rootMargin = '-60px',
  className,
}: CountUpProps) => {
  const figure = useMemo(() => parseFigure(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const [counted, setCounted] = useState<string | null>(null);

  useEffect(() => {
    if (!figure) return;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    // A reader who asked for less motion is shown the figure, not the counting.
    if (wantsLessMotion()) return;

    let frame = 0;
    let held = 0;

    const run = () => {
      const started = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - started) / durationMs, 1);
        // Ease out — quickest at the start, settling at the end, the curve the
        // rest of this site's motion uses.
        setCounted(t < 1 ? formatFigure(figure.value * (1 - (1 - t) ** 3), figure) : null);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      setCounted(formatFigure(0, figure));
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        // No delay means no wait: a figure with nothing to fall in behind
        // should not lose a tick to a zero-length timer.
        if (delayMs > 0) held = window.setTimeout(run, delayMs);
        else run();
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(held);
      cancelAnimationFrame(frame);
    };
  }, [figure, durationMs, delayMs, rootMargin]);

  if (!figure) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={`relative inline-block tabular-nums ${className ?? ''}`}>
      {/*
        The finished figure always sits in the markup: it holds the width so
        counting digits cannot reflow the line, it gives the span its baseline,
        and it is what gets read — once, rather than every frame of the count.
        It is faded, not hidden: `visibility: hidden` would take it out of the
        accessibility tree too, and the figure would be exposed to nothing for
        as long as the count ran.
      */}
      <span className={counted === null ? undefined : 'opacity-0'}>{value}</span>
      {counted !== null && (
        /* Not selectable, so copying the figure mid-count still gives the
           figure rather than the frame it happened to be on. */
        <span aria-hidden="true" className="absolute left-0 top-0 select-none">
          {counted}
        </span>
      )}
    </span>
  );
};

export default CountUp;
