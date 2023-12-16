import { defineStore } from 'pinia';
import { PackageStatusType } from '~/types/packageStatusType';
import { PackageType } from '~/types/packageType';
import { UserType } from '~/types/userType';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: <UserType>{},
    allHead: <UserType[] | null>[],
    allTransactionEmployee: <UserType[] | null>[]
  }),
  
})