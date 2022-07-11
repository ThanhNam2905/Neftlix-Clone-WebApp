import Image from "next/image"
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"
import { movieState } from "../atoms/movieAtom"
import { Movie } from "../typings"


interface PropsType {
  // when using firebase
  // movie: Movie | DocumentData
  movie: Movie
}

function Thumbnail({ movie }: PropsType) {

  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div className="movie__thumbnail"
      onClick={() => {
        setShowModal(true)
        setCurrentMovie(movie)
      }}
    >
      <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        className="rounded object-cover md:rounded-md"
        layout="fill"
      />
    </div>
  )
}

export default Thumbnail