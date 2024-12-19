"use server"

import { sendHeaders } from "@/utils/sendHeaders";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest,{ params }: { params: { category: string } }) {
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        const {category} = await params;

        if (!token) {
            return NextResponse.json({status : 400, message: "category err : token is missing" });
        }

        if (!category) {
            return NextResponse.json({status : 400, message: "category err : parameter is missing" });
        }

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${category}&type=album&limit=30`,
            {
                headers: sendHeaders(token)
            }
        );

        return NextResponse.json({status:200, message: `${category} recieved.`, data: response.data.albums.items })
    } catch (error) {
        console.log(error);
        return NextResponse.json({status: 500, message : "Categories/ err", error:error});
    }
}