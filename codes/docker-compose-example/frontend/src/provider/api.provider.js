import axios from "axios";

const base_url = import.meta.env.VITE_BASE_IP;

const Api = axios.create({
  baseURL: base_url,
});

export default Api;
