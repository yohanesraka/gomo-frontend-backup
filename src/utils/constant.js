//const host = import.meta.env.VITE_BASE_API_URL;
// const host = "https://2d66-182-4-100-48.ngrok-free.app/";
const host = "http://localhost:51001";
// const host = "https://be-gomo.gembala.sembadafarm.com";

const baseApiUrl = `${host}/`;

const subApiUrl = {
  // Base
  auth: "auth",
  api: "api",
  // Sub Sub URL
  pakan: "pakan",
  kawin: "kawin",
  kandang: "kandang",
  kesehatan: "kesehatan",
  penyakit: "penyakit",
  ternak: "ternak",
  costumer: "costumer",
  total: "total",
  timbangan: "timbangan",
  produksi: "produksi-susu",
  exports: "export-to-excel",
};

export { host, baseApiUrl, subApiUrl };
