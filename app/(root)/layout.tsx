import database from "@/lib/database";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function SetupLayout({
    children,
}:{
    children: React.ReactNode;
}){
    const {userId} = await auth();
    if(!userId){
        redirect("sign-in")
    }
    const store = await database.store.findFirst({
        where: {
            userId: userId
        }
    })
    if (store){
        redirect(`/${store.id}`)
    }
    return (
        <>
            {children}
        </>
    )
}