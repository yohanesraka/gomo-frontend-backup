import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, kandang, ternak } = subApiUrl;

const add = (req) => baseApi.post(`${api}/${kandang}`, req);
const edit = (req) => baseApi.put(`${api}/${kandang}`, req);
const del = (req) => baseApi.delete(`${api}/${kandang}`, { data: req });

const listKandang = () => baseApi.get(`${api}/${kandang}`);
const jenisKandang = () => baseApi.get(`${api}/jenis-kandang`);

//detail kandang
const detailKandang = (req) =>
  baseApi.get(`${api}/${ternak}?id_kandang=${req}`);

export { add, edit, del, listKandang, jenisKandang, detailKandang };
