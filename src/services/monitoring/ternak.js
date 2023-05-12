import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, ternak, timbangan } = subApiUrl;

const list = () => baseApi.get(`${api}/${ternak}`);
const add = (req) => baseApi.post(`${api}/${ternak}`, req);
const edit = (req) => baseApi.put(`${api}/${ternak}`, req);
const del = (req) => baseApi.put(`${api}/${ternak}/keluar`, req);

//perlakuan
const listPerlakuan = (req) =>
  baseApi.get(`${api}/adaptasi/main?id_ternak=${req}`);

// Dropdown
const listBangsa = () => baseApi.get(`${api}/bangsa`);
const listFase = () => baseApi.get(`${api}/fase`);
const statusTernak = () => baseApi.get(`${api}/status-ternak`);

// Jumlah Ternak
const listBetina = () => baseApi.get(`${api}/${ternak}/indukan`);
const listPejantan = () => baseApi.get(`${api}/${ternak}/pejantan`);

//timbangan
const listTimbangan = (req) =>
  baseApi.get(`${api}/${timbangan}?id_ternak=${req}`);

export {
  listBetina,
  listPejantan,
  list,
  add,
  edit,
  del,
  listBangsa,
  listFase,
  listTimbangan,
  statusTernak,
  listPerlakuan,
};
