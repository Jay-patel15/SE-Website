import { getSupabaseBrowserClient } from "./supabase";
import { projects as initialProjects, services as initialServices, testimonials as initialTestimonials } from "@/constants/site";

// Baseline gallery items matching GalleryClient
const initialGalleryItems = [
  {
    id: 1,
    title: "LT Distribution Panel",
    category: "Panels",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80",
    desc: "3-phase custom fabricated power distribution panel installation."
  },
  {
    id: 2,
    title: "HT Cable Laying",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    desc: "Heavy armored HT cable trenching and routing for a manufacturing plant."
  },
  {
    id: 3,
    title: "Commercial CCTV Array",
    category: "CCTV",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    desc: "Multi-angle IP dome camera configuration connected to central NVR."
  },
  {
    id: 4,
    title: "Home Automation Console",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    desc: "IoT touch control panel for centralized lighting and security settings."
  },
  {
    id: 5,
    title: "Adani Utility Meter Setup",
    category: "Meter Work",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    desc: "Multi-meter installation board passing inspectoral safety approval."
  },
  {
    id: 6,
    title: "Double Earthing System",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    desc: "Copper plate earthing assembly with chamber for grounding safety."
  },
  {
    id: 7,
    title: "Automatic Changeover Switch",
    category: "Panels",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80",
    desc: "AMF panel layout for seamless utility-to-generator power transfer."
  },
  {
    id: 8,
    title: "Plant Earth Resistance Test",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&w=800&q=80",
    desc: "Megger compliance inspection measuring grounding loop integrity."
  }
];

export function isSupabaseActive(): boolean {
  return (
    typeof window !== "undefined" &&
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Local storage helper
function getLocalItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error("Local storage read error", e);
    return defaultValue;
  }
}

// Returns false when the browser quota (~5 MB) is full, so the admin can show a real error
function setLocalItem<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error("Local storage write error", e);
    return false;
  }
}

// Dynamic CRUD Operations
export async function getProjects(): Promise<any[]> {
  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from("projects").select("*").order("completion", { ascending: false });
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase query failed, falling back to localStorage", e);
    }
  }
  return getLocalItem("se_projects", initialProjects);
}

export async function saveProject(project: any): Promise<boolean> {
  const slug = project.slug || project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const record = { ...project, slug };

  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("projects").upsert(record);
      if (!error) return true;
      console.error("Supabase upsert error", error);
    } catch (e) {
      console.warn("Supabase upsert failed, falling back to localStorage", e);
    }
  }

  const list = await getProjects();
  const index = list.findIndex((p: any) => p.slug === slug);
  if (index >= 0) {
    list[index] = record;
  } else {
    list.unshift(record);
  }
  return setLocalItem("se_projects", list);
}

export async function deleteProject(slug: string): Promise<boolean> {
  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("projects").delete().eq("slug", slug);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase delete failed, falling back to localStorage", e);
    }
  }

  const list = await getProjects();
  const filtered = list.filter((p: any) => p.slug !== slug);
  return setLocalItem("se_projects", filtered);
}

// Services CRUD
export async function getServices(): Promise<any[]> {
  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from("services").select("*");
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase services query failed, falling back to localStorage", e);
    }
  }
  return getLocalItem("se_services", initialServices);
}

export async function saveService(service: any): Promise<boolean> {
  const slug = service.slug || service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const record = { ...service, slug };

  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("services").upsert(record);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase save failed, falling back to localStorage", e);
    }
  }

  const list = await getServices();
  const index = list.findIndex((s: any) => s.slug === slug);
  if (index >= 0) {
    list[index] = record;
  } else {
    list.unshift(record);
  }
  return setLocalItem("se_services", list);
}

export async function deleteService(slug: string): Promise<boolean> {
  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("services").delete().eq("slug", slug);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase delete failed, falling back to localStorage", e);
    }
  }

  const list = await getServices();
  const filtered = list.filter((s: any) => s.slug !== slug);
  return setLocalItem("se_services", filtered);
}

// Gallery CRUD
export async function getGallery(): Promise<any[]> {
  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from("gallery").select("*");
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase gallery query failed, falling back to localStorage", e);
    }
  }
  return getLocalItem("se_gallery", initialGalleryItems);
}

export async function saveGalleryItem(item: any): Promise<boolean> {
  const id = item.id || Date.now();
  const record = { ...item, id };

  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("gallery").upsert(record);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase save failed, falling back to localStorage", e);
    }
  }

  const list = await getGallery();
  const index = list.findIndex((g: any) => g.id === id);
  if (index >= 0) {
    list[index] = record;
  } else {
    list.unshift(record);
  }
  return setLocalItem("se_gallery", list);
}

