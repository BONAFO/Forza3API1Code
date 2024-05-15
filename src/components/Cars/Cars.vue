



<script setup>
import { useRoute } from "vue-router";
import { redirect } from "@/router/index";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import cars from "@/db/cars.json";



import { ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { create_token , unzip_token  } from "@/assets/zip";
import Store from "@/assets/store.manager";



const selectedCustomer = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
});

const route = useRoute();
const marca = route.params.marca;



if (marca == undefined) {
  redirect()
}


const cars_arr = cars.filter(c => c.marca.trim() == marca.trim() );


const select_car =(car)=>{
    redirect(marca +"/" + car)
}





if (localStorage.getItem(Store.get("API_NAME")) == null) {
  create_token(Store.get("save"));
} else {
  Store.save("save", unzip_token());
}


</script>



<template>
    <div>
      <button class="back-btn btn" @click="redirect()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-arrow-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
        />
      </svg>
    </button>
    </div>
   



    <div style="width: 100% !important;">
      
  <DataTable
    v-model:filters="filters"
    v-model:selection="selectedCustomer"
    :value="cars_arr"
    stateStorage="session"
    stateKey="dt-state-demo-session"
    paginator
    :rows="5"
    filterDisplay="menu"
    selectionMode="single"
    dataKey="id"
    :globalFilterFields="['name']"
    
  >
    <template #header>

        <IconField iconPosition="left">
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText style="width: 100%;" v-model="filters['global'].value" placeholder="..." />
      </IconField>

    </template>
    <Column class="table-color" field="name" header="Name"></Column>
    <Column class="table-color" field="" header="Select">
      <template #body="{ data }">
        <!-- <button :click="save_marca" class="button-table btn btn-primary">
          SELECT
        </button> -->
      <button @click="select_car(data.name)" class="button-table btn btn-primary">SELECT</button>
      </template>
    </Column>
  </DataTable>
    </div>
</template>

<style lang="less">
@import "../Home/less/style.less";
@import "@/less/basic.fonts.less";
</style>
