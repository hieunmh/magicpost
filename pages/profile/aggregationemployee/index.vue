<template>
  <MainLayout>
    <div class="h-[calc(100vh-160px)] w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
      <div class="w-full mt-6 px-4 sm:px-10 flex items-center justify-center">
        <div class="w-[1100px] flex flex-col">
          <AggregationAllOrder />
        </div>
      </div>
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useClientStore } from "~/store/client";
const clientStore = useClientStore();
import { usePackageStore } from "~/store/package";
const packageStore = usePackageStore();

let navigatorTab = ref<string>("OrderForm");

let phoneSender = ref<string>("");
let phoneReceiver = ref<string>("");
let textInput = ref<string>("");

let phoneError = ref<string>("");
let inputError = ref<string>("");

let isLoading = ref<boolean>(false);

onMounted(() => {
  navigatorTab.value = "OrderForm";
});

let isChecked = ref<boolean>(false);
let weight = ref<string>("0");

const toggleChecked = () => {
  if (isChecked.value == false) {
    isChecked.value = true;
  } else {
    isChecked.value = false;
  }
};

watch(() => phoneSender.value, () => {
  if (phoneSender.value.startsWith("(+84)")) return;

  if (!phoneSender.value.startsWith("0")) {
    phoneError.value = "Số điện thoại phải bắt đầu bằng 0";
  } else if (phoneSender.value.length < 10 && phoneSender.value.length > 0) {
    phoneError.value = "Số điện thoại phải đủ 10 chữ số";
  } else {
    phoneError.value = "";
  }
});

watch(() => phoneReceiver.value, () => {
  if (phoneReceiver.value.startsWith("(+84)")) return;
  if (!phoneReceiver.value.startsWith("0")) {
    phoneError.value = "Số điện thoại phải bắt đầu bằng 0";
  } else if (
    phoneReceiver.value.length < 10 &&
    phoneReceiver.value.length > 0
  ) {
    phoneError.value = "Số điện thoại phải đủ 10 chữ số";
  } else {
    phoneError.value = "";
  }
} );

watch(() => textInput.value,() => {
  if (textInput.value.length == 0) {
    inputError.value = "Vui lòng không để trống";
  }
});

const print = () => {
  window.print()
}

const Create = async () => {
  const {data} = await useFetch('/api/auth/Packages/CreateNewPackages', {
    method:'post',
    body: {
      package_info: packageStore.package_info,
      receiver_address: packageStore.receiver_address,
      receiver_name: packageStore.receiver_name,
      receiver_phone_no: packageStore.receiver_phone_no,
      sender_name: packageStore.sender_name,
      sender_address: packageStore.sender_address,
      sender_phone_no: packageStore.sender_phone_no,
      receiver_id: '',
      transportCharge: packageStore.transportCharge,
      mainCharge: packageStore.mainCharge,
      totalCharge: packageStore.totalCharge,
      notes: packageStore.notes,
      totalWeight: packageStore.totalWeight,
    }
  })
}

</script>
