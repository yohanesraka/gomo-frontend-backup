import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/lk-pemasukan`);
const listThisMonth = () => baseApi.get(`${api}/lk-pemasukan/this-month`);
const getTernakBaru = () => baseApi.get(`${api}/lk-pemasukan/ternak-baru`);
const createLkPemasukan = (request) => baseApi.post(`${api}/lk-pemasukan`, request);

export { list, listThisMonth, getTernakBaru, createLkPemasukan };
