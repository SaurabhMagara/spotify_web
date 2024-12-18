"use server"
import { sendHeaders } from "@/utils/sendHeaders";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        
        if(!token){
            return NextResponse.json({message: "new-releases err : token is missing"});
        }

        const response = await axios.get("https://api.spotify.com/v1/browse/new-releases",
            {
                headers : sendHeaders(token)
            }
        );

        return NextResponse.json({message : "New Releases recieved.", data : response.data.albums.items});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : "Error while getting new releases", error : error});
    }
}