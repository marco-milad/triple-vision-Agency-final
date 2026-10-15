import { motion } from 'framer-motion';
import type { CampaignResults as Results } from '@/data/portfolio';
import CountUp from './CountUp';

/**
 * A media buying case study, which is its numbers.
 *
 * Built as real text rather than an exported board: it reads on a screen
 * reader, it can be searched and quoted, it stays sharp at any size, and a
 * figure is corrected by editing a figure.
 *
 * The forms follow what the data is doing. A handful of headline numbers is a
 * row of stat tiles, not a bar chart; the single number the page leads with is
 * one hero figure. Charts are bars, because every comparison here is magnitude.
 *
 * One rule carries the colour: the client's own hue marks the result, and
 * everything else is the de-emphasis grey. So the eye lands on the outcome on
 * every account without the page having to be re-thought for each one.
 */

/** Reads on this site's dark card and clears 3:1 against it. */
const TRACK = '#6B5A7A';
/** The spec caps a bar at 24px; the band's leftover is meant to be air. */
const BAR = 'h-6';
/**
 * A bar and the number labelling it grow over the same window, off the same
 * scroll trigger, so the figure reads as that bar's readout rather than as a
 * second thing happening beside it.
 */
const GROW_MS = 700;
const TRIGGER_MARGIN = '-60px';

interface CampaignResultsProps {
  results: Results;
  accent?: string;
}

const Bar = ({
  fraction,
  colour,
  delay = 0,
}: {
  fraction: number;
  colour: string;
  delay?: number;
}) => (
  <motion.span
    initial={{ width: 0 }}
    whileInView={{ width: `${Math.max(fraction * 100, 1.5)}%` }}
    viewport={{ once: true, margin: TRIGGER_MARGIN }}
    transition={{ duration: GROW_MS / 1000, delay, ease: [0.22, 0.61, 0.36, 1] }}
    /* Square where it grows from, rounded at the data end. */
    className={`${BAR} rounded-r-[4px] block`}
    style={{ backgroundColor: colour }}
  />
);

/** The number beside a bar, counting on that bar's clock. */
const Readout = ({
  display,
  delay = 0,
  className,
}: {
  display: string;
  delay?: number;
  className?: string;
}) => (
  <CountUp
    value={display}
    durationMs={GROW_MS}
    delayMs={delay * 1000}
    rootMargin={TRIGGER_MARGIN}
    className={className}
  />
);

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="grid grid-cols-[7rem_1fr] sm:grid-cols-[10rem_1fr] items-center gap-4">
    <span className="text-sm text-muted-foreground text-right leading-tight">{label}</span>
    <div className="flex items-center gap-3 min-w-0">{children}</div>
  </div>
);

