import { defineStore } from 'pinia';
import { AggregationPointType } from '~/types/aggregationPointType';
import { AggregationType } from '~/types/aggregationType';
import { PackageDetailType } from '~/types/packageDetailType';
import { PackageStatusType } from '~/types/packageStatusType';
import { PackageType } from '~/types/packageType';
import { UserType } from '~/types/userType';

export const useAggregationStore = defineStore('aggregation', {
  state: () => ({
    allAggregationPoint: <AggregationPointType[] | null>[],
    isLoading: false,
    id: '',
    allAggHead: <(AggregationType & { users: UserType })[] | null>[],
    allNewPackage: <(PackageType & { packageStatus: PackageStatusType[], packageDetails: PackageDetailType })[] | null>[],
    allSentPackage: <(PackageType & { packageStatus: PackageStatusType[], packageDetails: PackageDetailType })[] | null>[],
    receivePackage: <number | undefined>(0),
    showNextLocation: false,
    nextLocation: <string | undefined>(''),
    aggregationId: <string>(''),
  }),

})