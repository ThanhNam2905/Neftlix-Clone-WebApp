import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
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
  
  return (
    <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511]'>
      <Head>
        <title>Neftlix Clone App</title>
        <link rel="icon" href="https://res.cloudinary.com/nam290596/image/upload/v1652358784/neftlix-clone-app/icon-for-netflix-24_hbnbpz.png" />
      </Head>

      {/* Header Component */}
      <Header/>

      <main className='relative px-6 pb-24 lg:space-y-24 lg:px-16'>
        {/* Banner Component */}
        <Banner netflixOriginals={netflixOriginals}/>

        <section>
          {/* Row  */}
          {/* Row  */}
          {/* Row  */}
          {/* Row  */}
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
