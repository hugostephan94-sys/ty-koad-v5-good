import { NextResponse } from "next/server";
import { listReservations } from "../../../utils/server-db";
export async function GET(){ try{ const reservations = await listReservations(); return NextResponse.json({ reservations }); }catch(e){ return NextResponse.json({ error: e.message }, { status: 400 }); } }
