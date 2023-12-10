export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (!user.value && (from.fullPath == '/profile' || from.fullPath == '/profile/update')) {
    return navigateTo('/');
  }

})