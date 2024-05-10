<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import marcas2 from "@/db/marcas.json";

import { ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
let marcas = [marcas2[0]]
const customers = ref();
const selectedCustomer = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  "country.name": {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
});
</script>

<template>
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
    <Column class="table-color" field="marca" header="Marca"></Column>
    <Column class="table-color" field="" header="send">
      <template #body="{ data }">
        <button class="button-table btn btn-primary">

          <a :href="`${data.marca }/cars`">SELECT</a>
        </button>
      </template>
    </Column>
  </DataTable>
</template>

<style lang="less">
@import "./less/style.less";
</style>
