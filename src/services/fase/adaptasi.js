import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/adaptasi/ternak`);
const hariKe1 = () => baseApi.get(`${api}/adaptasi/by-step?step=1`);
const hariKe2 = () => baseApi.get(`${api}/adaptasi/by-step?step=2`);
const hariKe3 = () => baseApi.get(`${api}/adaptasi/by-step?step=3`);
const hariKe4 = () => baseApi.get(`${api}/adaptasi/by-step?step=4`);
const hariKe5 = () => baseApi.get(`${api}/adaptasi/by-step?step=5`);

//List Ternak Per Step
const listAdaptasiHari1 = () => baseApi.get(`${api}/adaptasi/step?step=1`);
const listAdaptasiHari2 = () => baseApi.get(`${api}/adaptasi/step?step=2`);
const listAdaptasiHari3 = () => baseApi.get(`${api}/adaptasi/step?step=3`);
const listAdaptasiHari4 = () => baseApi.get(`${api}/adaptasi/step?step=4`);
const listAdaptasiHari5 = () => baseApi.get(`${api}/adaptasi/step?step=5`);

//Create Adaptasi
const createAdaptasi = (req) => baseApi.post(`${api}/adaptasi`, req);

//get all treatment
const getTreatment = (req) =>
  baseApi.get(`${api}/adaptasi/treatment/all?step=${req}`);

export {
  list,
  hariKe1,
  hariKe2,
  hariKe3,
  hariKe4,
  hariKe5,
  listAdaptasiHari1,
  listAdaptasiHari2,
  listAdaptasiHari3,
  listAdaptasiHari4,
  listAdaptasiHari5,
  createAdaptasi,
  getTreatment,
};
