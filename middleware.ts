import axios from 'axios';
import { NextResponse, NextRequest, NextMiddleware } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    try {
        // Check for the existing token in cookies
        const token = req.cookies.get("token")?.value;

        console.log("middleware hitted");

        if (token) {
            // If token exists, allow the request to proceed
            return NextResponse.next();
        }

        // If token does not exist, refresh it
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", process.env.CLIENT_ID || "");
        params.append("client_secret", process.env.CLIENT_SECRET || "");

        const response = await axios.post("https://accounts.spotify.com/api/token", params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const newAccessToken = response.data.access_token;

        console.log("Refreshing token...");

        // Set the new token in cookies and continue the request
        const res = NextResponse.next();
        res.cookies.set("token", newAccessToken, {
            httpOnly: true,
            maxAge: 58 * 60 * 1000, // 58 minutes
            sameSite: "strict",
        });

        return res;
    } catch (error) {
        console.error("refreshAccessToken middleware error:", error);

        // Return a response with a 500 status for errors
        return NextResponse.json(
            { message: "refreshAccessToken middleware error", error },
            { status: 500 }
        );
    }
}

export const config = {
    matcher: ['/albums', '/categories/:category*', '/new-releases', '/artist', '/categories'],
}
