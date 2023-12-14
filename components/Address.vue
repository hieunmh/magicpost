<template>
  <div>
    <input type="text" @focus ="showPro = true" @click="getProvince()" class="bg-gray-100 mt-2 md:w-[90%] w-full h-9 rounded-xl outline-none pl-4 text-sm sm:text-xl"
      placeholder="">
    </div>

    <div class="flex w-[90%] bg-gray-100 rounded-md">
      <div class="w-1/3">
        <button v-if="showPro" class="w-full">
          <h4 class="text-center">Tỉnh / Thành Phố</h4>
        </button>
      </div>
      <div class="w-1/3">
        <button class="w-full">
          <h4 class="text-center">Quận / Huyện</h4>
        </button>
      </div>
      <div class="w-1/3">
        <button class="w-full">
          <h4 class="text-center">Phường / Xã</h4>
        </button>
      </div>
    </div>

    <div class="flex w-[90%] bg-gray-100">
      <div class="w-1/3">
        <option v-if="showPro" :value="pro.code" @click="getDistrict($event)" v-for="(pro, index) in provinces" :key="index">{{ pro.name }}</option>
      </div>
      <div class="w-1/3">
        <option :value="dis.code" @click="getWard($event)" v-for="(dis, index) in districts" :key="index">{{ dis.name }}</option>
      </div>  
      <div class="w-1/3">
        <option :value="war.code" @click="setAddress($event)" v-for="(war, index) in wards" :key="index">{{ war.name }}</option>
      </div>
    </div>
</template>

<script lang="ts" setup>
let provinces = ref<any>();
let districts = ref<any>();
let wards = ref<any>();

let showPro = ref<boolean>(false);
let showDis = ref<boolean>(false);

let address = {
  pro: "",
  dis: "",
  war: ""
}

let ph = "Vui lòng chọn";

const setAddress = async (event:any) => {
  let data = {
    pro: address.pro,
    dis: address.dis,
    war: address.war
  }

  let data2 = {
    city: data.pro + " / " + data.dis + " / " + data.war
  }

  ph = data2.city;

  console.log(data2.city);
  
}

  
const getProvince = async () => {
  const {data} = await useFetch('https://provinces.open-api.vn/api/?depth=1');
  provinces.value = data.value;
  address.pro = provinces.value.provinces;
}

const getDistrict = async (event:any) => {
  let code = event.target.value;
  const data: any = await useFetch('https://provinces.open-api.vn/api/p/' + code + '?depth=2'); 
  districts.value = data.data.value.districts;
  address.dis = districts.value.districts;
}  

const getWard = async (event:any) => {
  let code = event.target.value;
  const data: any = await useFetch('https://provinces.open-api.vn/api/d/' + code + '?depth=2');
  wards.value = data.data.value.wards;  
  address.war = wards.value.wards;
}

</script>