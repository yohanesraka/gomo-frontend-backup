import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/riwayat-pemerahan`);

// Summary
const listPemerahan = () => baseApi.get(`${api}/pemerahan/all-ternak`);


const sedangLaktasi = () => baseApi.get(`${api}/pemerahan/ternak`);

export { list, listPemerahan, sedangLaktasi };
