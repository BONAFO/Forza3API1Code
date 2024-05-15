import LZString from "lz-string";
import Store from "@/assets/store.manager";

const table = [
  ["coins", "@a@"],
  ["cars", "@b@"],
  ["updates", "@c@"],
  ["sub_id", "@d@"],
  ["level", "@e@"],
];

function calculate_Bytes(cadena) {
  const buffer = new TextEncoder().encode(cadena);
  return buffer.byteLength;
}

export function create_token(data) {
  console.log(JSON.stringify(data));
  data = replaceData(data);
  let token = LZString.compressToUTF16(data);
  localStorage.setItem(Store.get("API_NAME"), token);
}

export function unzip_token() {
  let token = localStorage.getItem(Store.get("API_NAME"));
  token = LZString.decompressFromUTF16(token);
  token = revertData(token);
  return JSON.parse(token);
}

export const calculate_aval_store = () => {
  const max = 4 * 1024 * 1024;

  let used = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    used += calculate_Bytes(key) + calculate_Bytes(value);
  }

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    used += calculate_Bytes(key) + calculate_Bytes(value);
  }

  console.log(`Avaliable Space : ${max - used} bytes`);

  return { used, max: max - used };
};

export const replaceData = (data) => {
  data = JSON.stringify(data);
  table.map((en) => {
    data = data.replaceAll(en[0], en[1]);
  });
  return data;
};

export const revertData = (data) => {
  table.map((en) => {
    data = data.replaceAll(en[1], en[0]);
  });

  return data;
};
