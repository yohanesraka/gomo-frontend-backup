import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, pakan } = subApiUrl;

// Pakan
const add = (req) => baseApi.post(`${api}/${pakan}/jenis`, req);
const edit = (req) => baseApi.put(`${api}/${pakan}/jenis`, req);
const del = (req) => baseApi.delete(`${api}/${pakan}/jenis`, { data: req });
const listJenis = (req) => baseApi.get(`${api}/${pakan}/jenis${req}`);

// Detail pakan
const listPakan = (req) => baseApi.get(`${api}/${pakan}?id_jenis_pakan=${req}`);
const tambahPakan = (req) => baseApi.post(`${api}/${pakan}`, req);
const kosongkanPakan = (req) => baseApi.post(`${api}/${pakan}/empty`, req);
const isiPakan = (req) => baseApi.post(`${api}/${pakan}/fill`, req);
const ubahPakan = (req) => baseApi.put(`${api}/${pakan}/fill`, req);
const deletePakan = (req) => baseApi.delete(`${api}/${pakan}`, { data: req });

//Detail nama pakan
const listNamaPakan = (req) =>
  baseApi.get(`${api}/${pakan}/jenis?id_jenis_pakan=${req}`);

export {
  add,
  edit,
  del,
  listJenis,
  listPakan,
  tambahPakan,
  kosongkanPakan,
  isiPakan,
  ubahPakan,
  deletePakan,
  listNamaPakan,
};
