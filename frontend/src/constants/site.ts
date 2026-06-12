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
  logoWide: "/brand/siddhi-electricals-logo-wide.jpg",
  logoBulb: "/brand/siddhi-electricals-bulb.png"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Tools", href: "/calculators" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
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
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
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
  { slug: "ev-charging", title: "EV Charging Time Calculator", icon: BatteryCharging },
  { slug: "solar", title: "Solar Calculator", icon: Sun },
  { slug: "consumption", title: "Consumption Calculator", icon: Calculator },
  { slug: "load", title: "Electrical Load Calculator", icon: Gauge },
  { slug: "power", title: "Electrical Power Calculator", icon: Zap },
  { slug: "cable-size", title: "Cable Size Calculator", icon: Bolt },
  { slug: "voltage-drop", title: "Voltage Drop Calculator", icon: PlugZap },
  { slug: "ups", title: "UPS Capacity Calculator", icon: BatteryCharging },
  { slug: "generator", title: "Generator Sizing Calculator", icon: Gauge },
  { slug: "transformer", title: "Transformer Calculator", icon: ShieldCheck },
  { slug: "home-automation", title: "Home Automation Calculator", icon: Home },
  { slug: "cctv", title: "CCTV Requirement Calculator", icon: Camera }
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

export const clientLogos = ["Adani", "Tata", "BEST", "Industrial Plants", "Commercial Sites", "Residential Societies"];

export const blogPosts = [
  { slug: "adani-meter-process", title: "Adani Meter Process", category: "Meter Approvals", summary: "Documents, load details, inspection steps, and common delays in Adani meter work." },
  { slug: "tata-power-connection-guide", title: "Tata Power Connection Guide", category: "Meter Approvals", summary: "A practical guide to new connections, load enhancement, and handover requirements." },
  { slug: "best-meter-passing-guide", title: "BEST Meter Passing Guide", category: "Meter Approvals", summary: "Understand meter passing workflows, site preparation, and inspection readiness." },
  { slug: "electrical-safety", title: "Electrical Safety", category: "Electrical Safety", summary: "Safety checks every industrial, commercial, and residential site should run regularly." },
  { slug: "earthing-guide", title: "Earthing Guide", category: "Electrical Safety", summary: "Earthing basics, testing expectations, and why readings matter for protection." },
  { slug: "cable-selection-guide", title: "Cable Selection Guide", category: "Industrial Installations", summary: "How current, distance, voltage drop, derating, and installation method affect cable sizing." },
  { slug: "mcb-selection-guide", title: "MCB Selection Guide", category: "Electrical Safety", summary: "MCB selection basics for safer distribution and predictable fault protection." },
  { slug: "solar-guide", title: "Solar Guide", category: "Energy Savings", summary: "Capacity, panels, roof area, ROI, and payback considerations for solar planning." },
  { slug: "home-automation-guide", title: "Home Automation Guide", category: "Smart Homes", summary: "Smart switches, scenes, voice control, CCTV integration, and practical budgets." }
];

export const downloads = [
  { title: "Company Brochure", type: "PDF", description: "Company profile, services, and contact details." },
  { title: "Technical Datasheets", type: "PDF", description: "Electrical planning references and field checklists." },
  { title: "Service Catalogue", type: "PDF", description: "Detailed service categories and support workflows." }
];

export const processSteps = [
  { title: "Consultation", description: "Understand site type, load, approval requirement, timeline, and budget." },
  { title: "Survey & Design", description: "Inspect site conditions, prepare sizing, layout, and documentation." },
  { title: "Execution", description: "Deploy licensed technicians, materials, safety checks, and supervision." },
  { title: "Testing & Handover", description: "Complete inspection, test reports, commissioning, and client handover." }
];

export const certifications = [
  { title: "Licensed Electrical Contractor", icon: ClipboardCheck },
  { title: "Safety Compliance Workflow", icon: ShieldCheck },
  { title: "Approval Documentation Support", icon: Gauge }
];
