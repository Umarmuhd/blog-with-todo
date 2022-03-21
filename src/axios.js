import axios from "axios";

const auth_token =
  "c6436023a9c29b484542d54442174fcab8e3451420f66be5c5968175fb23d50c";

const instance = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: { Authorization: `Bearer ${auth_token}` },
});

export default instance;
