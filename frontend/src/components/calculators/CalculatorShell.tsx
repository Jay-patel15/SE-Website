"use client";

import { useMemo, useState } from "react";
import { brand } from "@/constants/site";

type CalculatorShellProps = {
  title: string;
  slug: string;
};

const defaults: Record<string, Record<string, any>> = {
  "ev-charging": { battery: 40, current: 20, target: 90, charger: 7, tariff: 12 },
  solar: { bill: 6000, units: 18, roof: 500, tariff: 10 },
  consumption: { wattage: 75, quantity: 8, hours: 6, tariff: 10 },
  load: {
    appliances: [
      { name: "Tube Light / Decorative Light", defaultWatts: 40, unit: "Watts", watts: 40, quantity: 10, hours: 5 },
      { name: "CFL / LED", defaultWatts: 20, unit: "Watts", watts: 20, quantity: 20, hours: 5 },
      { name: "Fan", defaultWatts: 75, unit: "Inches", options: [36, 48, 56], watts: 75, quantity: 1, hours: 11 },
      { name: "Table Fan", defaultWatts: 40, unit: "Watts", watts: 40, quantity: 0, hours: 11 },
      { name: "Iron", defaultWatts: 750, unit: "Watts", watts: 750, quantity: 1, hours: 0.5 },
      { name: "Geyser", defaultWatts: 3000, unit: "Watts", watts: 3000, quantity: 2, hours: 1 },
      { name: "Air Conditioner", defaultWatts: 1500, unit: "Ton", options: [1, 1.5, 2, 2.5], watts: 3000, quantity: 2, hours: 6 },
      { name: "Refrigerator", defaultWatts: 300, unit: "Litres", watts: 300, quantity: 1, hours: 24 },
      { name: "Washing Machine", defaultWatts: 200, unit: "Watts", watts: 200, quantity: 1, hours: 1 },
      { name: "Oven", defaultWatts: 3000, unit: "Watts", watts: 3000, quantity: 1, hours: 0.5 },
      { name: "Toaster", defaultWatts: 1000, unit: "Watts", watts: 1000, quantity: 0, hours: 0.5 },
      { name: "Mixer", defaultWatts: 200, unit: "Watts", watts: 200, quantity: 1, hours: 0.5 },
      { name: "Cooker / Coffee Machine", defaultWatts: 1500, unit: "Watts", watts: 1500, quantity: 1, hours: 0.5 },
      { name: "Cooking Range", defaultWatts: 5000, unit: "Watts", watts: 5000, quantity: 0, hours: 1 },
      { name: "Television", defaultWatts: 150, unit: "Watts", watts: 150, quantity: 1, hours: 6 },
      { name: "Computer", defaultWatts: 200, unit: "Watts", watts: 200, quantity: 1, hours: 11 },
      { name: "Miscellaneous", defaultWatts: 1000, unit: "Watts", watts: 1000, quantity: 1, hours: 3 }
    ]
  },
  power: { voltage: 230, current: 10, pf: 0.9 },
  "cable-size": { current: 32, distance: 30, voltage: 230, material: "copper" },
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
      const appliances = Array.isArray(values.appliances) ? values.appliances : [];
      let connected = 0;
      let dailyConsumption = 0;
      
      appliances.forEach((app: any) => {
        const qty = app.quantity || 0;
        const watts = app.watts || 0;
        const hrs = app.hours || 0;
        connected += (watts * qty) / 1000;
        dailyConsumption += (watts * qty * hrs) / 1000;
      });

      const demand = connected * 0.8;
      // MCB sizing single phase 230V: demand kW * 1000 / 230 / pf (assume 0.9 pf) -> Current in A
      const current = (demand * 1000) / (230 * 0.9);
      
      let recommendedMcb = "16 A";
      if (current <= 16) recommendedMcb = "16 A";
      else if (current <= 25) recommendedMcb = "25 A";
      else if (current <= 32) recommendedMcb = "32 A";
      else if (current <= 40) recommendedMcb = "40 A";
      else if (current <= 63) recommendedMcb = "63 A";
      else if (current <= 80) recommendedMcb = "80 A";
      else if (current <= 100) recommendedMcb = "100 A";
      else recommendedMcb = `${Math.ceil(current / 10) * 10} A`;

      return {
        "Total Connected Load": `${connected.toFixed(2)} kW`,
        "Estimated Demand Load": `${demand.toFixed(2)} kW`,
        "Recommended Main MCB": recommendedMcb,
        "Daily Power Consumption": `${dailyConsumption.toFixed(2)} kWh`,
        "Estimated Monthly Bill": `₹${(dailyConsumption * 30 * 10).toFixed(0)}`
      };
    }
    case "power":
      return { "Single Phase Power": `${((values.voltage * values.current * values.pf) / 1000).toFixed(2)} kW`, "Three Phase Power": `${((1.732 * 415 * values.current * values.pf) / 1000).toFixed(2)} kW` };
    case "cable-size": {
      const current = values.current || 0;
      const distance = values.distance || 0;
      const material = String(values.material || "copper").toLowerCase();
      
      let size = 6;
      let resistivity = 0.0178; // Copper

      if (material === "aluminium") {
        resistivity = 0.029; // Aluminium
        if (current <= 16) size = 4;
        else if (current <= 25) size = 6;
        else if (current <= 32) size = 10;
        else if (current <= 45) size = 16;
        else if (current <= 63) size = 25;
        else if (current <= 80) size = 35;
        else if (current <= 100) size = 50;
        else size = 70;
      } else {
        // Copper
        if (current <= 16) size = 2.5;
        else if (current <= 25) size = 4;
        else if (current <= 32) size = 6;
        else if (current <= 45) size = 10;
        else if (current <= 63) size = 16;
        else if (current <= 80) size = 25;
        else if (current <= 100) size = 35;
        else size = 50;
      }

      // Single phase voltage drop formula: 2 * I * L * rho / size
      const drop = (2 * current * distance * resistivity) / size;
      const safetyMargin = "20%";

      return {
        "Cable Size": `${size} sq mm`,
        "Material": material.charAt(0).toUpperCase() + material.slice(1),
        "Voltage Drop": `${drop.toFixed(2)} V`,
        "Safety Margin": safetyMargin
      };
    }
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

