export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (!user.value && from.fullPath.includes('profile')) {
    return navigateTo('/');
  }

})