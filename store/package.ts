import { defineStore } from 'pinia';
import { PackageStatusType } from '~/types/packageStatusType';
import { PackageType } from '~/types/packageType';

export const usePackageStore = defineStore('package', {
  state: () => ({
    packageInfo: <PackageType>{},
    allNewPackage: <PackageType[] | null>[],
    allSendPackage: <PackageType[] | null>[],
    allShippedPackage: <PackageType[] | null>[],
    allPackage: <PackageType[] | null>[],
    allPackageStatus: <PackageStatusType[] | null>[]
  }),
})