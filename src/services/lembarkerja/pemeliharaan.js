import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/pemeliharaan/`);
const listAll = () => baseApi.get(`${api}/pemeliharaan/all`);
const createPemeliharaan = (data) => baseApi.post(`${api}/pemeliharaan/`, data);

export { list, listAll, createPemeliharaan };
