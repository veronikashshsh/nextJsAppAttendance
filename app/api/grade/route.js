import { db } from "@/utilis";
import { GRADES } from "@/utilis/schema";
import { NextResponse } from "next/server";


export async function GET(req){
   const result=await db.select().from(GRADES);
   return NextResponse.json(result);
}