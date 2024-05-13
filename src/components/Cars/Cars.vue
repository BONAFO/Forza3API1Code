



<script setup>
import { useRoute } from "vue-router";
import { redirect } from "@/router/index";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import cars from "@/db/cars.json";
import {BASE_URL} from "@/router/index"



import { ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";

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
    // console.log(window.origin + BASE_URL + marca +"/" + car);
    // window.location.href = window.origin + BASE_URL + marca +"/" + car;
}
</script>



<template>
    <div>
      <button
        @click="
          redirect()
        "
      >
        BACK
      </button>
    </div>
   




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
    tableStyle="min-width: 100%"
  >
    <template #header>
      <IconField iconPosition="left">
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText v-model="filters['global'].value" placeholder="..." />
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
</template>

<style lang="less">
@import "../Home/less/style.less";
</style>
