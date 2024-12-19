"use server"

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET (req : NextRequest){

    const cookie = await cookies();
    try {
        const response = await axios.post("https://accounts.spotify.com/api/token",
            {
                grant_type: "client_credentials",
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET
            },
            {
                headers :{
                    "Content-Type" : "application/x-www-form-urlencoded"
                }
            }
        );

        cookie.set("token", response.data.access_token, {httpOnly :true, maxAge : 57*60*1000});
        return NextResponse.json({message : "Token generated"});

    } catch (error) {
        console.log(error);
        return NextResponse.json({message : "error while getting token", error: error})
    }
}