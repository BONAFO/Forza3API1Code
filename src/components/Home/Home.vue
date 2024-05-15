<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import marcas from "@/db/marcas.json";

import { ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { redirect } from "@/router/index";
import { create_token , unzip_token} from "@/assets/zip";

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

const select_marca = (marca) => {
  redirect(marca);
};


if (localStorage.getItem(Store.get("API_NAME")) == null) {
  create_token(Store.get("save"));
} else {
  Store.save("save", unzip_token());
}



</script>

<template>
  <div style="width: 100%">
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedCustomer"
      :value="marcas"
      stateStorage="session"
      stateKey="dt-state-demo-session"
      paginator
      :rows="5"
      filterDisplay="menu"
      selectionMode="single"
      dataKey="id"
      :globalFilterFields="['marca']"
    >
      <template #header>
        <IconField iconPosition="left">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="..." />
        </IconField>
      </template>
      <Column class="table-color" field="marca" header="Marca"></Column>
      <Column class="table-color" field="" header="">
        <template #body="{ data }">
          <!-- <button :click="select_marca" class="button-table btn btn-primary">
          SELECT
        </button> -->
          <button
            @click="select_marca(data.marca)"
            class="button-table btn btn-primary"
          >
            SELECT
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style lang="less">
@import "./less/style.less";
@import "@/less/basic.fonts.less";
</style>
