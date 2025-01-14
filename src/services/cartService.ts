import Cart from "../models/Cart";
import CartItem from "../models/CartItem";
import { toastAlert } from "../utils/ToastAlert";

// URL base da API
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + '/carts/user';


// Função utilitária para requisições à API
const apiRequest = async <T>(
  url: string,
  method: string,
  token: string,
  body?: object
): Promise<T> => {
  if (!token) {
    throw new Error("Token não fornecido.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  console.log('headers:', headers, 'options:', options, 'response:', response,'body:', body, 'url:', url);
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro na requisição:", errorData);
    throw new Error(errorData.message || "Erro na requisição.");
  }

  return response.json();
};

// Serviço: Buscar itens do carrinho
export const fetchCartItems = async (userId: number, token: string): Promise<CartItem[]> => {
  try {
    const url = `${API_BASE_URL}/${userId}`;
    const cartData = await apiRequest<Cart>(url, "GET", token);
    return cartData.cartItems || [];
  } catch (error) {
    console.error("Erro ao carregar o carrinho:", error);
    toastAlert("Erro ao carregar o carrinho.", "error");
    return [];
  }
};

// Serviço: Buscar carrinho completo
export const fetchCartByUserId = async (userId: number, token: string): Promise<Cart> => {
  try {
    const url = `${API_BASE_URL}/${userId}`;
    return await apiRequest<Cart>(url, "GET", token);
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    throw error;
  }
};

// Serviço: Adicionar ao carrinho
export const addToCart = async (
  userId: number,
  cartId: number,
  productId: number,
  quantity: number,
  unitPrice: number,
  token: string
): Promise<CartItem[]> => {
  try {
    const url = `${API_BASE_URL}/${userId}/add`;
    const body = {
      cart: { id: cartId },
      product: { id: productId },
      quantity,
      unitPrice,
    };

    const updatedCart = await apiRequest<Cart>(url, "POST", token, body);
    return updatedCart.cartItems;
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    toastAlert("Erro ao adicionar produto ao carrinho.", "error");
    throw error;
  }
};

// Serviço: Atualizar item do carrinho
export const updateCartItem = async (
  userId: number,
  cartItemId: number,
  quantity: number,
  token: string
): Promise<CartItem[]> => {
  try {
    const url = `${API_BASE_URL}/${userId}/update/${cartItemId}?quantity=${quantity}`;
    const updatedCart = await apiRequest<Cart>(url, "PUT", token);
    return updatedCart.cartItems;
  } catch (error) {
    console.error("Erro ao atualizar quantidade no carrinho:", error);
    toastAlert("Erro ao atualizar quantidade no carrinho.", "error");
    return [];
  }
};

// Serviço: Remover item do carrinho
export const removeCartItem = async (
  userId: number,
  cartItemId: number,
  token: string
): Promise<void> => {
  try {
    const url = `${API_BASE_URL}/${userId}/remove/${cartItemId}`;
    await apiRequest<void>(url, "DELETE", token);
    toastAlert("Item removido do carrinho.", "info");
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    toastAlert("Erro ao remover item do carrinho.", "error");
  }
};
