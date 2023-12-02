export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (!user.value && from.fullPath == '/profile') {
    return navigateTo('/');
  }

})