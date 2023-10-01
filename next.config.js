/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    API_KEY: process.env.local.API_KEY
  }
}

module.exports = nextConfig
