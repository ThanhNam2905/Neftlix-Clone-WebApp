import Image from "next/image"
import { Movie } from "../typings"


interface PropsType {
    // when using firebase
    // movie: Movie | DocumentData
    movie: Movie
}

function Thumbnail({ movie }: PropsType) {
  return (
    <div className="relative h-32 min-w-[180px] cursor-pointer transition-all ease-in-out duration-[400] transform brightness-[0.6] hover:brightness-100 hover:scale-105 md:hover:scale-x-110 md:h-36 md:min-w-[200px] lg:h-40 lg:min-w-[240px]">
        <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        className="rounded object-cover md:rounded-md"
        layout="fill"/>
    </div>
  )
}

export default Thumbnail