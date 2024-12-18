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
        const category = searchParams.get("category")

        if (!token) {
            return NextResponse.json({ message: "albums err : Token is missing" })
        }    

        if(!category){
            return NextResponse.json({message : "albums err : query param is missing"});
        }
        
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${category}&type=album&limit=30`,
            {
                headers : sendHeaders(token)
            }
        )

       return NextResponse.json({message : "Albums recieved", data: response.data.albums.items })
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : "Error while getting albums", error: error})
    }
}