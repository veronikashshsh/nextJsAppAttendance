import { db } from "@/utilis";
import { ATTENDANCE, STUDENTS } from "@/utilis/schema";
import { sql, eq, and, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){
    const searchParams=req.nextUrl.searchParams;
    const date=searchParams.get('date')
    const grade=searchParams.get('grade')

    const result=await db.select({
        day:ATTENDANCE.day,
        presentCount:sql`count(${ATTENDANCE.day})`
    }).from(ATTENDANCE)
    .innerJoin(STUDENTS,and(eq(ATTENDANCE.studentId,STUDENTS.id), eq(ATTENDANCE.date,date)))
    .groupBy(ATTENDANCE.day)
    .where(eq(STUDENTS.grade, grade))
    .orderBy(desc(ATTENDANCE.day))
    .limit(7)

    return NextResponse.json(result);

}

