<script setup>
import Store from "@/assets/store.manager";

const delete_cache = () => {
  if (window.confirm("Delete all data?")) {
    localStorage.removeItem(Store.get("API_NAME"));
  }
};
</script>

<template>
  <button id="delete_btn" class="btn btn-danger" @click="delete_cache">
    DELETE
  </button>
</template>

<style lang="less" scoped>
@import "@/less/basic.fonts.less";
#delete_btn {
  width: 100%;
  color: #000000 !important;
}
</style>
