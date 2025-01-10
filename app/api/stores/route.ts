import database from "@/lib/database";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { name } = body;

        // Validasi userId
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Validasi input name
        if (!name || typeof name !== "string") {
            return NextResponse.json({ message: "Invalid input: Name is required and must be a string" }, { status: 400 });
        }

        // Lakukan operasi logika Anda di sini
        console.log(`[STORES_POST] User ID: ${userId}, Name: ${name}`);

        const store = await database.store.create({
            data: {
                name, 
                userId
            }
        })

        // Berikan respons sukses
        return NextResponse.json(store);
    } catch (error) {
        console.error("[STORES_POST]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
