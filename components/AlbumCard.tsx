import { propData } from "@/types/types";

const AlbumCard = ({ url, name, followers, tracks, passData, spotify }: propData) => {
    return (
      <a 
        href={spotify} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex sm:flex-col items-center gap-4 rounded-xl bg-gradient-to-tl from-gray-900 to-gray-800 shadow-lg sm:transition-transform sm:duration-300 sm:hover:scale-105 sm:hover:shadow-2xl overflow-hidden">
        {url ? (
          <img 
            src={url} 
            alt={name} 
            className="h-[64px] w-[64px] sm:h-[300px] sm:w-full object-cover rounded-l-xl sm:rounded-t-xl sm:rounded-l-none sm:transition-transform sm:duration-300 sm:hover:scale-110" 
          />
        ) : ( 
          <div 
            className="h-[300px] w-full flex items-center justify-center bg-gradient-to-br from-cyan-700 to-cyan-950 text-2xl font-semibold text-gray-300 rounded-t-xl">
            No Image
          </div>
        )}
        <div className="flex flex-col gap-1 sm:gap-3 w-full  sm:p-5 sm:bg-gray-800 rounded-b-xl">
          <span className="text-md sm:text-2xl font-medium sm:font-semibold text-gray-100 sm:truncate sm:pr-0 line-clamp-1 sm:line-clamp-none ">{name}</span>
          {passData === 'artist' ? (
            <span className="text-sm text-gray-400">Followers: <span className="font-medium text-white">{followers}</span></span>
          ) : (
            <span className="text-sm text-gray-400">Total Tracks: <span className="sm:font-medium text-white">{tracks}</span></span>
          )}
        </div>
      </a>
    );
  };

export default AlbumCard;