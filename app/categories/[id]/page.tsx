"use client"

import toast, { Toaster } from "react-hot-toast";
import Divider from "@/components/Divider";
import axios from "axios";
import React from "react";
import { Album } from "@/types/types";
import { Bars } from "react-loader-spinner";
import { useParams } from "next/navigation";
import { AlbumCard } from "@/app/[passData]/page";

const CategoriesPage = () => {
    const { id } = useParams();
    const [data, setData] = React.useState<Album[]>([]);
    const [loading, setLoading] = React.useState(false);

    const getResponse = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:5000/api/v1//albums/${id}`, {}, { withCredentials: true });
            setData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
           
        }finally{
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getResponse();
    }, [])

    return (
        <div className=" flex items-center min-h-screen w-screen flex-col bg-gray-950 subpixel-antialiased overflow-y-hidden pb-4">
            <Toaster position="bottom-right" reverseOrder={false} />

            <header className="flex justify-center items-center w-3/4 py-3 sm:py-4">
                <h1 className="text-gray-200 font-bold text-3xl sm:text-4xl md:text-5xl text-center">
                    {id?.slice(3,id.length)}
                </h1>
            </header>

            <Divider />

            {loading ?
                <div className="h-[600px] w-full flex justify-center items-center">
                    <Bars
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    /> </div>
                : <div className="flex justify-evenly items-center flex-wrap gap-3 sm:gap-5 w-10/12 sm:w-10/12 md:w-9/12 pt-2 sm:pt-5">
                    <div className="grid grid-cols-1 sm gap-5 lg:grid-cols-3 sm:grid-cols-2 text-gray-300 w-full h-full sm:pb-4">
                        {
                            data.map((value) => {
                                return <AlbumCard key={value.id} name={value.name} url={value.images[0].url} spotify={value.external_urls.spotify} tracks={value.total_tracks} />
                            })
                        }
                    </div>
                </div>}
        </div>
    )
}

export default CategoriesPage;