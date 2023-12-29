import { defineStore } from 'pinia';
import { UserType } from '~/types/userType';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: <UserType>{},
    allHead: <UserType[] | null>[],
    allTransactionEmployee: <UserType[] | null>[],
    allAggregationEmployee: <UserType[] | null>[],
    isLoading: false,
  }),

})