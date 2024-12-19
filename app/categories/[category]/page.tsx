"use client"

import toast, { Toaster } from "react-hot-toast";
import Divider from "@/components/Divider";
import axios from "axios";
import React from "react";
import { Album } from "@/types/types";
import Loader from "@/components/Loader";
import AlbumCard from "@/components/AlbumCard";
import { useParams } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{ category: string }>
}

const CategoriesPage = ({params} : CategoryPageProps) => {
    const {category} = useParams();
    const [data, setData] = React.useState<Album[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [title, setTitle] = React.useState("");

    const getResponse = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`/api/v1/categories/${category?.slice(3, category.length)}`, {}, { withCredentials: true });

            setData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");

        } finally {
            setLoading(false);
        }
    }

    const decodeParam = (param: string | string[] | undefined): string => {
        if (!param) return '';

        // If the param is an array, decode each item
        if (Array.isArray(param)) {
            return param.map(p => decodeURIComponent(p)).join(' ');
        }

        // If it's a single string, just decode it
        return decodeURIComponent(param);
    };

    React.useEffect(() => {
        getResponse();
        setTitle(decodeParam(category));

    }, [])

    return (
        <div className=" flex items-center min-h-screen w-screen flex-col bg-gray-950 subpixel-antialiased overflow-y-hidden pb-4">
            <Toaster position="bottom-right" reverseOrder={false} />

            <header className="flex justify-center items-center w-3/4 py-3 sm:py-4">
                <h1 className="text-gray-200 font-bold text-3xl sm:text-4xl md:text-5xl text-center">
                    {title.slice(1, title?.length)}
                </h1>
            </header>

            <Divider />

            {loading ?
                <div className="h-[600px] w-full flex justify-center items-center">
                    <Loader />
                </div>
                : <div className="flex justify-evenly items-center flex-wrap gap-3 sm:gap-5 w-10/12 sm:w-10/12 md:w-9/12 pt-2 sm:pt-5">
                    {!data ? <div className="flex justify-center items-center h-96 w-full text-neutral-200 text-3xl"> No Results 😔</div> :
                        <div className="grid grid-cols-1 sm gap-5 lg:grid-cols-3 sm:grid-cols-2 text-gray-300 w-full h-full sm:pb-4">
                            {
                                data?.map((value) => {
                                    return <AlbumCard key={value.id} name={value.name} url={value.images[0].url} spotify={value.external_urls.spotify} tracks={value.total_tracks} />
                                })
                            }
                        </div>}
                </div>}
        </div>
    )
}

export default CategoriesPage;