const fieldLabels: Record<string, string> = {
  battery: "Battery capacity (kWh)",
  current: "Current (A)",
  target: "Target charge (%)",
  charger: "Charger power (kW)",
  tariff: "Tariff (₹ / unit)",
  bill: "Monthly bill (₹)",
  units: "Daily units (kWh)",
  roof: "Roof area (sq ft)",
  wattage: "Wattage (W)",
  quantity: "Quantity",
  hours: "Hours per day",
  voltage: "Voltage (V)",
  pf: "Power factor",
  distance: "Distance (m)",
  material: "Conductor material",
  length: "Cable length (m)",
  size: "Cable size (sq mm)",
  load: "Load",
  backup: "Backup time (hrs)",
  running: "Running load (kVA)",
  starting: "Starting load (kVA)",
  demand: "Demand factor",
  rooms: "Rooms",
  devices: "Smart devices",
  cctv: "Include CCTV (1 = yes, 0 = no)",
  area: "Area (sq ft)",
  floors: "Floors",
  days: "Recording days"
};

// Same key means different units in different calculators
const slugLabels: Record<string, Record<string, string>> = {
  "ev-charging": { current: "Current charge (%)" },
  ups: { load: "Connected load (W)" },
  transformer: { load: "Connected load (kW)" }
};

function labelFor(slug: string, key: string) {
  return slugLabels[slug]?.[key] || fieldLabels[key] || key.replaceAll("-", " ");
}

