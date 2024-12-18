"use server"
import { sendHeaders } from "@/utils/sendHeaders";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        const {searchParams} = new URL(req.url);
        const name  = searchParams.get("name");

        if(!token){
            return NextResponse.json({message : "Artist err : token is missing"});
        };

        if(!name){
            return NextResponse.json({message: "Artist err : query is missing." });
        }

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=artist`,
            {
                headers : sendHeaders(token)
            }
        );

        return NextResponse.json({message : "artists recieved", data: response.data.artists.items});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error while getting artists."});
    }
}