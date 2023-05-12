import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const dropdown = () => baseApi.get(`${api}/form-input`);

export { dropdown };
