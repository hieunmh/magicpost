import { defineStore } from 'pinia';
import { UserType } from '~/types/userType';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: <UserType>{},
    allHead: <UserType[] | null>[],
    allPackage: <UserType[] | null>[],
    allTransactionEmployee: <UserType[] | null>[]
  }),
  
})