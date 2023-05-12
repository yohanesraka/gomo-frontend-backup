import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/riwayat-kelahiran`);

//ternak kelahiran baru
const listCempeBaru = () => baseApi.get(`${api}/kelahiran/new-cempe`);

// Summary
const listKelahiran = () => baseApi.get(`${api}/kelahiran/data-ternak-kelahiran`);

//create
const create = (req) => baseApi.post(`${api}/kelahiran/create`, req);

export { list, listKelahiran, listCempeBaru, create };
