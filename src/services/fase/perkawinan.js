import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/riwayat-perkawinan`);
const listIndukan = () => baseApi.get(`${api}/perkawinan/waiting-list`);
const create = (req) => baseApi.post(`${api}/perkawinan`, req);
const updatePerkawinan = (req) => baseApi.put(`${api}/perkawinan`, req);
const sedangKawin = () => baseApi.get(`${api}/perkawinan`);

// Summary
const listPerkawinan = () => baseApi.get(`${api}/perkawinan/ternak`);

export { list, listIndukan, create, updatePerkawinan, listPerkawinan, sedangKawin };
