import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, kawin, ternak } = subApiUrl;

// Get List Domba Betina
const listBetina = (req) => baseApi.get(`${api}/ternak/indukan${req}`);

// Get List Domba Jantan
const listPejantan = (req) => baseApi.get(`${api}/${kawin}/pejantan?${req}`);

// Get list Kawin (CRUD)
const listKawin = (req) => baseApi.get(`${api}/riwayat-perkawinan?id_indukan=${req}`);
const add = (req) => baseApi.post(`${api}/${kawin}`, req);
const edit = (req) => baseApi.put(`${api}/${kawin}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${kawin}/${req}`);

export { listBetina, listPejantan, add, edit, del, listKawin };
