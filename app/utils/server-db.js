import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const RESA_FILE = path.join(DATA_DIR, "reservations.json");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");
const VOUCHERS_FILE = path.join(DATA_DIR, "vouchers.json");

async function ensureFiles(){
  await fs.mkdir(DATA_DIR, { recursive: true });
  try { await fs.access(RESA_FILE); } catch { await fs.writeFile(RESA_FILE, "[]", "utf-8"); }
  try { await fs.access(CONFIG_FILE); } catch { await fs.writeFile(CONFIG_FILE, JSON.stringify({ icalC1: "", icalC2: "" }, null, 2), "utf-8"); }
  try { await fs.access(VOUCHERS_FILE); } catch { await fs.writeFile(VOUCHERS_FILE, "[]", "utf-8"); }
}

/* Réservations */
export async function listReservations(){ await ensureFiles(); const txt = await fs.readFile(RESA_FILE, "utf-8"); return JSON.parse(txt || "[]"); }
export async function saveReservation(resa){ await ensureFiles(); const all = await listReservations(); all.unshift({ ...resa, createdAt: new Date().toISOString() }); await fs.writeFile(RESA_FILE, JSON.stringify(all, null, 2), "utf-8"); return { ok: true }; }
export async function upsertReservationByPI({ paymentIntentId, ...patch }){ await ensureFiles(); const all = await listReservations(); const idx = all.findIndex(r => r.paymentIntentId === paymentIntentId); if(idx >= 0){ all[idx] = { ...all[idx], ...patch }; } await fs.writeFile(RESA_FILE, JSON.stringify(all, null, 2), "utf-8"); return { ok: true }; }

/* Config */
export async function getConfig(){ await ensureFiles(); const txt = await fs.readFile(CONFIG_FILE, "utf-8"); return JSON.parse(txt || "{}"); }
export async function setConfig(patch){ const cfg = { ...(await getConfig()), ...patch }; await fs.writeFile(CONFIG_FILE, JSON.stringify(cfg, null, 2), "utf-8"); return cfg; }

/* Vouchers */
const readVouchers = async()=>{ await ensureFiles(); const txt = await fs.readFile(VOUCHERS_FILE, "utf-8"); return JSON.parse(txt || "[]"); };
const writeVouchers = async(v)=> fs.writeFile(VOUCHERS_FILE, JSON.stringify(v, null, 2), "utf-8");

export async function createVoucher(voucher){
  const all = await readVouchers();
  if(all.some(v=>v.code===voucher.code)) throw new Error("Code déjà existant");
  all.unshift({ ...voucher, createdAt: new Date().toISOString(), status: "active", redemptions: [] });
  await writeVouchers(all);
  return voucher;
}
export async function getVoucherByCode(code){
  const all = await readVouchers(); return all.find(v=>v.code===code) || null;
}
export async function getVoucherBySession(sessionId){
  const all = await readVouchers(); return all.find(v=>v.stripeSessionId===sessionId) || null;
}
export async function listVouchers(){ return readVouchers(); }
export async function redeemVoucher(code, details){
  const all = await readVouchers();
  const idx = all.findIndex(v=>v.code===code);
  if(idx<0) throw new Error("Code invalide");
  if(all[idx].status!=="active") throw new Error("Bon déjà utilisé / inactif");
  all[idx].status = "used";
  all[idx].redemptions.push({ at: new Date().toISOString(), ...details });
  await writeVouchers(all);
  return all[idx];
}
