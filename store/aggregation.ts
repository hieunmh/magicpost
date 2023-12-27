import { defineStore } from 'pinia';
import { AggregationPointType } from '~/types/aggregationPointType';
import { AggregationType } from '~/types/aggregationType';
import { UserType } from '~/types/userType';

export const useAggregationStore = defineStore('aggregation', {
  state: () => ({
    allAggregationPoint: <AggregationPointType[] | null>[],
    isLoading: false,
    id: '',
    allAggHead: <(AggregationType & { users: UserType })[] | null>[],
  }),

})