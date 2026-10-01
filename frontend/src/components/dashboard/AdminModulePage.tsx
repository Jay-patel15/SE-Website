"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  ImagePlus,
  Loader2,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  Upload,
  X
} from "lucide-react";
import {
  deleteGalleryItem,
  deleteLead,
  deleteProject,
  deleteService,
  deleteTestimonial,
  getGallery,
  getLeads,
  getProjects,
  getServices,
  getTestimonials,
  saveGalleryItem,
  saveProject,
  saveService,
  saveTestimonial,
  uploadImage
} from "@/lib/dataClient";

type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select" | "image" | "lines";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
  half?: boolean;
};

type ModuleConfig = {
  singular: string;
  description: string;
  load: () => Promise<any[]>;
  save?: (record: any) => Promise<boolean>;
  remove: (id: any) => Promise<boolean>;
  id: (item: any) => any;
  title: (item: any) => string;
  subtitle: (item: any) => string;
  imageFolder?: "projects" | "gallery";
  fields: Field[];
};

const modules: Record<string, ModuleConfig> = {
  Projects: {
    singular: "Project",
    description: "Projects shown on the Projects page.",
    load: getProjects,
    save: saveProject,
    remove: deleteProject,
    id: (p) => p.slug,
    title: (p) => p.name,
    subtitle: (p) => `${p.location} · ${p.completion}`,
    imageFolder: "projects",
    fields: [
      { key: "image", label: "Photo", type: "image" },
      { key: "name", label: "Project name", placeholder: "e.g. Andheri panel upgrade" },
      { key: "category", label: "Category", type: "select", options: ["Industrial", "Commercial", "Residential", "Home Automation", "CCTV", "Meter Work"], half: true },
      { key: "completion", label: "Completion year", placeholder: "2025", half: true },
      { key: "location", label: "Location", placeholder: "e.g. Thane West" },
      { key: "scope", label: "Scope of work (comma separated)", type: "textarea", placeholder: "LT panels, cable routing, earthing" },
      { key: "testimonial", label: "Client feedback", type: "textarea", optional: true }
    ]
  },
  Gallery: {
    singular: "Photo",
    description: "Photos shown on the Gallery page.",
    load: getGallery,
    save: saveGalleryItem,
    remove: (id) => deleteGalleryItem(Number(id)),
    id: (g) => g.id,
    title: (g) => g.title,
    subtitle: (g) => g.desc,
    imageFolder: "gallery",
    fields: [
      { key: "image", label: "Photo", type: "image" },
      { key: "title", label: "Title", placeholder: "e.g. LT distribution panel" },
      { key: "category", label: "Category", type: "select", options: ["Panels", "Industrial", "CCTV", "Automation", "Meter Work", "Safety"] },
      { key: "desc", label: "Short description", type: "textarea" }
    ]
  },
  Services: {
    singular: "Service",
    description: "Service records (website service pages are generated from site.ts).",
    load: getServices,
    save: saveService,
    remove: deleteService,
    id: (s) => s.slug,
    title: (s) => s.title,
    subtitle: (s) => s.summary,
    fields: [
      { key: "title", label: "Service title" },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "details", label: "Scope items (one per line)", type: "lines" },
      { key: "image", label: "Image URL", placeholder: "https://…" }
    ]
  },
  Testimonials: {
    singular: "Testimonial",
    description: "Client feedback.",
    load: getTestimonials,
    save: saveTestimonial,
    remove: (id) => deleteTestimonial(Number(id)),
    id: (t) => t.id,
    title: (t) => t.name,
    subtitle: (t) => `${t.company} · “${t.quote}”`,
    fields: [
      { key: "name", label: "Client name / role", half: true },
      { key: "company", label: "Company / site", half: true },
      { key: "quote", label: "Feedback", type: "textarea" }
    ]
  },
  Leads: {
    singular: "Lead",
    description: "Enquiries from the contact form.",
    load: getLeads,
    remove: deleteLead,
    id: (l) => l.id,
    title: (l) => l.name,
    subtitle: (l) => `${l.service} · ${l.phone}`,
    fields: []
  }
};

function leadDate(lead: any) {
  const d = lead.createdAt || lead.created_at;
  return d ? new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "";
}

function exportCsv(leads: any[]) {
  const cols = ["name", "phone", "email", "service", "location", "message"];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
  const csv = [[...cols, "date"].join(","), ...leads.map((l) => [...cols.map((c) => esc(l[c])), esc(leadDate(l))].join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `siddhi-leads-${new Date().toISOString().slice(0, 10)}.csv` });
  a.click();
  URL.revokeObjectURL(url);
}

