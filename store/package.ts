import { defineStore } from 'pinia';
import { PackageStatusType } from '~/types/packageStatusType';
import { PackageType } from '~/types/packageType';

export const usePackageStore = defineStore('user', {
  state: () => ({
    packageInfo: <PackageType>{},
    allPackage: <PackageType[] | null>[],
    allPackageStatus: <PackageStatusType[] | null>[]
  }),
})