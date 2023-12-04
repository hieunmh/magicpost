export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  const router = useRouter();

  if (user.value && (from.fullPath == '/login' || from.fullPath == '/register')) {
    router.back();
  }

})