export function CalculatorShell({ title, slug }: CalculatorShellProps) {
  const [values, setValues] = useState(defaults[slug] || {});
  const results = useMemo(() => compute(slug, values), [slug, values]);

  const updateAppliance = (index: number, patch: Record<string, number>) =>
    setValues((curr) => {
      const appliances = [...curr.appliances];
      appliances[index] = { ...appliances[index], ...patch };
      return { ...curr, appliances };
    });

  const shareText = `${title}\n${Object.entries(results).map(([k, v]) => `${k}: ${v}`).join("\n")}`;

  return (
    <div className="calc">
      <form className="card" onSubmit={(e) => e.preventDefault()}>
        <h2 style={{ fontSize: "1.3rem" }}>Enter your details</h2>
        <p style={{ color: "var(--text)", marginTop: 6 }}>Results update instantly as you type.</p>

        {slug === "load" ? (
          <div className="calc-table-wrap">
            <table className="calc-table">
              <thead>
                <tr>
                  <th>Appliance</th>
                  <th style={{ width: 120 }}>Rating</th>
                  <th style={{ width: 70 }}>Unit</th>
                  <th style={{ width: 90 }}>Qty</th>
                  <th style={{ width: 100 }}>Hours / day</th>
                </tr>
              </thead>
              <tbody>
                {(values.appliances || []).map((app: any, index: number) => (
                  <tr key={app.name}>
                    <td>{app.name}</td>
                    <td>
                      {app.options ? (
                        <select
                          className="select"
                          aria-label={`${app.name} rating`}
                          value={app.unit === "Inches" ? (app.watts === 75 ? 48 : app.watts === 60 ? 36 : 56) : (app.watts / (app.unit === "Ton" ? 1500 : 1))}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            updateAppliance(index, { watts: app.unit === "Ton" ? val * 1500 : (val === 48 ? 75 : val === 36 ? 60 : 90) });
                          }}
                        >
                          {app.options.map((opt: number) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input className="input" type="number" min="0" aria-label={`${app.name} watts`} value={app.watts} onChange={(e) => updateAppliance(index, { watts: Number(e.target.value) })} />
                      )}
                    </td>
                    <td style={{ color: "var(--muted)" }}>{app.unit}</td>
                    <td><input className="input" type="number" min="0" aria-label={`${app.name} quantity`} value={app.quantity} onChange={(e) => updateAppliance(index, { quantity: Number(e.target.value) })} /></td>
                    <td><input className="input" type="number" min="0" max="24" step="0.5" aria-label={`${app.name} hours per day`} value={app.hours} onChange={(e) => updateAppliance(index, { hours: Number(e.target.value) })} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="form-grid" style={{ marginTop: 24 }}>
            {Object.entries(values).map(([key, value]) => (
              <label className="field" key={key}>
                {labelFor(slug, key)}
                {key === "material" ? (
                  <select className="select" value={value} onChange={(e) => setValues((curr) => ({ ...curr, [key]: e.target.value }))}>
                    <option value="copper">Copper</option>
                    <option value="aluminium">Aluminium</option>
                  </select>
                ) : (
                  <input className="input" type="number" step="any" value={value} onChange={(e) => setValues((curr) => ({ ...curr, [key]: Number(e.target.value) }))} />
                )}
              </label>
            ))}
          </div>
        )}

        <p className="note">These are planning estimates. Final sizing must be validated by a licensed engineer after a site survey and as per utility requirements.</p>
      </form>

      <aside className="calc-results" aria-live="polite">
        <span className="eyebrow">Results</span>
        {Object.entries(results).map(([label, value]) => (
          <div className="result-row" key={label}>
            <span>{label}</span>
            <strong>{String(value)}</strong>
          </div>
        ))}
        <div style={{ display: "grid", gap: 10, marginTop: 24 }}>
          <a className="btn btn-secondary" href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Hi, I need help with this:\n${shareText}`)}`} target="_blank" rel="noopener noreferrer">
            Discuss with an engineer
          </a>
          <button className="btn btn-light" type="button" onClick={() => window.print()}>Print results</button>
        </div>
      </aside>
    </div>
  );
}
