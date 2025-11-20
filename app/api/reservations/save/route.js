import { NextResponse } from "next/server";
import { saveReservation } from "../../../utils/server-db";
export async function POST(req){ try{ const body = await req.json(); await saveReservation(body); return NextResponse.json({ ok: true }); }catch(e){ return NextResponse.json({ error: e.message }, { status: 400 }); } }
