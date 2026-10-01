import {
  BatteryCharging,
  Bolt,
  Building2,
  Calculator,
  Camera,
  ClipboardCheck,
  Factory,
  Gauge,
  Home,
  Hotel,
  Hospital,
  Landmark,
  PanelsTopLeft,
  PlugZap,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Warehouse,
  Zap
} from "lucide-react";

export const brand = {
  name: "Siddhi Electricals",
  tagline: "Powering Projects with Precision & Reliability",
  phone: "+91 99999 99999",
  email: "info@siddhielectricals.com",
  address: "Mumbai, Maharashtra, India",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999",
  hours: "Mon – Sat, 9:00 AM – 7:00 PM",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://siddhielectricals.com",
  logoWide: "/brand/siddhi-electricals-logo-wide.jpg",
  logoBulb: "/brand/siddhi-electricals-bulb.png"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Calculators", href: "/calculators" },
  { label: "Contact", href: "/contact" }
];

export const services = [
  {
    slug: "electrical-contracting",
    title: "Electrical Contracting",
    icon: Bolt,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
    summary: "HT/LT installations, distribution, wiring, and turnkey execution for demanding sites.",
    details: ["Industrial projects", "Commercial projects", "Residential projects", "HT and LT installations", "Electrical distribution", "Testing and commissioning"]
  },
  {
    slug: "electrical-consultancy",
    title: "Electrical Consultancy",
    icon: Gauge,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    summary: "Load calculations, audits, design reviews, approvals, and project planning.",
    details: ["Load calculations", "Electrical design", "Energy audits", "Project planning", "Safety audits", "Compliance documentation"]
  },
  {
    slug: "meter-passing-services",
    title: "Meter Passing Services",
    icon: PlugZap,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    summary: "Adani, Tata Power, BEST meter passing, load enhancement, and temporary connections.",
    details: ["Adani Electricity", "Tata Power", "BEST Electricity", "New connections", "Meter passing", "Load enhancement", "Temporary connections"]
  },
  {
    slug: "electrical-panels",
    title: "Electrical Panels",
    icon: PanelsTopLeft,
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=900&q=80",
    summary: "LT, MCC, PCC, control, and distribution panel planning and installation.",
    details: ["LT panels", "Distribution panels", "MCC panels", "PCC panels", "Control panels", "Panel maintenance"]
  },
  {
    slug: "cctv-solutions",
    title: "CCTV Solutions",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80",
    summary: "Residential, commercial, and industrial camera systems with smart monitoring.",
    details: ["Residential CCTV", "Commercial CCTV", "Industrial surveillance", "Remote monitoring", "NVR setup", "Storage planning"]
  },
  {
    slug: "home-automation",
    title: "Home Automation",
    icon: Home,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
    summary: "Smart lighting, switches, security, voice control, and IoT integrations.",
    details: ["Smart lighting", "Smart switches", "Voice control", "Smart security", "IoT solutions", "Scene automation"]
  },
  {
    slug: "energy-management",
    title: "Energy Management",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80",
    summary: "Energy audits, savings opportunities, and right-sized solar or backup systems.",
    details: ["Energy audits", "Consumption analysis", "Solar planning", "Demand optimization", "ROI planning", "Savings reports"]
  },
  {
    slug: "industrial-installations",
    title: "Industrial Installations",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&w=900&q=80",
    summary: "Robust electrical systems for factories, warehouses, and high-load operations.",
    details: ["Machine power", "Earthing", "Cable trays", "Load balancing", "Safety compliance", "Shutdown works"]
  },
  {
    slug: "commercial-installations",
    title: "Commercial Installations",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    summary: "Reliable electrical infrastructure for offices, retail, hospitals, and hotels.",
    details: ["Office electricals", "Retail fit-outs", "Lighting systems", "Backup power", "Meter coordination", "Maintenance plans"]
  }
];



export const differentiators = [
  "Govt. Licensed Contractor",
  "Experienced Team",
  "End-to-End Execution",
  "Fast Approvals",
  "Quality Assurance",
  "Safety Compliance",
  "On-Time Delivery",
  "Affordable Solutions"
];

export const industries = [
  { title: "Manufacturing Industries", icon: Factory },
  { title: "Commercial Buildings", icon: Building2 },
  { title: "Residential Complexes", icon: Home },
  { title: "Warehouses", icon: Warehouse },
  { title: "Hospitals", icon: Hospital },
  { title: "Educational Institutions", icon: Landmark },
  { title: "Retail Stores", icon: ShoppingBag },
  { title: "Hotels", icon: Hotel }
];

