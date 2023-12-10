import { useUserStore } from '~/store/user';
const  userStore = useUserStore();
const user = useSupabaseUser();

export default defineNuxtRouteMiddleware( async (to, from) => {
  if (user.value && !userStore.userInfo.role && to.fullPath.includes('?code')) {
    await useFetch('/api/auth/loginGG', {
      method: 'post',
      body: {
        email: user.value?.email,
        id: user.value?.id,
        phone: user.value?.phone,
      }
    })
  }
})