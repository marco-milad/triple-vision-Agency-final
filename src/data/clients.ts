/**
 * Client list.
 *
 * SOURCE OF TRUTH: Company Profile 2026 (pages 18-20) lists 54 clients.
 *
 * 36 of the logos already on the site matched that list and keep their current
 * Cloudinary images. The rest have no artwork yet.
 *
 * Logos are served through Cloudinary with f_auto,q_auto,w_320.
 * TODO(client): the current images are screenshots — ask for the original logo
 * files, and for written permission to display client logos.
 */

export interface Client {
  name: string;
  /** null = in the profile, but we have no logo file yet. */
  logo: string | null;
}

/** Clients we have a logo for, in the order they currently appear on the site. */
export const clientsWithLogos: Client[] = [
  {
    name: "Samia Allouba",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349748/Screenshot_2026-02-17_170506_znfadw.jpg",
  },
  {
    name: "Hany George Labib",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349748/Screenshot_2026-02-17_172714_ycjpnt.jpg",
  },
  {
    name: "YOU Estate",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349748/Screenshot_2026-02-17_170646_pnandr.jpg",
  },
  {
    name: "Insha Engineering Industries",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349748/Screenshot_2026-02-17_170729_hjkucm.jpg",
  },
  {
    name: "Life Mattress & Linens",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349748/Screenshot_2026-02-17_172724_qvgj8x.jpg",
  },
  {
    name: "Mohamed Fouda Law & Legal Consultations",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349749/Screenshot_2026-02-17_170930_nccfjx.jpg",
  },
  {
    name: "ElGouna Gym",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349749/Screenshot_2026-02-17_172748_iezuwv.jpg",
  },
  {
    name: "Alfred Daniel",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349749/Screenshot_2026-02-17_172737_lpwowo.jpg",
  },
  {
    name: "Dr. Bishoy Ghabrial Clinic",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349749/Screenshot_2026-02-17_170919_l7xmiv.jpg",
  },
  {
    name: "TBG — Train Brain To Gain",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349749/Screenshot_2026-02-17_172756_ni1rgb.jpg",
  },
  {
    name: "El Fady",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349749/Screenshot_2026-02-17_170952_dygpqz.jpg",
  },
  {
    name: "Prof. Dr. Hamed Abdallah Hamed",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349750/Screenshot_2026-02-17_171106_kk2y4z.jpg",
  },
  {
    name: "Herba Life Health Club",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349749/Screenshot_2026-02-17_172805_ul55wr.jpg",
  },
  {
    name: "Miracle Team",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349750/Screenshot_2026-02-17_172835_xamsqe.jpg",
  },
  {
    // TODO(client): logo text is not legible — confirm the company name.
    name: "General Supplies & Agricultural Development",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349750/Screenshot_2026-02-17_172826_rhde0i.jpg",
  },
  {
    name: "High Dent Center",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349750/Screenshot_2026-02-17_172849_ngzhsu.jpg",
  },
  {
    name: "Dr. Fady Fawzy Ebied",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349750/Screenshot_2026-02-17_172815_y8cshs.jpg",
  },
  {
    name: "PAX Dental House",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349749/Screenshot_2026-02-17_171058_kd1xcj.jpg",
  },
  {
    name: "Le Nouveau Monde Real Estate",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349751/Screenshot_2026-02-17_173329_oj0yhr.jpg",
  },
  {
    name: "DRD — Diet Right Doctors",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349751/Screenshot_2026-02-17_172900_mcefyo.jpg",
  },
  {
    name: "Habbet El Khardal",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349751/Screenshot_2026-02-17_173321_oldwsr.jpg",
  },
  {
    name: "Abadir",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349751/Screenshot_2026-02-17_173259_lu2eq5.jpg",
  },
  {
    name: "Egyptra Tours",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349751/Screenshot_2026-02-17_173338_qqyesc.jpg",
  },
  {
    name: "One Stop by Gresco",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349749/Screenshot_2026-02-17_171013_ifrphh.jpg",
  },
  {
    name: "eMarketing Hub",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349753/Screenshot_2026-02-17_173347_zzso93.jpg",
  },
  {
    name: "OIF — One International Federation",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349763/Screenshot_2026-02-17_173356_svhl5o.jpg",
  },
  {
    name: "Capital for Decoration",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349763/Screenshot_2026-02-17_173405_a21usn.jpg",
  },
  {
    name: "Beit Halab Cafe & Restaurant",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349763/Screenshot_2026-02-17_173447_mlboyl.jpg",
  },
  {
    name: "Dr. Bichoy Magdi Dental Clinic",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349764/Screenshot_2026-02-17_173537_xizpfm.jpg",
  },
  {
    name: "Afham Awalan",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349764/Screenshot_2026-02-17_173558_ev3jab.jpg",
  },
  {
    name: "ACT — Arab Company for Technology",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349764/Screenshot_2026-02-17_173519_keldcj.jpg",
  },
  {
    // TODO(client): NOT in the Company Profile client list — confirm or remove.
    name: "Alaa Usama",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349764/Screenshot_2026-02-17_173656_oyoztr.jpg",
  },
  {
    name: "Al Gamal",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349764/Screenshot_2026-02-17_173649_dks6bh.jpg",
  },
  {
    name: "YT Home",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349764/Screenshot_2026-02-17_173621_e8dwrl.jpg",
  },
  {
    name: "Jackson Wedding Planner & Events",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349765/Screenshot_2026-02-17_173704_oo3ium.jpg",
  },
  {
    name: "Global Auto Parts Store",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349764/Screenshot_2026-02-17_173609_tv5mbb.jpg",
  },
  {
    name: "High Events Egypt",
    logo: "https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_320/v1771349774/Screenshot_2026-02-17_173713_wslub5.jpg",
  },
];

/** In the profile but still missing artwork — not rendered until a logo arrives. */
export const clientsPendingLogo: Client[] = [
  { name: "Technoscan Specialized Clinics", logo: null },
  { name: "Cairo Scan Specialized Clinics", logo: null },
  { name: "Treats Fashion", logo: null },
  { name: "Sweet", logo: null },
  { name: "MK Ortho Clinic", logo: null },
  { name: "Al Takween Center", logo: null },
  { name: "Auto Revive", logo: null },
  { name: "AZ Holding Printing & Packaging", logo: null },
  { name: "Dr. Enna Yossef", logo: null },
  { name: "Dr. Fouda Dental Center", logo: null },
  { name: "Global Trade Distribution", logo: null },
  { name: "Dakaken", logo: null },
  { name: "FrencHise Académie", logo: null },
  { name: "Nourish Cosmetics", logo: null },
  { name: "OJOS Studio", logo: null },
  { name: "SOLVE", logo: null },
  { name: "Diet Care", logo: null },
  { name: "Al Khatwa Al Oula", logo: null },
];

export const allClients: Client[] = [...clientsWithLogos, ...clientsPendingLogo];
