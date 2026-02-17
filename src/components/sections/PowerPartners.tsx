import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: 'Partner 1', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349748/Screenshot_2026-02-17_170506_znfadw.jpg' },
  { name: 'Partner 2', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349748/Screenshot_2026-02-17_172714_ycjpnt.jpg' },
  { name: 'Partner 3', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349748/Screenshot_2026-02-17_170646_pnandr.jpg' },
  { name: 'Partner 4', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349748/Screenshot_2026-02-17_170729_hjkucm.jpg' },
  { name: 'Partner 5', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349748/Screenshot_2026-02-17_172724_qvgj8x.jpg' },
  { name: 'Partner 6', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349749/Screenshot_2026-02-17_170930_nccfjx.jpg' },
  { name: 'Partner 7', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349749/Screenshot_2026-02-17_172748_iezuwv.jpg' },
  { name: 'Partner 8', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349749/Screenshot_2026-02-17_172737_lpwowo.jpg' },
  { name: 'Partner 9', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349749/Screenshot_2026-02-17_170919_l7xmiv.jpg' },
  { name: 'Partner 10', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349749/Screenshot_2026-02-17_172756_ni1rgb.jpg' },
  { name: 'Partner 11', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349749/Screenshot_2026-02-17_170952_dygpqz.jpg' },
  { name: 'Partner 12', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349750/Screenshot_2026-02-17_171106_kk2y4z.jpg' },
  { name: 'Partner 13', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349749/Screenshot_2026-02-17_172805_ul55wr.jpg' },
  { name: 'Partner 14', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349750/Screenshot_2026-02-17_172835_xamsqe.jpg' },
  { name: 'Partner 15', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349750/Screenshot_2026-02-17_172826_rhde0i.jpg' },
  { name: 'Partner 16', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349750/Screenshot_2026-02-17_172849_ngzhsu.jpg' },
  { name: 'Partner 17', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349750/Screenshot_2026-02-17_172815_y8cshs.jpg' },
  { name: 'Partner 18', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349749/Screenshot_2026-02-17_171058_kd1xcj.jpg' },
  { name: 'Partner 19', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349751/Screenshot_2026-02-17_173329_oj0yhr.jpg' },
  { name: 'Partner 20', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349751/Screenshot_2026-02-17_172900_mcefyo.jpg' },
  { name: 'Partner 21', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349751/Screenshot_2026-02-17_173321_oldwsr.jpg' },
  { name: 'Partner 22', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349751/Screenshot_2026-02-17_173259_lu2eq5.jpg' },
  { name: 'Partner 23', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349751/Screenshot_2026-02-17_173338_qqyesc.jpg' },
  { name: 'Partner 24', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349749/Screenshot_2026-02-17_171013_ifrphh.jpg' },
  { name: 'Partner 25', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349753/Screenshot_2026-02-17_173347_zzso93.jpg' },
  { name: 'Partner 26', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349763/Screenshot_2026-02-17_173356_svhl5o.jpg' },
  { name: 'Partner 27', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349763/Screenshot_2026-02-17_173405_a21usn.jpg' },
  { name: 'Partner 28', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349763/Screenshot_2026-02-17_173447_mlboyl.jpg' },
  { name: 'Partner 29', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349764/Screenshot_2026-02-17_173537_xizpfm.jpg' },
  { name: 'Partner 30', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349764/Screenshot_2026-02-17_173558_ev3jab.jpg' },
  { name: 'Partner 31', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349764/Screenshot_2026-02-17_173519_keldcj.jpg' },
  { name: 'Partner 32', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349764/Screenshot_2026-02-17_173656_oyoztr.jpg' },
  { name: 'Partner 33', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349764/Screenshot_2026-02-17_173649_dks6bh.jpg' },
  { name: 'Partner 34', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349764/Screenshot_2026-02-17_173621_e8dwrl.jpg' },
  { name: 'Partner 35', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349765/Screenshot_2026-02-17_173704_oo3ium.jpg' },
  { name: 'Partner 36', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349764/Screenshot_2026-02-17_173609_tv5mbb.jpg' },
  { name: 'Partner 37', logo: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1771349774/Screenshot_2026-02-17_173713_wslub5.jpg' },
];

const MARQUEE_DURATION = 120;

const PowerPartners = React.memo(() => {
  const third = Math.ceil(partners.length / 3);
  const firstRow = partners.slice(0, third);
  const secondRow = partners.slice(third, third * 2);
  const thirdRow = partners.slice(third * 2);

  return (
    <section className="section-padding bg-gradient-to-br from-background-secondary via-background to-background-secondary relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]" />
      </div>

      {/* Static Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Trusted By The Best
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Power Partners
            </span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            We collaborate with industry-leading brands to deliver exceptional creative solutions.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="mt-6 h-1.5 w-32 mx-auto bg-gradient-to-r from-primary via-orange-500 to-pink-500 rounded-full shadow-lg shadow-primary/50"
          />
        </motion.div>

        {/* Marquee Rows */}
        <div className="space-y-8 overflow-hidden">
          {/* Row 1 - Left to Right */}
          <div className="flex gap-8 overflow-hidden">
            <motion.div
              className="flex gap-8 shrink-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: MARQUEE_DURATION, repeat: Infinity, ease: 'linear' }}
            >
              {[...firstRow, ...firstRow].map((partner, index) => (
                <PartnerCard key={`row1-${index}`} partner={partner} />
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="flex gap-8 overflow-hidden">
            <motion.div
              className="flex gap-8 shrink-0"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: MARQUEE_DURATION, repeat: Infinity, ease: 'linear' }}
            >
              {[...secondRow, ...secondRow].map((partner, index) => (
                <PartnerCard key={`row2-${index}`} partner={partner} />
              ))}
            </motion.div>
          </div>

          {/* Row 3 - Left to Right */}
          <div className="flex gap-8 overflow-hidden">
            <motion.div
              className="flex gap-8 shrink-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: MARQUEE_DURATION * 1.2, repeat: Infinity, ease: 'linear' }}
            >
              {[...thirdRow, ...thirdRow].map((partner, index) => (
                <PartnerCard key={`row3-${index}`} partner={partner} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

const PartnerCard = ({ partner }: { partner: Partner }) => (
  <motion.div
    className="group relative shrink-0"
    whileHover={{ scale: 1.15, y: -8 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
  >
    {/* Glow effect on hover */}
    <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/20 blur-xl transition-all duration-300 scale-110" />

    <div className="relative flex items-center justify-center h-24 w-40 rounded-2xl border-2 border-border/50 bg-background/60 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
      <img
        src={partner.logo}
        alt={partner.name}
        loading="lazy"
        className="h-20 w-36 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(255,140,0,0.6)] transition-all duration-400 rounded-lg"
      />
    </div>
  </motion.div>
);

PowerPartners.displayName = 'PowerPartners';

export default PowerPartners;