import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, auth } = subApiUrl;

const detail = () => baseApi.get(`${api}/${auth}/profile`);
const changePw = (req) => baseApi.put(`${api}/${auth}/update-password`, req);
const changeProfile = (req) =>
  baseApi.put(`${api}/${auth}/update-account`, req);
const registerBod = (req) => baseApi.post(`${api}/${auth}/register-bod`, req);
const hapusAkun = (req) =>
  baseApi.delete(`${api}/${auth}/delete-account`, { data: req });
const uploadFoto = (req) => baseApi.post(`${api}/${auth}/photo-profile`, req);
const hapusFoto = () => baseApi.delete(`${api}/${auth}/photo-profile`);

export { detail, changePw, changeProfile, registerBod, hapusAkun, uploadFoto, hapusFoto };
