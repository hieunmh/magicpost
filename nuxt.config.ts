// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  pages: true,
  modules: [
    '@nuxtjs/supabase',
    'nuxt-icon',
    '@nuxtjs/tailwindcss'
  ],
  supabase: {
    redirect: false
  }
})
