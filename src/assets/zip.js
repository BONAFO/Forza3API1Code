
import LZString from "lz-string";

function calculate_Bytes(cadena) {
  const buffer = new TextEncoder().encode(cadena);
  return buffer.byteLength;
}

export function create_token(token) {
  token = JSON.stringify(token);
  token = LZString.compressToUTF16(token);
  localStorage.setItem("F3-1", token);
}

export function unzip_token() {
  let token = localStorage.getItem("F3-1");
  token = LZString.decompressFromUTF16(token);
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

