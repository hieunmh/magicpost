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
    
    showSendAddress: false,
    sendProvince: '',
    sendDistrict: '',
    sendWard: '',
    
    showReceiveAddress: false,
    receiveProvince: '',
    receiveDistrict: '',
    receiveWard: '',

    showPackage: false,
  
  }),

})