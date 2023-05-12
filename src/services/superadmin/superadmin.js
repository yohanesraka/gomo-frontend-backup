import { baseApi } from "@/services/api";

const getDataUsers = () => baseApi.get('api/superadmin/users');
const getPeternakan = () => baseApi.get('api/superadmin/peternakan');
const getNewToken = (request) => baseApi.post('api/superadmin/generate-token', request);
const setPremiumFarm = (request) => baseApi.post('api/superadmin/set-premium-farm', request);
const setFreeFarm = (request) => baseApi.post('api/superadmin/set-free-farm', request);

export { getDataUsers, getPeternakan, getNewToken, setPremiumFarm, setFreeFarm };
