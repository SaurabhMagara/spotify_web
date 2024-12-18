"use client"

import axios from "axios";
import React from "react";
import { Categories } from "@/types/types";
import Divider from "@/components/Divider"
import toast, { Toaster } from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import Link from "next/link";

const Categorie = () => {

    const [data, setData] = React.useState<Categories[]>([]);
    const [loading, setLoading] = React.useState(false);

    const colors = [
        "#1E3264",
        "#5F8108",
        "#DB148B",
        "#B02897",
        "#B95D06",
        "#8E66AC",
        "#E13300",
        "#777777",
        "#44768D",
        "#A56752",
        "#E51E31",
        "#137A09",
        "#C49687",
        "#E8125C",
        "#B06339",
        "#985F4D"
    ];


    const getCategories = async () => {
        setLoading(true);
        
        try {
            const res = await axios.post(`/api/v1/categories`, {}, { withCredentials: true });

            const newData = res.data.data.filter((value: { name: string }) => value.name !== `New Releases`);
            setData(newData);
            setLoading(false);

        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong");
            
        }finally{
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className=" flex items-center min-h-screen w-screen flex-col gap-5 bg-gray-950 subpixel-antialiased overflow-y-hidden">
            <Toaster position="bottom-right" reverseOrder={false} />

            <h1 className="text-gray-200 font-bold text-5xl pt-2">Explore</h1>

            <Divider />

            <div className="flex justify-evenly items-center flex-wrap gap-5 w-11/12 sm:w-9/12 p-0 my-0">

                {/* Top Two Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full place-items-center py-2 ">
                    <Link href="/albums" className="w-full">
                        <div className="w-full h-28 sm:h-52 flex justify-center items-center rounded-lg bg-gradient-to-tr from-violet-800 to-pink-700 text-2xl font-semibold text-gray-300 cursor-pointer group shadow-lg sm:transform sm:transition-all sm:duration-300 sm:hover:scale-105">
                            <span className="sm:transform sm:transition-transform sm:duration-300 sm:group-hover:scale-125">Albums</span>
                        </div>
                    </Link>
                    <Link href="/artist" className="w-full">
                        <div className="w-full h-28 sm:h-52 flex justify-center items-center rounded-lg text-2xl font-semibold text-gray-300 bg-gradient-to-tr from-blue-800 to-emerald-800 group shadow-lg sm:transform sm:transition-all sm:duration-300 sm:hover:scale-105">
                            <span className="sm:transform sm:transition-transform sm:duration-300 sm:group-hover:scale-125">Artists</span>
                        </div>
                    </Link>
                    <Link href="/new-releases" className="w-full">
                        <div className="w-full h-28 sm:h-52 flex justify-center items-center rounded-lg text-2xl font-semibold text-gray-300 bg-gradient-to-tr from-blue-800 to-emerald-800 group shadow-lg sm:transform sm:transition-all sm:duration-300 sm:hover:scale-105">
                            <span className="sm:transform sm:transition-transform sm:duration-300 sm:group-hover:scale-125 text-wrap text-center">New Releases</span>
                        </div>
                    </Link>
                </div>

                {/* Scrollable Grid */}
                <div className="w-full flex flex-col gap-3">
                    <h1 className="text-gray-300 font-bold text-2xl ">Categories</h1>
                    <div className="border w-full border-gray-700 rounded-full"></div>
                </div>
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
                    :
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:w-11/12 text-gray-300 w-full h-full">

                        {
                            data.map((value, i) => {
                                return (
                                    <Link href={`/categories/:${value.name}`} key={value.id}>
                                        <div
                                            className="h-32 sm:h-40 shadow-sm flex justify-center items-center rounded-lg sm:text-lg sm:transition-transform sm:duration-300 sm:hover:scale-105 font-medium group"
                                            key={value.id}
                                            style={{ background: `linear-gradient(to bottom left, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]})` }}
                                        >
                                            <span className="sm:transform sm:transition-transform sm:duration-300 sm:group-hover:scale-125 text-wrap text-center">{value.name || `Item ${i + 1}`}</span>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>}
            </div>
        </div>
    )
}
export default Categorie;