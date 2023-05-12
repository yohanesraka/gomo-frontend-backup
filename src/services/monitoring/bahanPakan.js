import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

// Pakan
const add = (req) => baseApi.post(`${api}/bahan-pakan/jenis`, req);
const edit = (req) => baseApi.put(`${api}/bahan-pakan/jenis`, req);
const del = (req) => baseApi.delete(`${api}/bahan-pakan/jenis`, { data: req });
const listJenisBahanPakan = (req) =>
  baseApi.get(`${api}/bahan-pakan/jenis${req}`);

// Detail pakan
const listBahanPakan = (req) =>
  baseApi.get(`${api}/bahan-pakan?id_jenis_bahan_pakan=${req}`);
const tambahBahanPakan = (req) => baseApi.post(`${api}/bahan-pakan`, req);

//nama bahan pakan
const listNamaBahanPakan = (req) =>
  baseApi.get(`${api}/bahan-pakan/jenis?id_jenis_bahan_pakan=${req}`);

export {
  add,
  edit,
  del,
  listJenisBahanPakan,
  listBahanPakan,
  tambahBahanPakan,
  listNamaBahanPakan,
};
