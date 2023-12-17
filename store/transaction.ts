import { defineStore } from 'pinia';
import { TransactionPointType } from '~/types/transactionPointType';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    allTransactionPoint: <TransactionPointType[] | null>[]
  }),
  
})