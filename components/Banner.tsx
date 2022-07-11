import Image from "next/image";
import { useEffect, useState } from "react"
import { baseURL } from "../constants/baseURLMovie-tmbd";
import { Movie } from "../typings";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { movieState } from "../atoms/movieAtom";

interface PropsType {
    netflixOriginals: Movie[],
}


function Banner({ netflixOriginals }: PropsType) {

    const [movie, setMovie] = useState<Movie | null>(null);
    
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
    const [showModal, setShowModal] = useRecoilState(modalState);

    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, [netflixOriginals]);

    // console.log(netflixOriginals);
    
    return (
        <div className="flex flex-col space-y-3 h-[95vh] justify-center md:space-y-4 lg:space-y-6">
            <div className="absolute top-0 left-0 -z-10 h-[100vh] w-screen">
                <Image  src={`${baseURL}${movie?.backdrop_path || movie?.poster_path}`}
                        layout="fill"
                        objectFit="cover"/>
            </div>
            <h2 className="heading__2 text-[26px] font-bold md:text-4xl lg:text-[60px] lg:leading-[68px]">{movie?.title || movie?.name || movie?.original_name}</h2>
            <p className="max-w-xs text-gray-200 italic text-sm md:max-w-xl md:text-lg lg:max-w-[700px]">{movie?.overview}</p>
            <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
                <button className="btn">
                    <FaPlay className="w-4 h-4 md:w-5 md:h-5"/>Play
                </button>
                <button className="btn bg-white text-black"
                    onClick={() => {
                        setCurrentMovie(movie)
                        setShowModal(true)
                    }}>
                    <FaInfoCircle className="w-4 h-4 md:w-5 md:h-5"/>More Info
                </button>
            </div>
        </div>
    )
}

export default Banner