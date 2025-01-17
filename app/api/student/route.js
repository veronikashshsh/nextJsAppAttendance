import { db } from "@/utilis";
import { STUDENTS } from "@/utilis/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req,res){
try {
    const data=await req.json();

    const result=await db.insert(STUDENTS).values({
        name:data?.name,
        object:data?.object,
        address:data?.address,
        contact:data?.contact
    })

    return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error inserting student:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req){

    const result=await db.select().from(STUDENTS);

    return NextResponse.json(result);
}

export async function DELETE(req){
    const searchParams=req.nextUrl.searchParams;
    const id=searchParams.get('id');

    const result=await db.delete(STUDENTS)
    .where(eq(STUDENTS.id,id));

    return NextResponse.json(result);
}