function ImageField({ value, onChange, folder, onError }: { value: string; onChange: (v: string) => void; folder: "projects" | "gallery"; onError: (msg: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);

  async function handleFile(file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadImage(file, folder));
    } catch (e: any) {
      onError(e?.message || "Image upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div
        className="dropzone"
        data-drag={drag}
        role="button"
        tabIndex={0}
        aria-label={value ? "Replace photo" : "Upload photo"}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value && <img src={value} alt="Selected photo preview" />}
        {busy ? (
          <Loader2 size={28} className="animate-spin" style={{ position: "relative" }} />
        ) : !value ? (
          <>
            <ImagePlus size={30} />
            <strong>Click or drop a photo here</strong>
            <small>JPG, PNG or WebP · auto-compressed</small>
          </>
        ) : null}
      </div>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ""; }} />
      <div className="dropzone-actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => inputRef.current?.click()} disabled={busy}>
          <Upload size={16} /> {value ? "Replace photo" : "Upload photo"}
        </button>
        {value && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange("")} disabled={busy}>
            <X size={16} /> Remove
          </button>
        )}
      </div>
      <input
        className="input"
        style={{ marginTop: 10 }}
        placeholder="…or paste an image URL"
        value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value.trim())}
        aria-label="Image URL"
      />
    </div>
  );
}

