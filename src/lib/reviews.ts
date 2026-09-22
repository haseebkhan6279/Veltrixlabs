export type Review = {
  quote: string;
  name: string;
  role: string;
  product: string;
  rating: 5;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "Peak-hour bookings used to land in WhatsApp chaos. Velay Pro gave us a live court console the staff actually use — and the player app on iOS and Android.",
    name: "Imran S.",
    role: "Venue operations",
    product: "Velay Pro",
    rating: 5,
  },
  {
    quote:
      "Ostello replaced spreadsheets across beds, billing, and security. Twelve modules, one staff login. Occupancy is finally a dashboard, not a guess.",
    name: "Nadia R.",
    role: "Hostel director",
    product: "OSTELLO",
    rating: 5,
  },
  {
    quote:
      "After-hours calls were leaking revenue. Zallo answers, books the slot, and drops a ticket in the CRM. We only jump in on exceptions.",
    name: "Daniel H.",
    role: "Clinic operations",
    product: "Zallo.ai",
    rating: 5,
  },
  {
    quote:
      "They shipped a storefront, admin, and roughly 3,200 location pages from a real catalogue — not empty keyword URLs. Search traffic followed the inventory.",
    name: "Marcus T.",
    role: "E-commerce lead",
    product: "Buy4Low",
    rating: 5,
  },
  {
    quote:
      "Inquiries and PM loan applications now sit in one console with the public site. Plot inventory and follow-ups stopped living in inboxes.",
    name: "Hassan M.",
    role: "Property desk",
    product: "GT Estate",
    rating: 5,
  },
  {
    quote:
      "Quoted phones, graded stock, IMEI inventory, and dual-currency invoices. The wholesale desk and the storefront finally share one source of truth.",
    name: "James P.",
    role: "Wholesale ops, UK",
    product: "Atlantic Devices",
    rating: 5,
  },
  {
    quote:
      "Timesheets used to break payroll. Now one approval writes both the invoice and the pay run — tenants stay isolated.",
    name: "Sana K.",
    role: "Workforce ops",
    product: "ManpowerHub",
    rating: 5,
  },
  {
    quote:
      "Cruise-port pickups need a fare before the ship docks. Guests book online, know the price, and we stop the WhatsApp scramble.",
    name: "Oliver W.",
    role: "Transfer desk, UK",
    product: "Southampton Port Taxi",
    rating: 5,
  },
];
