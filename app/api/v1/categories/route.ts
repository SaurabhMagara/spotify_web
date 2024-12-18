"use server"

import { cookies } from "next/headers";
import { sendHeaders } from "@/utils/sendHeaders";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    console.log("token", token);
    
    if (!token) {
        return NextResponse.json({ message: "Token not found" })
    }

    try {
        const response = await axios.get("https://api.spotify.com/v1/browse/categories?limit=50",
            {
                headers: sendHeaders(token)
            }
        );

        return NextResponse.json({message : "Categories recieved.", data : response.data.categories.items});

    } catch (error) {
        console.log(error);
        return NextResponse.json({message : "Error while getting categories", error : error});
    }
}