import axios from "axios";

const base_url = "http://172.17.0.2:3333/";

const Api = axios.create({
  baseURL: base_url,
});

export default Api;
