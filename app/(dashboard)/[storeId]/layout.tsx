import database from "@/lib/database";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
    children,
    params
}:{
    children: React.ReactNode;
    params: {storeId: string};
}){
    const {userId} = await auth();
    if (!userId){
        redirect("sign-in")
    }
    const store = await database.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId
        }
    })
    if (!store){
        redirect("/");
    }
    return (
        <>
            <div>Navbar</div>
            {children}
        </>
    )
}