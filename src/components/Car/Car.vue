<script setup>
import updates from "@/db/update.json";
import UpdateCard from "./Components/Update.component.vue";

import UpdateButtonCoin from "@/components/UpdateCoins/Update_Coins.vue";
import cars from "@/db/cars.json";

import { redirect } from "@/router/index";
import { mod_coins, level_calculation } from "./Car";
import { useRoute } from "vue-router";
import { create_token, unzip_token } from "@/assets/zip";
import Store from "@/assets/store.manager";
import { computed } from "vue";
import { XTOPER } from "@/assets/percent";
import { ref } from "vue";
const route = useRoute();
const marca = route.params.marca;
const car = cars.filter((c) => c.name == route.params.car)[0];
const url_img = car.url || "https://images5.alphacoders.com/929/929552.jpg";

if (localStorage.getItem(Store.get("API_NAME")) == null) {
  create_token(Store.get("save"));
} else {
  Store.save("save", unzip_token());
}





const save = Store.get("save");

if (save.cars.filter((c) => c.id == car.id)[0] == undefined) {
  save.cars.push({
    id: car.id,
    exp: 0,
    coins: 0,
    updates: [],
    level: 1,
  });
  Store.save("save", save);
  create_token(Store.get("save"));
}

const save_car = save.cars.filter((c) => c.id == car.id)[0];

const bar_filled = computed(() => {
  const prev_level = level_calculation(save_car.level - 1);
  let next_level = level_calculation(save_car.level);
  next_level -= prev_level;
  const actual_exp = save_car.exp - prev_level;
  return Math.floor(XTOPER(next_level, actual_exp));
});


const names = Object.keys(updates);

const updates_list = Object.keys(updates[names[0]]);

const show_head = ref(true);

const change_stade = () => {
  show_head.value = !show_head.value;
};


</script>

<template>
  <div>
    <button class="back-btn btn" @click="redirect(marca)">
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

  <div class="text-center">
    <h3 class="title">{{ car.name }}</h3>
  </div>

  <div>
    <div id="prog-cont">
      <div class="text-center" id="progress-empty">
        <label class="label-prog" for="">{{ bar_filled }}%</label>
      </div>
      <div id="progress-fill" :style="`width: ${bar_filled}%;`"></div>
    </div>
  </div>

  <div id="car-img">
    <img style="width: 100%" :src="url_img" alt="" />
  </div>

  <div style="margin-bottom: 5%">
    <img
      class="coins"
      src="https://static.vecteezy.com/system/resources/thumbnails/010/851/211/small/3d-illustration-golden-money-coins-png.png"
      alt=""
    />
    <label class="coin-label" for="">{{ save_car.coins }}</label>
  </div>

  <div class="text-center">
    <button @click="mod_coins('add', save_car.id)" class="btn-add">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-plus-lg"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
        />
      </svg>
    </button>
    <button @click="mod_coins('dec', save_car.id)" class="btn-dec">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-dash"
        viewBox="0 0 16 16"
      >
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
      </svg>
    </button>
  </div>

  <!-- asd -->
  <!-- <div class="text-center mt-3">
    <div class="card-subt" @click="change_stade('head')">
      <div
        class="d-inline-block position-relative"
        style="left: -35%; font-size: 25px"
      >
        +
      </div>
      <h2 class="d-inline-block">
        {{ names[0] }}
      </h2>
    </div>
    <template v-if="show_head" v-for="update in updates_list">
      <div v-if="update != 'id'">
        <div class="card-subt card-content">
          <div
            class="d-inline-block position-relative"
            style="left: -35%; font-size: 25px"
          ></div>

          <h2 class="d-inline-block" @click="change_stade('head')">
            {{ update }}
          </h2>

          <br />
          <div class="w-100">
            <template v-for="i in updates[names[0]][update].lv">
              <div class="content-container"></div>
            </template>
            <br />
            <div>
              <img
                class="coins"
                src="https://static.vecteezy.com/system/resources/thumbnails/010/851/211/small/3d-illustration-golden-money-coins-png.png"
                alt=""
              />
              <label class="coin-label" style="color: #000000" for="">{{
                save_car.coins
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div> -->

  <template v-for="name in names">
    <div v-if="name !== 'Conversion'">
    <UpdateCard :car="save_car.id" :name="name"></UpdateCard>
  </div>
  </template>

  
  <UpdateButtonCoin></UpdateButtonCoin>
</template>

<style lang="less">
@import "./less/style.less";
@import "@/less/basic.fonts.less";
@import "@/less/sw2-custom-style.less";
</style>
