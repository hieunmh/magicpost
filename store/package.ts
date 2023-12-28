import { defineStore } from 'pinia';
import { PackageDetailType } from '~/types/packageDetailType';
import { PackageStatusType } from '~/types/packageStatusType';
import { PackageType } from '~/types/packageType';

export const usePackageStore = defineStore('package', {
  state: () => ({

    packageInfo: <PackageType & { packageDetails: PackageDetailType, packageStatus: PackageStatusType[] } | null>{},
    allPackage: <(PackageType & { packageDetails: PackageDetailType, packageStatus: PackageStatusType[] })[] | null>[],
    allPackageStatus: <PackageStatusType[] | null>[],
    showPackageInfo: false,
    id: '',
    allNewPackage: <PackageType[] | null>[],
    allSendPackage: <PackageType[] | null>[],
    allCancelPackage: <PackageType[] | null>[],
  }),
})