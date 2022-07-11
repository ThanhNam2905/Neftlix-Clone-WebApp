import { Movie } from "../typings"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Thumbnail from "./Thumbnail";
import { useRef, useState } from "react";

interface PropsType {
    title: string,
    // when using firebase
    // movies: Movie[] | DocumentData[]
    movies: Movie[],
}


function RowItemMovie({ title, movies }: PropsType) {

    // Event when user click in slides movies
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = (direction: string) => {
        setIsMoved(true);

        if(rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;

            const scrollTo = direction === "left" 
                                ? scrollLeft - clientWidth 
                                : scrollLeft + clientWidth;
            rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"});
        }
    }

    return (
        <>
            <div className="h-44 mb-2 space-y-1 md:mb-4 md:h-52 md:space-y-2.5 lg:mb-10 lg:space-y-4">
                <h2 className="max-w-[250px] mb-2.5 text-base font-semibold capitalize cursor-pointer text-gray-200 transition ease-in-out duration-300 hover:underline hover:text-white hover:underline-offset-4 md:mb-3.5 md:text-lg lg:text-xl">{title}</h2>
                <div className="group relative ml-0 lg:-ml-2">
                    <FaChevronLeft onClick={() => handleClick("left")} className={`absolute top-0 bottom-0 left-2 z-30 m-auto w-7 h-7 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && "hidden"}`} />
                    <div ref={rowRef} className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-3 lg:space-x-5">
                        {
                            movies.map((movie) => (
                                    <Thumbnail key={movie.id} movie={movie}/>
                                ) 
                            )
                        }
                    </div>
                    <FaChevronRight onClick={() => handleClick("right")} className="absolute top-0 bottom-0 right-2 z-30 m-auto w-7 h-7 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />
                </div>
            </div>
        </>
    )
}

export default RowItemMovie