export function AdminModulePage({ title }: { title: string }) {
  const config = modules[title];
  const [items, setItems] = useState<any[] | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [editing, setEditing] = useState<{ isNew: boolean; data: Record<string, any> } | null>(null);
  const [viewing, setViewing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);

  const reload = () => config.load().then(setItems).catch(() => notify(false, `Couldn't load ${title.toLowerCase()}.`));

  useEffect(() => {
    reload();
    // Dashboard shortcuts link here with ?new=1
    if (config.save && new URLSearchParams(window.location.search).has("new")) openEditor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    if (!editing && !viewing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setEditing(null), setViewing(null));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing, viewing]);

  function notify(ok: boolean, text: string) {
    setToast({ ok, text });
    setTimeout(() => setToast(null), 3500);
  }

  function openEditor(item?: any) {
    const data: Record<string, any> = { ...(item || {}) };
    config.fields.forEach((f) => {
      if (f.type === "lines" && Array.isArray(data[f.key])) data[f.key] = data[f.key].join("\n");
      data[f.key] ??= "";
    });
    setEditing({ isNew: !item, data });
  }

  const setField = (key: string, value: any) => setEditing((e) => e && { ...e, data: { ...e.data, [key]: value } });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing || !config.save) return;
    if (config.imageFolder && !editing.data.image) return notify(false, "Please add a photo.");

    const record = { ...editing.data };
    config.fields.forEach((f) => {
      if (f.type === "lines") record[f.key] = String(record[f.key]).split("\n").map((l) => l.trim()).filter(Boolean);
    });

    setSaving(true);
    const ok = await config.save(record).catch(() => false);
    setSaving(false);
    if (!ok) return notify(false, "Couldn't save. Browser storage may be full: remove some photos or connect Supabase.");
    notify(true, editing.isNew ? `${config.singular} added` : "Changes saved");
    setEditing(null);
    reload();
  }

  async function handleDelete(item: any) {
    if (!window.confirm(`Delete "${config.title(item)}"? This cannot be undone.`)) return;
    const ok = await config.remove(config.id(item)).catch(() => false);
    notify(ok, ok ? "Deleted" : "Couldn't delete.");
    if (ok) {
      setViewing(null);
      reload();
    }
  }

  if (!config) return <p className="admin-empty">Unknown module.</p>;

  const categories = ["All", ...Array.from(new Set((items || []).map((i) => i.category).filter(Boolean)))];
  const q = query.toLowerCase().trim();
  const visible = (items || []).filter(
    (i) =>
      (category === "All" || i.category === category) &&
      (!q || [config.title(i), config.subtitle(i), i.category, i.email, i.message].join(" ").toLowerCase().includes(q))
  );
  const isLeads = title === "Leads";

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>{title}</h1>
          <p>{config.description} {items ? `${items.length} total.` : ""}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {isLeads && !!items?.length && (
            <button className="btn btn-ghost btn-sm" onClick={() => exportCsv(visible)}><Download size={16} /> Export CSV</button>
          )}
          {config.save && (
            <button className="btn btn-primary btn-sm" onClick={() => openEditor()}><Plus size={16} /> Add {config.singular.toLowerCase()}</button>
          )}
        </div>
      </div>

      <div className="admin-toolbar">
        <label className="admin-search">
          <Search size={16} />
          <input className="input" placeholder={`Search ${title.toLowerCase()}…`} value={query} onChange={(e) => setQuery(e.target.value)} aria-label={`Search ${title}`} />
        </label>
        {categories.length > 2 && (
          <div className="admin-chips" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <button key={c} className="filter-btn" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
        )}
      </div>

      {!items ? (
        <div className={config.imageFolder ? "admin-grid" : ""} style={config.imageFolder ? undefined : { display: "grid", gap: 10 }}>
          {[0, 1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: config.imageFolder ? 240 : 64 }} />)}
        </div>
      ) : visible.length === 0 ? (
        <div className="card admin-empty">
          {items.length === 0 ? `No ${title.toLowerCase()} yet.` : "Nothing matches your search."}
          {config.save && items.length === 0 && (
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-primary btn-sm" onClick={() => openEditor()}><Plus size={16} /> Add the first one</button>
            </div>
          )}
        </div>
      ) : config.imageFolder ? (
        <div className="admin-grid">
          {visible.map((item) => (
            <article className="card admin-card" key={config.id(item)}>
              <button className="admin-thumb" onClick={() => openEditor(item)} style={{ border: 0, padding: 0, cursor: "pointer" }} aria-label={`Edit ${config.title(item)}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {item.image ? <img src={item.image} alt="" loading="lazy" decoding="async" /> : null}
                {item.category && <span className="tag">{item.category}</span>}
              </button>
              <div className="admin-card-body">
                <strong>{config.title(item)}</strong>
                <span>{config.subtitle(item)}</span>
              </div>
              <div className="admin-card-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => openEditor(item)}><Pencil size={14} /> Edit</button>
                <button className="icon-btn danger" onClick={() => handleDelete(item)} aria-label={`Delete ${config.title(item)}`}><Trash2 size={16} /></button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="card admin-list">
          {visible.map((item) => (
            <div className="admin-row" key={config.id(item)}>
              <div className="admin-row-main">
                <strong>{config.title(item)}</strong>
                <span>{config.subtitle(item)}</span>
              </div>
              {isLeads && <span className="admin-row-meta">{leadDate(item)}</span>}
              <div className="admin-actions">
                {isLeads ? (
                  <button className="icon-btn" onClick={() => setViewing(item)} aria-label={`View ${item.name}`}><Eye size={16} /></button>
                ) : (
                  <button className="icon-btn" onClick={() => openEditor(item)} aria-label={`Edit ${config.title(item)}`}><Pencil size={16} /></button>
                )}
                <button className="icon-btn danger" onClick={() => handleDelete(item)} aria-label={`Delete ${config.title(item)}`}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="admin-overlay" onClick={() => setEditing(null)}>
          <form className="admin-panel" onClick={(e) => e.stopPropagation()} onSubmit={handleSave} role="dialog" aria-modal="true" aria-label={`${editing.isNew ? "Add" : "Edit"} ${config.singular}`}>
            <div className="admin-panel-head">
              <h2>{editing.isNew ? `Add ${config.singular.toLowerCase()}` : `Edit ${config.singular.toLowerCase()}`}</h2>
              <button type="button" className="icon-btn" onClick={() => setEditing(null)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="admin-panel-body">
              <div className="form-grid">
                {config.fields.map((f) => {
                  const value = editing.data[f.key] ?? "";
                  const span = f.half ? undefined : "full-span";
                  if (f.type === "image") {
                    return (
                      <div className="field full-span" key={f.key}>
                        {f.label}
                        <ImageField value={value} onChange={(v) => setField(f.key, v)} folder={config.imageFolder!} onError={(m) => notify(false, m)} />
                      </div>
                    );
                  }
                  return (
                    <label className={`field ${span || ""}`} key={f.key}>
                      <span>{f.label} {f.optional && <small>(optional)</small>}</span>
                      {f.type === "select" ? (
                        <select className="select" value={value} required={!f.optional} onChange={(e) => setField(f.key, e.target.value)}>
                          <option value="" disabled>Select…</option>
                          {/* keep a legacy value selectable even if it's not in the list */}
                          {[...new Set([...(f.options || []), ...(value ? [value] : [])])].map((o) => <option key={o}>{o}</option>)}
                        </select>
                      ) : f.type === "textarea" || f.type === "lines" ? (
                        <textarea className="textarea" value={value} required={!f.optional} placeholder={f.placeholder} onChange={(e) => setField(f.key, e.target.value)} />
                      ) : (
                        <input className="input" value={value} required={!f.optional} placeholder={f.placeholder} onChange={(e) => setField(f.key, e.target.value)} />
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="admin-panel-foot">
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? <Loader2 size={18} className="animate-spin" /> : editing.isNew ? `Add ${config.singular.toLowerCase()}` : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {viewing && (
        <div className="admin-overlay" onClick={() => setViewing(null)}>
          <div className="admin-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Lead details">
            <div className="admin-panel-head">
              <h2>{viewing.name}</h2>
              <button className="icon-btn" onClick={() => setViewing(null)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="admin-panel-body">
              <dl className="detail-list">
                {[
                  ["Phone", viewing.phone],
                  ["Email", viewing.email || "–"],
                  ["Service", viewing.service],
                  ["Location", viewing.location || "–"],
                  ["Received", leadDate(viewing)],
                  ["Message", viewing.message]
                ].map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <a className="btn btn-primary btn-sm" href={`tel:${String(viewing.phone).replace(/\s/g, "")}`}><Phone size={16} /> Call</a>
                <a className="btn btn-secondary btn-sm" href={`https://wa.me/${String(viewing.phone).replace(/\D/g, "").replace(/^(\d{10})$/, "91$1")}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a>
                {viewing.email && <a className="btn btn-ghost btn-sm" href={`mailto:${viewing.email}`}>Email</a>}
              </div>
            </div>
            <div className="admin-panel-foot">
              <button className="btn btn-ghost" onClick={() => handleDelete(viewing)}><Trash2 size={16} /> Delete lead</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.ok ? "ok" : "error"}`} role="status">
          {toast.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />} {toast.text}
        </div>
      )}
    </>
  );
}
