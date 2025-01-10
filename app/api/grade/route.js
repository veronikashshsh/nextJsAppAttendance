import { db } from "@/utilis";
import { GRADES } from "@/utilis/schema";
import { NextResponse } from "next/server";

export async function POST(req,res){
try {
    const data=await req.json();

    const result=await db.insert(OBJECTS).values({
        name:data?.name,
        date:data?.date,
        address:data?.address,
    })

    return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error inserting student:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req){
   const result=await db.select().from(GRADES);
   return NextResponse.json(result);
}

