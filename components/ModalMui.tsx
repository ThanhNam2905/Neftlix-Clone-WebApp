import { CgClose } from "react-icons/cg";
import { FaPlay, FaRegThumbsUp } from "react-icons/fa";
import { HiPlus, HiOutlineVolumeOff, HiOutlineVolumeUp } from "react-icons/hi";

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

import { useEffect, useState, useRef } from 'react';
import Modal from '@mui/material/Modal';
import { movieState } from '../atoms/movieAtom';
import { Element, Genre } from '../typings';
import ReactPlayer from 'react-player';
import useIsTruncated from "../hooks/useIsTruncated";

function ModalMui() {

  const showModal = useRecoilValue(modalState);
  const resetShowModal = useResetRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailerMovie, setTrailerMovie] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
        .catch((error) => console.log(error.message))

      if (data?.videos) {
        const index = data.videos.results.findIndex((element: Element) => element.type === "Trailer");
        setTrailerMovie(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres)
      }

    }

    fetchMovie()
  }, [movie])

  const overviewRef = useRef<HTMLParagraphElement | any>(null);
  const [viewMore, setViewMore] = useState<boolean | any>(false);
  const isTruncated = useIsTruncated(overviewRef);

  const handlerViewMore = async () => {
    await setViewMore(true);
  }
  const handlerHidden = async () => {
    await setViewMore(false);
  }
  console.log(viewMore);
  console.log(isTruncated);

  return (
    <Modal open={showModal} onClose={resetShowModal}
      className="fixed !top-5 mb-3 shadow-xl shadow-gray-200 left-0 right-0 z-[9999] w-full max-w-4xl mx-auto overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
      <>
        <button onClick={resetShowModal} className="btn--close inline-flex cursor-pointer" title='Close'>
          <CgClose className='w-5 h-5 lg:w-6 lg:h-6' />
        </button>

        <div className='relative pt-[56.25%]'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerMovie}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full justify-between px-10">
            <div className="flex items-center space-x-4">
              <button className='btn__modal--play group'>
                <FaPlay className='w-6 h-6 text-black group-hover:text-white' />
                <span className="group-hover:text-white">Play</span>
              </button>
              <button className="btn--plus top-0 left-0">
                <HiPlus className="w-6 h-6 lg:w-8 lg:h-8" />
              </button>
              <button className="btn--thumbsUp top-0 left-0">
                <FaRegThumbsUp className="w-6 h-6 lg:w-[23px] lg:h-[23px]" />
              </button>
            </div>
            <div>
              <button className="btn--volume" onClick={() => setMuted(!muted)}>
                {
                  muted ? (<HiOutlineVolumeOff className="w-5 h-5 lg:w-6 lg:h-6" />)
                    : (<HiOutlineVolumeUp className="w-5 h-5 lg:w-6 lg:h-6" />)
                }
              </button>
            </div>
          </div>
        </div>

        <div className="flex rounded-b-md bg-[#181818] px-10 py-6">
          <div className="text-base leading-[27px] space-y-5 lg:text-[17px] lg:leading-8">
            <div className="flex items-center gap-x-3 text-[14px]">
              <p className="font-semibold text-green-500">{movie?.vote_average * 10} % Match</p>
              <p className="font-light italic">{movie?.release_date || movie?.first_air_date}</p>
              <div className="text-sm border-2 border-white/60 px-1.5 rounded">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-8 gap-y-3 md:gap-x-6 md:flex-row">
              <div className="w-full md:w-5/6">
                <p className={`${viewMore ? "h-auto line-clamp-none" : "line-clamp-3 h-24 "}`} ref={overviewRef}>{movie?.overview}</p>
                {
                  isTruncated  && (
                    <button
                      onClick={handlerViewMore}
                      className={`underline underline-offset-4 text-red-500 italic 
                        ${viewMore ? " hidden " : " !block"}`
                      }>Xem thêm
                    </button>
                  )
                }
                <button
                  onClick={handlerHidden}
                  className={`hidden underline underline-offset-4 text-red-500 italic 
                        ${viewMore ? " !block" : ""}`
                  }>Ẩn bớt
                </button>
              </div>

              <div className="flex flex-col space-y-3 text-base">
                <div className="mt-0.5">
                  <span className="text-[gray]">Genres: </span>
                  <span className="text-red-500 italic">{genres?.map((genre) => genre.name).join(', ')}</span>
                </div>
                <div>
                  <span className="text-[gray]">Original Language: </span>
                  <span className="text-red-500 italic">{movie?.original_language}</span>
                </div>
                <div>
                  <span className="text-[gray]">Total Votes: </span>
                  <span className="text-red-500 italic tracking-wider">{new Intl.NumberFormat().format(movie?.vote_count)}</span>
                </div>
              </div>
            </div>
          </div>
          <div>

          </div>
        </div>
      </>
    </Modal>
  )
}

export default ModalMui