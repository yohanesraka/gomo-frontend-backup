import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const listTotal = () => baseApi.get(`${api}/kesehatan/total-sakit-by-penyakit`);
const list = () => baseApi.get(`${api}/kesehatan/ternak-sakit`);
const add = (req) => baseApi.post(`${api}/kesehatan/set-ternak-sakit`, req);
const edit = (req) =>
  baseApi.put(`${api}/kesehatan/update-status-kesehatan`, req);
const del = (req) => baseApi.delete(`${api}/riwayat-kesehatan/`, { data: req });
const detailKesehatan = (req) =>
  baseApi.get(`${api}/kesehatan/ternak-sakit?id_penyakit=${req}`);
const riwayatKesehatan = (req) =>
  baseApi.get(`${api}/riwayat-kesehatan?id_ternak=${req}`);
const listRiwayatKesehatan = () => baseApi.get(`${api}/riwayat-kesehatan`);

export {
  list,
  add,
  edit,
  del,
  detailKesehatan,
  listTotal,
  riwayatKesehatan,
  listRiwayatKesehatan,
};
