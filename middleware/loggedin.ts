export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (user.value && (from.fullPath == '/login' || from.fullPath == '/register')) {    
    return navigateTo('/');
  }

})