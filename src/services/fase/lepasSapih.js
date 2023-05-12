import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

//list Lepas Sapih
const list = () => baseApi.get(`${api}/riwayat-lepas-sapih`);

//sumary
const listLepasSapih = () => baseApi.get(`${api}/lepas-sapih/ternak-dash`);
const createLepasSapih = (req) => baseApi.post(`${api}/lepas-sapih`, req);
const cempe = () => baseApi.get(`${api}/kelahiran/data-ternak-kelahiran`);
const ternakLepasSapih = (req) => baseApi.get(`${api}/lepas-sapih`, req);
const seleksiTernak = (req) => baseApi.post(`${api}/lepas-sapih/seleksi`, req);

export { list, listLepasSapih, createLepasSapih, cempe, ternakLepasSapih, seleksiTernak };
