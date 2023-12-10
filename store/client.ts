import { defineStore } from 'pinia';
import { RoleType } from '~/types/roleType';

export const useClientStore = defineStore('client', {
  state: () => ({
    isMenuOverlay: false,
    isLoading: true,
    roles: <RoleType[]>[] 
  }),
  
})