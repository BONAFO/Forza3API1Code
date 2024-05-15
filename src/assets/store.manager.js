import store from "@/plugins/vuex";

class Store_Class {
  constructor(store) {
    this.store = store;
  }

  get(id) {
    const capitalized = id[0].toUpperCase() + id.slice(1, id.length);
    return this.store.getters["get" + capitalized];
  }
  save(id, value) {
    const capitalized = id[0].toUpperCase() + id.slice(1, id.length);
    this.store.commit("set" + capitalized, value);
  }
  dipatch(id, value) {
    const capitalized = id[0].toUpperCase() + id.slice(1, id.length);
    this.store.dispatch("disp" + capitalized, value);
  }

  pack(id) {
    return {
      get: () => {
        return this.get(id);
      },
      save: (value) => {
        return this.save(id,value);
      },
      dipatch: (value) => {
        return this.dipatch(id,value);
      },
    };
  }
}

const Store = new Store_Class(store);

export default Store;