export const calculators = [
  { slug: "ev-charging", title: "EV Charging Time Calculator", description: "Calculate EV charging time, energy consumed, and charging cost.", icon: BatteryCharging },
  { slug: "solar", title: "Solar Calculator", description: "Estimate solar capacity, panels, savings, ROI, and payback period.", icon: Sun },
  { slug: "consumption", title: "Consumption Calculator", description: "Estimate appliance energy consumption and monthly electricity bill.", icon: Calculator },
  { slug: "load", title: "Electrical Load Calculator", description: "Calculate connected load, demand load, recommended MCB, and monthly bill.", icon: Gauge },
  { slug: "power", title: "Electrical Power Calculator", description: "Calculate single-phase and three-phase electrical power.", icon: Zap },
  { slug: "cable-size", title: "Cable Size Calculator", description: "Estimate cable size, voltage drop, and safety margin.", icon: Bolt },
  { slug: "voltage-drop", title: "Voltage Drop Calculator", description: "Calculate voltage drop, percentage loss, and safe/warning/critical status.", icon: PlugZap },
  { slug: "ups", title: "UPS Capacity Calculator", description: "Estimate UPS capacity and battery bank size.", icon: BatteryCharging },
  { slug: "generator", title: "Generator Sizing Calculator", description: "Estimate recommended generator size from running and starting load.", icon: Gauge },
  { slug: "transformer", title: "Transformer Calculator", description: "Estimate transformer capacity from connected load, demand factor, and power factor.", icon: ShieldCheck },
  { slug: "home-automation", title: "Home Automation Calculator", description: "Estimate smart home automation budget and installation cost.", icon: Home },
  { slug: "cctv", title: "CCTV Requirement Calculator", description: "Estimate CCTV camera count, NVR requirement, storage, and cost.", icon: Camera }
];

export const projects = [
  {
    slug: "thane-industrial-panel-upgrade",
    name: "Industrial Panel Upgrade",
    category: "Industrial",
    location: "Thane",
    completion: "2025",
    scope: "LT panels, cable routing, earthing, commissioning",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1100&q=80",
    testimonial: "The shutdown work was planned well and completed without disruption."
  },
  {
    slug: "andheri-commercial-meter-approval",
    name: "Commercial Meter Approval",
    category: "Commercial",
    location: "Andheri",
    completion: "2025",
    scope: "Load enhancement, meter passing, documentation",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1100&q=80",
    testimonial: "Their documentation support helped us move approvals faster."
  },
  {
    slug: "borivali-smart-home",
    name: "Smart Home Automation",
    category: "Home Automation",
    location: "Borivali",
    completion: "2024",
    scope: "Smart lighting, CCTV, access control",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1100&q=80",
    testimonial: "Clean wiring, simple controls, and a polished handover."
  },
  {
    slug: "navi-mumbai-warehouse-cctv",
    name: "Warehouse CCTV & Power Audit",
    category: "CCTV",
    location: "Navi Mumbai",
    completion: "2024",
    scope: "Camera coverage, NVR sizing, power audit, safety recommendations",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1100&q=80",
    testimonial: "Coverage planning was practical and easy for our operations team."
  }
];

export const testimonials = [
  { quote: "Siddhi Electricals handled approvals and execution with impressive clarity.", name: "Facilities Manager", company: "Mumbai Commercial Site" },
  { quote: "The team delivered our panel work safely and on schedule.", name: "Plant Head", company: "Manufacturing Unit" },
  { quote: "Professional consultation, clean installation, and responsive after-service.", name: "Homeowner", company: "Residential Automation Project" }
];

export const certifications = [
  { title: "Licensed Electrical Contractor", icon: ClipboardCheck },
  { title: "Safety Compliance Workflow", icon: ShieldCheck },
  { title: "Approval Documentation Support", icon: Gauge }
];

export const stats = [
  { value: "20+", label: "Years of experience" },
  { value: "100+", label: "Projects delivered" },
  { value: "500+", label: "Meters installed" },
  { value: "Govt.", label: "Licensed contractor" }
];

export const faqs = [
  { q: "Do you handle Adani, Tata Power and BEST meter connections?", a: "Yes. We prepare the test report, load documents and meter board, then coordinate the inspection for new connections, meter passing and load enhancement with Adani Electricity, Tata Power and BEST." },
  { q: "Which areas do you serve?", a: "We work across Mumbai, Thane and Navi Mumbai for industrial, commercial and residential sites. Larger industrial projects outside the region are taken up on request." },
  { q: "Are you a licensed electrical contractor?", a: "Yes. Siddhi Electricals is a Government licensed electrical contractor, and every installation is tested and documented before handover." },
  { q: "How do I get a quotation?", a: "Call, WhatsApp or send the enquiry form with your site type, approximate load and location. We arrange a site survey and share a detailed quotation." }
];
