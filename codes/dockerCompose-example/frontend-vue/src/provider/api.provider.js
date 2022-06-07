import axios from "axios";

const base_url = "http://api-pessoa:3333/";

const Api = axios.create({
  baseURL: base_url,
});

export default Api;
