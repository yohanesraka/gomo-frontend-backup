import parseJwt from "@/utils/parseJwt";

const setCk = function setCookie(
  cName,
  value,
  { hour, ms, datetime },
  secure = false
) {
  const d = new Date();
  if (hour) d.setTime(d.getTime() + hour * 60 * 60 * 1000);
  if (ms) d.setTime(d.getTime() + ms);
  if (datetime) d.setTime(datetime);
  const cValue = secure ? window.btoa(value) : value;
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cName}=${cValue};${expires};path=/`;
};

const getCk = function getCookie(cName, secure = false) {
  const name = `${cName}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return secure
        ? window.atob(c.substring(name.length, c.length))
        : c.substring(name.length, c.length);
    }
  }
  return "";
};

const checkCk = function checkCookie(cName) {
  const user = getCk(cName);
  if (user !== "") {
    return true;
  }
  return false;
};

const delCk = function deleteCookie(cName) {
  setCk(cName, "", -1);
};

const certDetail = function getCertDetail() {
  const token = getCk("CERT");
  if (token) {
    const { id_user, nama_pengguna, role, status, id_peternakan, exp } = parseJwt(token);
    if (id_user === undefined) delCk("CERT");
    return {
      id_user,
      nama_pengguna,
      role,
      status,
      id_peternakan,
      exp,
    };
  }
  return {
    id_user: "",
    nama_pengguna: "",
    role: "",
    status: "",
    id_peternakan: "",
    exp: "",
  };
};

export { setCk, getCk, checkCk, delCk, certDetail };
