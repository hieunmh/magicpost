// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  pages: true,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/supabase',
    'nuxt-icon',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  supabase: {
    redirect: false
  },
  pwa: {
    manifest: {
      name: 'Magic Post',
      short_name: "MG Post",
      description: 'Day la Magic Post',
      theme_color: '#189ab4',
      icons: [
        {
          src: 'mgpostwhitev2.png',
          type: 'image/png'
        }
      ]
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL, 
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    }
  }
})
