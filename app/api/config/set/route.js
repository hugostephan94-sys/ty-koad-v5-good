import { NextResponse } from "next/server";
import { setConfig } from "../../../utils/server-db";
export async function POST(req){ try{ const body = await req.json(); const cfg = await setConfig(body); return NextResponse.json(cfg); }catch(e){ return NextResponse.json({ error: e.message }, { status: 400 }); } }
