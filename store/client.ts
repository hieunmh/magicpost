import { defineStore } from 'pinia';
import { RoleType } from '~/types/roleType';

export const useClientStore = defineStore('client', {
  state: () => ({
    isMenuOverlay: false,
    havePhone: true,
    isLoading: true,
    roles: <RoleType[]>[],
    showHeadDetail: false,
  }),
  
})