import axios from "axios";
import React from "react";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);
    const allowedOrigins = ["http://localhost:4000"];
    const token = localStorage.getItem("access-token");
    if (allowedOrigins.includes(origin)) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export const fetchProductList = async () => {
  const { data } = await axios.get("http://localhost:4000/product");
  return data;
};
export const fetchProduct = async (id) => {
  const { data } = await axios.get(`http://localhost:4000/product/${id}`);
  return data;
};
export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `http://localhost:4000/auth/register`,
    input
  );
  return data;
};
export const UpdateProduct = async (input, product_id) => {
  const { data } = await axios.put(
    `http://localhost:4000/product/${product_id}`,
    input
  );
  return data;
};
export const postProduct = async (input) => {
  const { data } = await axios.post(`http://localhost:4000/product/`, input);
  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(`http://localhost:4000/auth/login`, input);
  return data;
};
export const fetchMe = async () => {
  const { data } = await axios.get(`http://localhost:4000/auth/me`);
  return data;
};
export const fetchLogout = async () => {
  const { data } = await axios.post(`http://localhost:4000/auth/logout`, {
    refresh_token: localStorage.getItem("refresh-token"),
  });
  return data;
};
export const postOrder = async (input) => {
  const { data } = await axios.post("http://localhost:4000/order", input);
  return data;
};
export const fetchOrders = async () => {
  const { data } = await axios.get("http://localhost:4000/order");
  return data;
};
export const orderDel = async (id) => {
  const { data } = await axios.delete(`http://localhost:4000/order/${id}`);
  return data;
};

export const fetchDel = async (id) => {
  const { data } = await axios.delete(`http://localhost:4000/product/${id}`);
  return data;
};
