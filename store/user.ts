import { defineStore } from 'pinia';
import { UsersType } from '~/types/supabaseTableType';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: <UsersType>{},
  })
})