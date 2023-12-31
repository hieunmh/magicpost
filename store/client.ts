import { defineStore } from 'pinia';
import { RoleType } from '~/types/roleType';

export const useClientStore = defineStore('client', {
  state: () => ({
    isMenuOverlay: false,
    havePhone: true,
    isLoading: true,
    roles: <RoleType[]>[],
    showHeadDetail: false,
    provinces: <any>[],
    districts: <any>[],
    wards: <any>[],
    aggregations: <any>[],

    ceonavigatorTab: 'system',
    ordernavigatorTab: 'newOrder',
    aggEmployeeTab: '1',

    showSendAddress: false,
    sendProvince: '',
    sendDistrict: '',
    sendWard: '',

    showReceiveAddress: false,
    receiveProvince: '',
    receiveDistrict: '',
    receiveWard: '',

    showPackage: false,

    showNewSendAddress: false,
    newSendProvince: '',
    newSendDistrict: '',
    newSendWard: '',

    showNewReceiveAddress: false,
    newReceiveProvince: '',
    newReceiveDistrict: '',
    newReceiveWard: '',

    windowWidth: 0,

    showAggLocation: false,
    aggLocation: '',

  }),

})