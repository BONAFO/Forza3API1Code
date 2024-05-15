import Store from "@/assets/store.manager";
import { create_token } from "@/assets/zip";



export const level_calculation = (level) => {
  const base = 80000;
  const calculation = 5000 * level * 0.8;
  return (base * level + calculation + base * level * 0.8);
};


for (let i = 0; i < 5; i++) {
  console.log(level_calculation(i));
}

const level_up = (exp, level) => {
  let breaker = level;
  let new_levels = 0;
  do {
    const lv_req = level_calculation(breaker);
    console.log(lv_req);
    if (exp >= lv_req) {
      new_levels++;
      breaker++;
    } else {
      breaker = 100 * 100 * 100 + 410;
    }
  } while (breaker < 100 * 100 * 100);

  return new_levels;
};

const add_coins = (id) => {
  Swal.fire({
    title: "ADD COINS",
    input: "number",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    preConfirm: (data) => {
      const save = Store.get("save");
      const i = save.cars.indexOf(save.cars.filter((c) => c.id == id)[0]);
      save.cars[i].exp += parseInt(data);
      const calculate_level = level_up(save.cars[i].exp, save.cars[i].level);
      console.log(calculate_level);
      save.cars[i].level += calculate_level;
      save.cars[i].coins += calculate_level;
      create_token(save);
    },
  });
};
const dec_coins = (id) => {
  Swal.fire({
    title: "DEC COINS",
    input: "number",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    preConfirm: (data) => {
      const save = Store.get("save");
      const i = save.cars.indexOf(save.cars.filter((c) => c.id == id)[0]);
      save.cars[i].exp -= parseInt(data);
      const calculate_level = level_up(save.cars[i].exp, 1) + 1;
      save.cars[i].coins -= save.cars[i].level - calculate_level;
      save.cars[i].level = calculate_level;
      // save.cars[i].level -=calculate_level;
      // save.cars[i].coins -=calculate_level;
      create_token(save)
    },
  });
};

// export const update_coins =()=>{
//   Swal.fire({
//     title: "UPDATE COINS",
//     text : "mis coins",
//     input: "number",
//     inputAttributes: {
//       autocapitalize: "off"
//     },
//     showCancelButton: true,
//     showLoaderOnConfirm: true,
//     preConfirm:  (data) => {

//     },
//     customClass:custom_style[0]
//   });

//   document.getElementById("swal2-html-container").className += " title-cus";
// }

export const mod_coins = (param, exp) => {
  if (param == "add") {
    add_coins(exp);
  } else if (param == "dec") {
    dec_coins(exp);
  }
};
