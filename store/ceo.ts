import { defineStore } from 'pinia';

export const useCeoStore = defineStore('ceo', {
  state: () => ({
    sendPackage: <number | undefined>(0),
    receivePackage: <number | undefined>(0),
    show: true,
    loading: true,
    showUpdate: false,
    showUpdateTran: false,
    newEmail: <string>(''),
    newPhone: <string>(''),
  }),
})