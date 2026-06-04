declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      NEXT_PUBLIC_API_DOMAIN: string
      AUTH_TRUST_HOST: string
      AUTH_SECRET: string
    }
  }
}

declare module 'swiper/css'
declare module 'swiper/css/pagination'
declare module 'swiper/css/grid'

export {}
