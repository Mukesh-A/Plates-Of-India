import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

//Axios interceptors are functions that are called before a request is sent and after a response is received.
//https://geshan.com.np/blog/2022/12/axios-interceptors/#:~:text=Interceptors%20can%20be%20used%20to,%2C%20transform%20the%20response%2C%20etc.

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    /// basically this is for sending the user data to backend middleware
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
    // console.log("requeste", req);
  }
  return req;
});

export const signIn = (formdata) => API.post("/users/signin", formdata);
export const signUp = (formdata) => API.post("/users/signup", formdata);

//Tourdata
export const createFood = (foodData) => API.post("/post", foodData);
export const getFoods = () => API.get("/post");
export const getPost = (id) => API.get(`/post/${id}`);
