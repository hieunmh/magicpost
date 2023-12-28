import { defineStore } from 'pinia';
import { TransactionPointType } from '~/types/transactionPointType';
import { TransactionType } from '~/types/transactionType';
import { UserType } from '~/types/userType';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    allTransactionPoint: <TransactionPointType[] | null>[],
    isLoading: false,
    allTransactionHead: <(TransactionType & { users: UserType })[] | null>[],
  }),
  
})