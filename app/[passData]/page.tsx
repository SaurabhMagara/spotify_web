"use client"
import axios from "axios";
import React from "react";
import { GoSearch } from "react-icons/go";
import { Album, propData } from "@/types/types";
import toast, { Toaster } from "react-hot-toast";
import Divider from "@/components/Divider";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";
import AlbumCard from "@/components/AlbumCard";

const Albums = () => {
  const [searchInput, setSearchInput] = React.useState('');
  const [data, setData] = React.useState<Album[]>();
  const [loading, setLoading] = React.useState(false);
  const {passData} = useParams();

  // Search handling
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!searchInput.trim()) {
        return toast.error("Please enter a search term.", {
          duration: 2000,
          style: { borderRadius: '10px', background: '#333', color: '#fff' },
        });
      }

      setLoading(true);
      
      const baseUrl = `/api/v1/${passData}`;
      const url = passData === "albums" ? `${baseUrl}?category=${searchInput}` : `${baseUrl}?name=${searchInput}`;
      const res = await axios.post(url, {}, { withCredentials: true });
      setData(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data on page load
  const getSampleData = async () => {
    setLoading(true);
    try {
      const baseUrl = `/api/v1/${passData}`;
      const url = passData === "new-releases" 
        ? baseUrl 
        : passData === "albums" 
        ? `${baseUrl}?category=90shindi` 
        : `${baseUrl}?name=arijitsingh`;
      
      const res = await axios.post(url, {}, { withCredentials: true });
      setData(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getSampleData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen w-screen bg-gray-950 text-neutral-300">
      <Toaster position="bottom-right" reverseOrder={false} />
      
      <header className="flex flex-col sm:flex-row justify-center items-center sm:justify-between w-full sm:w-3/4 py-3 sm:py-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          {passData === "new-releases" ? "New Releases" : passData === 'artist' ? "Artists" : "Albums"}
        </h1>
        {passData !== 'new-releases' && (
          <form onSubmit={handleSearch} className="relative w-64 sm:w-72 lg:w-96 mt-4 sm:mt-0">
            <input 
              type="text" 
              className="w-full h-12 rounded-full bg-gray-700 outline-none px-4 pr-12 text-lg text-gray-300 tracking-wide" 
              placeholder="Search ..." 
              value={searchInput} 
              onChange={e => setSearchInput(e.target.value)} 
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-white text-xl text-gray-800 transition-colors duration-200">
              <GoSearch />
            </button>
          </form>
        )}
      </header>

      <Divider />

      {loading ? (
        <div className="flex justify-center items-center h-[600px] w-full">
          <Loader/>
        </div>
      ) : (
        <section className="flex flex-wrap justify-evenly items-center gap-5 w-10/12 sm:w-9/12 pt-2 sm:pt-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 text-gray-300 w-full sm:pb-4">
            {data?.map(value => (
              <AlbumCard key={value.id} name={value.name} url={value.images[0]?.url} followers={value.followers?.total} tracks={value.total_tracks} passData={passData} spotify={value.external_urls.spotify} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Albums;