"use server"

import { sendHeaders } from "@/utils/sendHeaders";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        const category = req.nextUrl;

        if (!token) {
            return NextResponse.json({ message: "category err : token is missing" });
        }

        if (!category) {
            return NextResponse.json({ message: "category err : parameter is missing" });
        }

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${category}&type=album&limit=30`,
            {
                headers: sendHeaders(token)
            }
        );

        return NextResponse.json({ message: `${category} recieved.`, data: response.data.albums.items })
    } catch (error) {

    }
}