import { NextResponse } from "next/server";
import { getConfig } from "../../../utils/server-db";
export async function GET(){ const cfg = await getConfig(); return NextResponse.json(cfg); }
