<script setup>
import updates from "@/db/update.json";
import UpdateCard from "./Components/Update.component.vue";
</script>
<template>
  <div class="text-center">
    <h3 class="title">{{ $route.params.car }}</h3>
  </div>

  <div>
    <div id="prog-cont">
      <div class="text-center" id="progress-empty">
        <label class="label-prog" for="">100</label>
      </div>
      <div id="progress-fill"></div>
    </div>
  </div>

  <div>

     <img
      class="coins"
      src="https://static.vecteezy.com/system/resources/thumbnails/010/851/211/small/3d-illustration-golden-money-coins-png.png"
      alt=""
    />
    <label class="coin-label"  for="">0</label> 
  </div>

  <div class="text-center" style="margin: 10% 0%;">
    <button class="btn-add">+</button>
    <button class="btn-dec">-</button>
  </div>
</template>

<style lang="less">
@import "./less/style.less";
</style>
