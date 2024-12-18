"use client"

import React from "react";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const Home = () => {

    const getToken = async () => {

        try {
            const res = await axios.get(`/api/v1/token`,{withCredentials : true});
            console.log(res);
        } catch (error) {
            console.log("error while getting access token : ", error);
        }
    }

    React.useEffect(() => {

        getToken();

       // making interval for generating token before its expiry
       const interval = setInterval(()=>{
        console.log("refreshing token...");
        getToken();
       }, 58*60*1000);

       return ()=> clearInterval(interval);

    }, []);

    return (
        <>
            <div className="flex justify-center items-center h-screen w-screen gap-3 flex-col bg-gradient-to-b from-gray-800 to-black subpixel-antialiased">
                <div className="h-2/6 gap-5 w-11/12 flex flex-col justify-center items-center">
                    <h1 className="font-bold text-5xl text-green-600 text-center ">Spotify Web</h1>
                    <p className="text-gray-200 text-lg text-wrap text-center w-11/12 md:w-8/12"> Welcome to Spotify web. Here you can find albums, tracks and many more about songs. This platform direct you to spotify to discover more. </p>
                    <Link href='/categories'>
                        <button className="flex justify-center items-center text-center gap-2 py-2 px-3 text-gray-200 rounded-full text-lg bg-green-600 transition-all hover:bg-inherit hover:border hover:border-green-600 hover:text-green-600"> Let's go <FaArrowRightLong />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home;
