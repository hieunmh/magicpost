import { defineStore } from 'pinia';
import { AggregationPointType } from '~/types/aggregationPointType';

export const useAggregationStore = defineStore('aggregation', {
  state: () => ({
    allAggregationPoint: <AggregationPointType[] | null>[]
  }),
  
})