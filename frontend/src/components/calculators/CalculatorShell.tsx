"use client";

import { useMemo, useState } from "react";

type CalculatorShellProps = {
  title: string;
  slug: string;
};

const defaults: Record<string, Record<string, number>> = {
  "ev-charging": { battery: 40, current: 20, target: 90, charger: 7, tariff: 12 },
  solar: { bill: 6000, units: 18, roof: 500, tariff: 10 },
  consumption: { wattage: 75, quantity: 8, hours: 6, tariff: 10 },
  load: { lighting: 2, ac: 4, motor: 3, misc: 1 },
  power: { voltage: 230, current: 10, pf: 0.9 },
  "cable-size": { current: 32, distance: 30, voltage: 230 },
  "voltage-drop": { current: 32, length: 30, voltage: 230, size: 6 },
  ups: { load: 1200, backup: 2 },
  generator: { running: 8, starting: 4 },
  transformer: { load: 80, demand: 0.8, pf: 0.9 },
  "home-automation": { rooms: 4, devices: 18, cctv: 1 },
  cctv: { area: 2500, floors: 2, days: 15 }
};

function compute(slug: string, values: Record<string, number>) {
  switch (slug) {
    case "ev-charging": {
      const energy = values.battery * ((values.target - values.current) / 100);
      return { "Charging Time": `${(energy / values.charger).toFixed(1)} hrs`, "Energy Consumed": `${energy.toFixed(1)} kWh`, "Charging Cost": `₹${(energy * values.tariff).toFixed(0)}` };
    }
    case "solar": {
      const capacity = Math.max(values.units / 4, values.bill / (30 * values.tariff * 4));
      return { "Required Solar Capacity": `${capacity.toFixed(1)} kW`, "Number of Panels": `${Math.ceil(capacity * 3)}`, "Monthly Savings": `₹${(capacity * 120 * values.tariff).toFixed(0)}`, "Payback Period": "3.5 - 5 years" };
    }
    case "consumption": {
      const daily = (values.wattage * values.quantity * values.hours) / 1000;
      return { "Daily Units": `${daily.toFixed(2)} kWh`, "Monthly Units": `${(daily * 30).toFixed(1)} kWh`, "Estimated Bill": `₹${(daily * 30 * values.tariff).toFixed(0)}` };
    }
    case "load": {
      const connected = values.lighting + values.ac + values.motor + values.misc;
      return { "Connected Load": `${connected.toFixed(1)} kW`, "Demand Load": `${(connected * 0.8).toFixed(1)} kW`, "Recommended MCB": `${Math.ceil((connected * 1000) / 230 / 5) * 5} A` };
    }
    case "power":
      return { "Single Phase Power": `${((values.voltage * values.current * values.pf) / 1000).toFixed(2)} kW`, "Three Phase Power": `${((1.732 * 415 * values.current * values.pf) / 1000).toFixed(2)} kW` };
    case "cable-size":
      return { "Cable Size": `${values.current <= 32 ? 6 : 10} sq mm`, "Voltage Drop": `${((values.current * values.distance * 0.018) / 6).toFixed(2)} V`, "Safety Margin": "20%" };
    case "voltage-drop": {
      const drop = (values.current * values.length * 0.018) / values.size;
      const pct = (drop / values.voltage) * 100;
      return { "Voltage Drop": `${drop.toFixed(2)} V`, "Percentage Loss": `${pct.toFixed(2)}%`, Status: pct < 3 ? "Safe" : pct < 5 ? "Warning" : "Critical" };
    }
    case "ups":
      return { "UPS Capacity": `${Math.ceil(values.load / 800)} kVA`, "Battery Bank Size": `${Math.ceil((values.load * values.backup) / 12 / 0.8)} Ah @ 12V` };
    case "generator":
      return { "Recommended Generator Size": `${Math.ceil((values.running + values.starting) * 1.25)} kVA` };
    case "transformer":
      return { "Transformer Capacity": `${Math.ceil((values.load * values.demand) / values.pf)} kVA` };
    case "home-automation":
      return { "Estimated Budget": `₹${((values.rooms * 25000) + (values.devices * 3500) + (values.cctv ? 45000 : 0)).toLocaleString("en-IN")}`, "Installation Cost": "Included after site survey" };
    case "cctv":
      return { "Camera Count": `${Math.ceil(values.area / 500) + values.floors}`, "NVR Requirement": "8/16 channel NVR", "Storage Requirement": `${Math.ceil(values.days * 0.5)} TB`, "Cost Estimate": "₹35,000 onwards" };
    default:
      return {};
  }
}

export function CalculatorShell({ title, slug }: CalculatorShellProps) {
  const [values, setValues] = useState(defaults[slug] || {});
  const results = useMemo(() => compute(slug, values), [slug, values]);

  return (
    <div className="grid grid-3">
      <form className="card" style={{ gridColumn: "span 2" }}>
        <h2>{title}</h2>
        <p className="lead">Live engineering estimates for planning. Final sizing should be validated after site survey and authority requirements.</p>
        <div className="form-grid">
          {Object.entries(values).map(([key, value]) => (
            <label key={key} style={{ display: "grid", gap: 8, fontWeight: 800, textTransform: "capitalize" }}>
              {key.replaceAll("-", " ")}
              <input className="input" type="number" value={value} onChange={(event) => setValues((current) => ({ ...current, [key]: Number(event.target.value) }))} />
            </label>
          ))}
        </div>
      </form>
      <aside className="glass" style={{ padding: 24 }}>
        <span className="eyebrow">Results</span>
        {Object.entries(results).map(([label, value]) => (
          <div key={label} style={{ borderBottom: "1px solid #d7e7e2", padding: "16px 0" }}>
            <strong>{label}</strong>
            <p style={{ margin: "6px 0 0", fontSize: 22, color: "#0D7B5F", fontWeight: 900 }}>{String(value)}</p>
          </div>
        ))}
        <div style={{ display: "grid", gap: 10, marginTop: 20 }}>
          <button className="btn btn-primary" type="button" onClick={() => window.print()}>Print Results</button>
          <a className="btn btn-secondary" href={`https://wa.me/?text=${encodeURIComponent(`${title} result request`)}`} target="_blank" rel="noreferrer">Share on WhatsApp</a>
        </div>
      </aside>
    </div>
  );
}
