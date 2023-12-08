import { defineStore } from 'pinia';

export const useClientStore = defineStore('client', {
  state: () => ({
    isMenuOverlay: false,
    isLoading: true,
  }),
  
})