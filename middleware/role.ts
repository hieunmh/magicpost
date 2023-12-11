import { useUserStore } from "~/store/user";
const userStore = useUserStore();

export default defineNuxtRouteMiddleware( async (to, from) => {
  const user = useSupabaseUser();

  if (user.value && !userStore.userInfo.role && to.fullPath.includes('/?code=')) {
    await useFetch('/api/auth/loginGG', {
      method: 'post',
      body: {
        email: user.value.email,
        id: user.value.id,
        phone: user.value.phone,
      } 
    })
  }
})