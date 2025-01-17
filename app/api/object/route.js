import { db } from "@/utilis";
import { OBJECTS } from "@/utilis/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){
try {
    const data=await req.json();

    const result=await db.insert(OBJECTS).values({
        name:data?.name,
        contact:data?.contact,
        address:data?.address,
    })

    return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error inserting student:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req){
    try {
        // Отримання даних з таблиці OBJECTS
        const result = await db
          .select({
            id: OBJECTS.id,
            name: OBJECTS.name,
            objectName: OBJECTS.name, // Перейменування поля
            address: OBJECTS.address,
            contact: OBJECTS.contact,
          })
          .from(OBJECTS)
         // .limit(7); // Лімітуємо результат до 7 записів
    
        // Повернення результату у форматі JSON
        return NextResponse.json(result);
      } catch (error) {
        console.error('Error fetching objects:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
      }
}

export async function DELETE(req){
    const searchParams=req.nextUrl.searchParams;
    const id=searchParams.get('id');

    const result=await db.delete(OBJECTS)
    .where(eq(OBJECTS.id,id));

    return NextResponse.json(result);
}

