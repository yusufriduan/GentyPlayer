import { NextResponse } from 'next/server';

export async function POST() {
  // This satisfies the "must be a module" requirement for Vercel
  return NextResponse.json({ success: true });
}