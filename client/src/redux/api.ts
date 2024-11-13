import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

myAxios.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(JSON.parse(err?.response?.data) || err)
);

export default myAxios;
