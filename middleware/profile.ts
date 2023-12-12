import { useUserStore } from '~/store/user';
const  userStore = useUserStore();
const user = useSupabaseUser();

export default defineNuxtRouteMiddleware((to, from) => {

  // if (!user.value && (from.fullPath == '/profile' || from.fullPath == '/profile/update')) {
  //   return navigateTo('/');
  // }

  // if (user.value && userStore.userInfo.role?.toLowerCase() != 'ceo' && from.fullPath == '/profile/ceo') {
  //   return navigateTo('/');
  // }

})