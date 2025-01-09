import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

/**
 * Register a new user.
 * @param url The endpoint URL.
 * @param data The data to send in the request body.
 * @param setResponse Callback to set the response data.
 */
export const registerUser = async (url: string, data: Object, setResponse: Function) => {
  const response = await api.post(url, data);
  setResponse(response.data);
};

/**
 * Authenticate and log in a user.
 * @param url The endpoint URL.
 * @param data The data to send in the request body.
 * @param setResponse Callback to set the response data.
 */
export const loginUser = async (url: string, data: Object, setResponse: Function) => {
  const response = await api.post(url, data);
  setResponse(response.data);
};

/**
 * Fetch data from the server.
 * @param url The endpoint URL.
 * @param setResponse Callback to set the response data.
 * @param headers Optional request headers.
 */
export const fetchData = async (url: string, setResponse: Function, headers: Object) => {
  const response = await api.get(url, headers);
  setResponse(response.data);
};

/**
 * Post data to the server.
 * @param url The endpoint URL.
 * @param data The data to send in the request body.
 * @param setResponse Callback to set the response data.
 * @param headers Optional request headers.
 */
export const postData = async (url: string, data: Object, setResponse: Function, headers: Object) => {
  const response = await api.post(url, data, headers);
  setResponse(response.data);
};

/**
 * Update data on the server.
 * @param url The endpoint URL.
 * @param data The data to send in the request body.
 * @param setResponse Callback to set the response data.
 * @param headers Optional request headers.
 */
export const updateData = async (url: string, data: Object, setResponse: Function, headers: Object) => {
  const response = await api.put(url, data, headers);
  setResponse(response.data);
};

/**
 * Delete data on the server.
 * @param url The endpoint URL.
 * @param headers Optional request headers.
 */
export const deleteData = async (url: string, headers: Object) => {
  await api.delete(url, headers);
};
