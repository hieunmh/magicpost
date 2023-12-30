import { defineStore } from 'pinia';
import { TransactionPointType } from '~/types/transactionPointType';
import { TransactionType } from '~/types/transactionType';
import { UserType } from '~/types/userType';
import { PackageType } from '~/types/packageType';
import { AggregationType } from '~/types/aggregationType';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    allTransactionPoint: <TransactionPointType[] | null>[],
    isLoading: false,
    allTransactionHead: <(TransactionType & { users: UserType })[] | null>[],
    id: '',
    allNewPackage: <PackageType[] | null>[],
    allSentPackage: <PackageType[] | null>[],
    aggAddress: '',
    aggregation: <AggregationType>{},
    tranemployeeTab: '1',
    tranAddress: '',
  }),

})