const CampaignResultsPanel = ({ results, accent }: CampaignResultsProps) => {
  const highlight = accent ?? 'var(--brand, hsl(var(--primary)))';
  const peak = Math.max(...results.funnel.map((s) => s.value), 1);

  return (
    <div className="space-y-16">
      {/* The one number the page leads with. */}
      <div>
        <p className="text-muted-foreground text-sm uppercase tracking-wider font-semibold mb-3">
          {results.objective}
        </p>
        <p
          data-hero-figure
          className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-none"
        >
          {/* The lead number gets a touch longer than the bars: it is the one
              figure a visitor is meant to watch arrive. */}
          <CountUp value={results.headline.value} durationMs={1200} />
        </p>
        <p className="text-muted-foreground text-lg mt-3 max-w-xl">{results.headline.label}</p>
      </div>

      {/*
        The proof, and the only part that differs between the two templates.
        An efficiency brief is proved by what a result used to cost; a scale
        brief by what came back against what went in.
      */}
      {results.template === 'efficiency' && results.benchmark && (
        <figure className="m-0">
          <figcaption className="text-sm font-semibold text-foreground mb-5">
            {results.benchmark.label}
          </figcaption>

          <div className="space-y-3">
            {[
              { ...results.benchmark.before, value: results.benchmark.beforeValue, result: false },
              { ...results.benchmark.after, value: results.benchmark.afterValue, result: true },
            ].map((point, i) => (
              <Row key={point.display} label={i === 0 ? 'Before' : 'After'}>
                <Bar
                  fraction={point.value / Math.max(results.benchmark!.beforeValue, 1)}
                  colour={point.result ? highlight : TRACK}
                  delay={i * 0.12}
                />
                <span className="flex items-baseline gap-2 whitespace-nowrap">
                  <Readout
                    display={point.display}
                    delay={i * 0.12}
                    className={`text-sm ${
                      point.result ? 'text-foreground font-bold' : 'text-muted-foreground'
                    }`}
                  />
                  <span className="text-xs text-muted-foreground/70">{point.note}</span>
                </span>
              </Row>
            ))}
          </div>
        </figure>
      )}

      {results.template === 'scale' && results.economics && (
        <figure className="m-0">
          <figcaption className="text-sm font-semibold text-foreground mb-5">
            What went in, and what came back
          </figcaption>

          <div className="space-y-3">
            {[
              { ...results.economics.spend, label: 'Media spend', result: false },
              { ...results.economics.returned, label: 'Tracked revenue', result: true },
            ].map((point, i) => (
              <Row key={point.label} label={point.label}>
                {/* Both in the same unit, so they share one scale — two
                    measures on two scales would not be comparable. */}
                <Bar
                  fraction={point.value / Math.max(results.economics!.returned.value, 1)}
                  colour={point.result ? highlight : TRACK}
                  delay={i * 0.12}
                />
                <Readout
                  display={point.display}
                  delay={i * 0.12}
                  className={`text-sm whitespace-nowrap ${
                    point.result ? 'text-foreground font-bold' : 'text-muted-foreground'
                  }`}
                />
              </Row>
            ))}
          </div>
        </figure>
      )}

      {/* The supporting figures. Values in ink; the colour stays on the charts. */}
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/50 rounded-2xl overflow-hidden border-2 border-border/50">
        {results.figures.map((figure, i) => (
          <div key={figure.label} className="bg-background p-5 sm:p-6">
            <dt className="text-xs text-muted-foreground/70 font-semibold uppercase tracking-wider mb-2">
              {figure.label}
            </dt>
            <dd className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
              {/* Staggered across the row so the four read left to right rather
                  than flickering as one block. */}
              <CountUp value={figure.value} durationMs={900} delayMs={i * 90} />
            </dd>
            {figure.note && <p className="text-xs text-muted-foreground/70 mt-2">{figure.note}</p>}
          </div>
        ))}
      </dl>

      {/* Reach down to results. Every stage carries its own number, so nothing
          is read off an axis, and only the last takes the client's colour. */}
      <figure className="m-0">
        <figcaption className="text-sm font-semibold text-foreground mb-5">
          From reach to results
        </figcaption>

        <div className="space-y-3">
          {results.funnel.map((stage, i) => {
            const last = i === results.funnel.length - 1;
            return (
              <Row key={stage.stage} label={stage.stage}>
                <Bar fraction={stage.value / peak} colour={last ? highlight : TRACK} delay={i * 0.08} />
                <Readout
                  display={stage.display}
                  delay={i * 0.08}
                  className={`text-sm whitespace-nowrap ${
                    last ? 'text-foreground font-bold' : 'text-muted-foreground'
                  }`}
                />
              </Row>
            );
          })}
        </div>
      </figure>

      {/* Where the money went. Context rather than the point, so no accent. */}
      {results.spendSplit && results.spendSplit.length > 0 && (
        <figure className="m-0">
          <figcaption className="text-sm font-semibold text-foreground mb-5">
            Where the budget went
          </figcaption>
          <div className="space-y-3">
            {results.spendSplit.map((channel, i) => (
              <Row key={channel.channel} label={channel.channel}>
                <Bar
                  fraction={
                    channel.value / Math.max(...results.spendSplit!.map((c) => c.value), 1)
                  }
                  colour={TRACK}
                  delay={i * 0.08}
                />
                <Readout
                  display={channel.display}
                  delay={i * 0.08}
                  className="text-sm text-muted-foreground whitespace-nowrap"
                />
              </Row>
            ))}
          </div>
        </figure>
      )}

      {/* The same figures as a table, so a chart is never the only way in. */}
      <details className="group">
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors list-none inline-flex items-center gap-2">
          <span className="transition-transform group-open:rotate-90">›</span>
          See the figures as a table
        </summary>
        <table className="mt-4 w-full max-w-md text-sm border-collapse">
          <caption className="sr-only">{results.objective}, stage by stage</caption>
          <thead>
            <tr className="border-b border-border/50">
              <th scope="col" className="text-left py-2 font-semibold text-muted-foreground">
                Stage
              </th>
              <th scope="col" className="text-right py-2 font-semibold text-muted-foreground">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {results.funnel.map((stage) => (
              <tr key={stage.stage} className="border-b border-border/30">
                <th scope="row" className="text-left py-2 font-normal text-muted-foreground">
                  {stage.stage}
                </th>
                <td className="text-right py-2 tabular-nums text-foreground">{stage.display}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <div className="grid sm:grid-cols-2 gap-8 pt-2 border-t border-border/50">
        <div>
          <p className="text-xs text-muted-foreground/70 font-semibold uppercase tracking-wider mb-2">
            Ran on
          </p>
          <p className="text-foreground font-semibold">{results.platforms.join(' · ')}</p>
          <p className="text-muted-foreground text-sm mt-1">{results.window}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground/70 font-semibold uppercase tracking-wider mb-2">
            What we did
          </p>
          {results.approach.map((line) => (
            <p key={line} className="text-muted-foreground leading-relaxed mb-2">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignResultsPanel;
