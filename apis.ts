import axios from "axios";
import { Cat } from "./type";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export const getCats = async () => {
  const response = await api.get<Cat[]>("/common/cats");

  return response.data;
};
