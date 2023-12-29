import { defineStore } from 'pinia';
import { AggregationPointType } from '~/types/aggregationPointType';
import { AggregationType } from '~/types/aggregationType';
import { PackageType } from '~/types/packageType';
import { UserType } from '~/types/userType';

export const useAggregationStore = defineStore('aggregation', {
  state: () => ({
    allAggregationPoint: <AggregationPointType[] | null>[],
    isLoading: false,
    id: '',
    allAggHead: <(AggregationType & { users: UserType })[] | null>[],
    allNewPackage: <PackageType[] | null>[],
    allSentPackage: <PackageType[] | null>[],
  }),

})