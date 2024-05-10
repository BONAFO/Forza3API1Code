import store from "@/plugins/vuex";

// const Store = store;

class Store_Class {
  constructor(store) {
    this.store = store;
  }

  pack(id) {
    const capitalized = id[0].toUpperCase() + id.slice(1, id.length);
    return {
      get: () => {
        return this.store.getters["get" + capitalized];
      },
      save: (value) => {
        this.store.commit("set" + capitalized, value);
      },
      dipatch: (value) => {
        this.store.dispatch("disp" + capitalized, value);
      },
    };
  }
}


// getTest(state) {
//     //   return state.test;
//     // },

const Store = new Store_Class(store);



// const test_pack = Store.pack("test");
// console.log(test_pack.get());
// test_pack.save('Gato');
// console.log(test_pack.get());

// const test_pack = Store.pack("gato");


export default Store;
