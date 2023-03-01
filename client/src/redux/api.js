import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

export const signIn = (formdata) => API.post("/users/signin", formdata);
export const signUp = (formdata) => API.post("/users/signup", formdata);

//Tourdata
export const createFood = (foodData) => API.post("/food", foodData);
