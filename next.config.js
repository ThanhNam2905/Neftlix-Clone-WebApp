/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  // config error url src <Image/> in next/image
  images: {
    domains: ['image.tmdb.org']
  }
}
