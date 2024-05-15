<script setup>
import { ref } from "vue";
import updates from "@/db/update.json";
import Store from "@/assets/store.manager";
import { create_token } from "@/assets/zip";

const props = defineProps({
  name: String,
  car: Number,
});

const updates_list = Object.keys(updates[props.name]);
const show_head = ref(false);

const change_stade = () => {
  show_head.value = !show_head.value;
};

const save = Store.get("save");
const car_info = save.cars.filter((c) => c.id == props.car)[0];
const car_index = save.cars.indexOf(car_info);

const content_was_bought = (update, i) => {
  const { updates_car } = get_update_save_index(update);

  if (updates_car != -1) {
    const update_level = car_info.updates[updates_car].lv;
    if (i <= update_level) {
      return "content-container-selected";
    }
  }

  return "";
};

const get_update_save_index = (update) => {
  const id = updates[props.name].id;
  const sub_id = updates[props.name][update].id;

  const updates_car = car_info.updates.indexOf(
    car_info.updates.filter((s) => s.id == id && s.sub_id == sub_id)[0]
  );

  return {
    id,
    sub_id,
    updates_car,
  };
};

const build_cost_lab = (update) => {
  const { id, sub_id, updates_car } = get_update_save_index(update);
  const cost = updates[props.name][update]["cost"];
  if (updates_car != -1) {
    const car_level = car_info.updates[updates_car].lv;
    if (car_level < cost.length) {
      return cost[car_level];
    } else {
      return "MAX!";
    }
  } else {
    return cost[0];
  }
};

const buy_upgrade = (update) => {
  const { id, sub_id, updates_car } = get_update_save_index(update);

  const car_coins = car_info.coins;
  let cost = updates[props.name][update].cost;

  if (updates_car === -1) {
    if (cost[0] <= car_coins) {
      if (confirm("Are you sure you want to buy this upgrade?")) {
        save.cars[car_index].coins -= cost[0];
        save.cars[car_index].updates.push({
          id,
          sub_id,
          lv: 1,
        });

        create_token(save);
      }
    } else {
      alert("NOT ENOUGHT COINS... GO AND RACE!!");
    }
  } else {
    cost =
      updates[props.name][update]["cost"][car_info.updates[updates_car].lv];

    // const update_data = save.cars[car_index].updates[updates_car]

    if (car_info.updates[updates_car].lv < updates[props.name][update]["cost"].length  ) {
      if (cost <= car_coins) {
        if (confirm("Are you sure you want to buy this upgrade?")) {
          save.cars[car_index].coins -= cost;
          save.cars[car_index].updates[updates_car].lv++;
          // save.cars[car_index].updates.push({
          //   id,
          //   sub_id,
          //   lv: 1,
          // });

          create_token(save);
        }
      } else {
        alert("NOT ENOUGHT COINS... GO AND RACE!!");
      }
    }else{
      alert("CONGRATULATIONS, YOU ALREADY BOUGHT ALL THE UPGRADES");
    }
  }
};
</script>
<template>
  <div class="text-center mt-3">
    <div class="card-subt" @click="change_stade('head')">
      <h2 class="d-inline-block">
        {{ name }}
      </h2>
    </div>
    <template v-if="show_head" v-for="update in updates_list">
      <div v-if="update != 'id'" @click="buy_upgrade(update)">
        <div class="card-subt card-content">
          <div
            class="d-inline-block position-relative"
            style="left: -35%; font-size: 25px"
          ></div>

          <h2 class="d-inline-block">
            {{ update }}
          </h2>

          <br />
          <div class="w-100">
            <template v-for="i in updates[name][update].lv">
              <div
                :class="`content-container ${content_was_bought(update, i)}`"
              ></div>
            </template>
            <br />
            <div>
              <img
                class="coins"
                src="https://static.vecteezy.com/system/resources/thumbnails/010/851/211/small/3d-illustration-golden-money-coins-png.png"
                alt=""
              />

              <label class="coin-label" style="color: #000000" for="">{{
                // updates[name][update]["cost"][
                //   get_update_save_index(update).updates_car != -1
                //     ? car_info.updates[
                //         get_update_save_index(update).updates_car
                //       ].lv
                //     : 0
                // ]
                build_cost_lab(update)
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
