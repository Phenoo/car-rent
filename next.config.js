/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'res.cloudinary.com', 
          'avatars.githubusercontent.com',
          'lh3.googleusercontent.com',
          'pbs.twimg.com',
          'media.licdn.com'
        ]
      }
}

module.exports = nextConfig
