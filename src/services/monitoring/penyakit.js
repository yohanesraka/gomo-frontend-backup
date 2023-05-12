import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, penyakit } = subApiUrl;

const list = () => baseApi.get(`${api}/${penyakit}`);
const add = (req) => baseApi.post(`${api}/${penyakit}`, req);
const edit = (req) => baseApi.put(`${api}/${penyakit}`, req);
const del = (req) => baseApi.delete(`${api}/${penyakit}`, {data: req});

export { list, add, edit, del };
