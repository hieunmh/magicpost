import { defineStore } from 'pinia';
import { TransactionPointType } from '~/types/transactionPointType';
import { TransactionType } from '~/types/transactionType';
import { UserType } from '~/types/userType';
import { PackageType } from '~/types/packageType';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    allTransactionPoint: <TransactionPointType[] | null>[],
    isLoading: false,
    id: '',
    allTranHead: <(TransactionType & { users: UserType })[] | null>[],
    allNewPackage: <PackageType[] | null>[],
    allSentPackage: <PackageType[] | null>[],
    aggAddress: '',
  }),

})