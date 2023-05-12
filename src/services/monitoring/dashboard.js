import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const populasi = () => baseApi.get(`${api}/web-dash/populasi`);

const totalTernakByStatus = () =>
  baseApi.get(`${api}/web-dash/total-ternak-by-status`);

const totalTernakByFase = () =>
  baseApi.get(`${api}/web-dash/total-ternak-by-fase`);

const totalTernakByKandang = () =>
  baseApi.get(`${api}/web-dash/total-ternak-by-jenis-kandang`);

const totalTernakByStatusKeluar = () =>
  baseApi.get(`${api}/web-dash/total-ternak-by-status-keluar`);

const totalAdgCempe = () => baseApi.get(`${api}/web-dash/adg-cempe`);

const totalKandang = () => baseApi.get(`${api}/web-dash/total-kandang`);

const totalTernak = () => baseApi.get(`${api}/web-dash/total-ternak`);

const coordinate = () => baseApi.get(`${api}/web-dash/coordinate`);

export {
  populasi,
  totalTernakByStatus,
  totalTernakByFase,
  totalTernakByKandang,
  totalTernakByStatusKeluar,
  totalAdgCempe,
  totalKandang,
  totalTernak,
  coordinate,
};
