import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, produksiSusu} = subApiUrl;

const list = () => baseApi.get(`${api}/${produksiSusu}`);
const add = (req) => baseApi.post(`${api}/${produksiSusu}`, req);
const edit = (req) => baseApi.put(`${api}/${produksiSusu}`, req);
const del = (req) => baseApi.put(`${api}/${produksiSusu}/keluar`, req);

//produksiSusu
const listproduksiSusu = (req) =>
  baseApi.get(`${api}/${produksiSusu}?id_ternak=${req}`);

export {
  listproduksiSusu,
  list,
};
