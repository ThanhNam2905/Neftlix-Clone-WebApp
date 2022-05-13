import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]'>
      <Head>
        <title>Neftlix Clone App</title>
        <link rel="icon" href="https://res.cloudinary.com/nam290596/image/upload/v1652358784/neftlix-clone-app/icon-for-netflix-24_hbnbpz.png" />
      </Head>

      <Header/>

      <main>
        {/* Banner  */}
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