export async function deleteGalleryItem(id: number): Promise<boolean> {
  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase delete failed, falling back to localStorage", e);
    }
  }

  const list = await getGallery();
  const filtered = list.filter((g: any) => g.id !== id);
  return setLocalItem("se_gallery", filtered);
}

// Testimonials CRUD
export async function getTestimonials(): Promise<any[]> {
  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from("testimonials").select("*");
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase testimonials query failed, falling back to localStorage", e);
    }
  }
  // Seed data has no ids; derive stable ones so edit/delete work
  return getLocalItem<any[]>("se_testimonials", initialTestimonials).map((t, i) => ({ ...t, id: t.id ?? i + 1 }));
}

export async function saveTestimonial(testimonial: any): Promise<boolean> {
  const id = testimonial.id || Date.now();
  const record = { ...testimonial, id };

  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("testimonials").upsert(record);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase save failed, falling back to localStorage", e);
    }
  }

  const list = await getTestimonials();
  const index = list.findIndex((t: any) => t.id === id);
  if (index >= 0) {
    list[index] = record;
  } else {
    list.unshift(record);
  }
  return setLocalItem("se_testimonials", list);
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase delete failed, falling back to localStorage", e);
    }
  }

  const list = await getTestimonials();
  const filtered = list.filter((t: any) => t.id !== id);
  return setLocalItem("se_testimonials", filtered);
}

// Leads CRUD
export async function getLeads(): Promise<any[]> {
  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from("contact_leads").select("*").order("created_at", { ascending: false });
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase leads query failed, falling back to localStorage", e);
    }
  }
  // Initialize standard dummy leads for initial demo dashboard look
  const initialLeads = [
    {
      id: "lead-1",
      name: "Rajesh Sharma",
      phone: "9876543210",
      email: "r.sharma@yahoo.com",
      service: "Electrical Panels",
      location: "Thane West",
      message: "Need quote for 3-phase LT control panel fabrication for a warehousing setup.",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: "lead-2",
      name: "Pooja Mehta",
      phone: "9988776655",
      email: "pooja.m@mehtaplastics.com",
      service: "Meter Passing",
      location: "Andheri East",
      message: "Required tata power new connection and load enhancement passing services.",
      createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
    }
  ];
  return getLocalItem("se_leads", initialLeads);
}

export async function saveLead(lead: any): Promise<boolean> {
  const id = lead.id || "lead-" + Date.now();
  const record = { ...lead, id, createdAt: lead.createdAt || new Date().toISOString() };

  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("contact_leads").upsert(record);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase save failed, falling back to localStorage", e);
    }
  }

  const list = await getLeads();
  list.unshift(record);
  return setLocalItem("se_leads", list);
}

export async function deleteLead(id: string): Promise<boolean> {
  if (isSupabaseActive()) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("contact_leads").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase delete failed, falling back to localStorage", e);
    }
  }

  const list = await getLeads();
  const filtered = list.filter((l: any) => l.id !== id);
  return setLocalItem("se_leads", filtered);
}

// ---------- Images ----------

// Hosts allowed in next.config.ts; anything else must skip the Next image optimizer
export function canOptimizeImage(src: string): boolean {
  return /^https:\/\/(images\.unsplash\.com|[^/]+\.supabase\.co)\//.test(src || "");
}

// Resize + re-encode to WebP in the browser so uploads stay small and pages stay fast
async function compressImage(file: File, maxWidth: number, quality: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const encode = (type: string) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  // Browsers without WebP encoding (older Safari) silently return PNG, which is huge; use JPEG instead
  const webp = await encode("image/webp");
  const blob = webp?.type === "image/webp" ? webp : await encode("image/jpeg");
  if (!blob) throw new Error("Image encoding failed");
  return blob;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/**
 * Upload an image and return a URL to store on the record.
 * Supabase: uploads to the Storage bucket named after `folder` ("projects" | "gallery") and returns its public URL.
 * No Supabase: returns a compressed WebP data URL kept in localStorage (~100-200 KB each).
 */
export async function uploadImage(file: File, folder: "projects" | "gallery"): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");

  if (isSupabaseActive()) {
    try {
      const blob = await compressImage(file, 1600, 0.82);
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${blob.type === "image/webp" ? "webp" : "jpg"}`;
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.storage.from(folder).upload(path, blob, { contentType: blob.type, upsert: false });
      if (!error) return supabase.storage.from(folder).getPublicUrl(path).data.publicUrl;
      console.warn("Supabase storage upload failed, storing inline instead", error);
    } catch (e) {
      console.warn("Supabase storage upload failed, storing inline instead", e);
    }
  }

  // ponytail: inline data URLs live in localStorage (~5 MB total, roughly 25 photos); connect Supabase Storage for more
  return blobToDataUrl(await compressImage(file, 1200, 0.75));
}
