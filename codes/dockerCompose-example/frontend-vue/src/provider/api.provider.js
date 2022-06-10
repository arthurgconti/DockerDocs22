import axios from "axios";

const base_url = "http://172.12.200.11:3333/";

const Api = axios.create({
  baseURL: base_url,
});

export default Api;
