import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import RowItemMovie from '../components/Row-ItemMovie'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'
import requests from '../utils/requests'


interface PropsType {
  netflixOriginals: Movie[],
  trendingNow: Movie[],
  topRated: Movie[],
  actionMovies: Movie[],
  comedyMovies: Movie[],
  horrorMovies: Movie[],
  romanceMovies: Movie[],
  documentaries: Movie[],
}

const Home = ({ 
  netflixOriginals, 
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: PropsType) => {

  const { logout, loading } = useAuth();

  if(loading) return null;
  
  return (
    <div className='relative h-screen bg-gradient-to-b-custom'>
      <Head>
        <title>Neftlix Clone App</title>
        <link rel="icon" href="https://res.cloudinary.com/nam290596/image/upload/v1652358784/neftlix-clone-app/icon-for-netflix-24_hbnbpz.png" />
      </Head>

      {/* Header Component */}
      <Header/>

      <main className='relative px-6 pb-24  lg:px-16 z-[999]'>
        {/* Banner Component */}
        <Banner netflixOriginals={netflixOriginals}/>

        <section className='-mt-[6rem]'>
          {/* My List Component */}

          <RowItemMovie title="Trending Now" movies={trendingNow}/>
          <RowItemMovie title="Top Rated" movies={topRated}/>

          <RowItemMovie title="Action Movies" movies={actionMovies}/>
          <RowItemMovie title="Comedy Movies" movies={comedyMovies}/>
          <RowItemMovie title="Scary Movies" movies={horrorMovies}/>
          <RowItemMovie title="Romance Movies" movies={romanceMovies}/>
          <RowItemMovie title="Documentary Movies" movies={documentaries}/>

          {/* My List Component, TopRated, Action thrillers,Comedies, Scary Movie, 
          Romance Movies, Documentaries  */}
          {/* Row  */}
          {/* Row  */}
        </section>
      </main>
      {/* Modal  */}
    </div>
  )
}

export default Home


export const getServerSideProps = async () => {

  // get data
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
};
