import { toastAlert } from "../utils/ToastAlert";
import CartItem from "../models/CartItem";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + '/carts/user';

export const fetchCartItems = async (userId: number, token: string): Promise<CartItem[]> => {
  try {
    console.log("Buscando itens do carrinho para o usuário:", userId);
    console.log("Token JWT enviado:", token);
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("Erro ao buscar itens do carrinho:", response);
      const errorData = await response.json();
      console.error("Erro ao buscar itens do carrinho:", errorData);
      throw new Error(errorData.message || "Erro ao buscar itens do carrinho.");
    }

    const cartData = await response.json();
    console.log("Itens do carrinho carregados:", cartData.cartItems || []);
    return cartData.cartItems || []; // Retorna os itens do carrinho
  } catch (error) {
    console.error("Erro ao carregar o carrinho:", error);
    toastAlert("Erro ao carregar o carrinho.", "error");
    return [];
  }
};

export const fetchCartByUserId = async (userId: number, token: string): Promise<any> => {
  console.log("Token JWT enviado:", token);
  try {
    console.log("Buscando carrinho do usuário:", userId);
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao buscar carrinho do usuário:", errorData);
      throw new Error(errorData.message || "Erro ao buscar carrinho.");
    }

    const cartData = await response.json();
    console.log("Carrinho carregado:", cartData);
    return cartData; // Retorna o objeto completo do carrinho
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    throw error;
  }
};

export const addToCart = async (
  userId: number,
  cartId: number,
  productId: number,
  quantity: number,
  unitPrice: number,
  token: string
): Promise<CartItem[]> => {
  if (!userId || userId <= 0) {
    throw new Error("ID do usuário inválido.");
  }

  try {
    console.log("Token JWT enviado:", token);
    console.log("Enviando requisição para adicionar ao carrinho:", {
      userId,
      cartId,
      productId,
      quantity,
      unitPrice,
    });

    const response = await fetch(`${API_BASE_URL}/${userId}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        cart: { id: cartId },
        product: { id: productId },
        quantity,
        unitPrice,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao adicionar item ao carrinho:", errorData);
      throw new Error(errorData.message || "Erro ao adicionar item ao carrinho.");
    }

    const updatedCart = await response.json();
    console.log("Carrinho atualizado após adição:", updatedCart.items);
    return updatedCart.items;
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    toastAlert("Erro ao adicionar produto ao carrinho.", "error");
    throw error;
  }
};


  
export const updateCartItem = async (userId: number, cartItemId: number, quantity: number, token: string): Promise<CartItem[]> => {
  try {
    console.log("Atualizando quantidade de item no carrinho:", { userId, cartItemId, quantity });
    const response = await fetch(`${API_BASE_URL}/${userId}/update/${cartItemId}?quantity=${quantity}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao atualizar quantidade no carrinho:", errorData);
      throw new Error(errorData.message || "Erro ao atualizar quantidade.");
    }

    const updatedCart = await response.json();
    console.log("Carrinho atualizado após alteração de quantidade:", updatedCart.items);
    return updatedCart.items;
  } catch (error) {
    console.error("Erro ao atualizar quantidade no carrinho:", error);
    toastAlert("Erro ao atualizar quantidade no carrinho.", "error");
    return [];
  }
};

export const removeCartItem = async (userId: number, cartItemId: number, token: string): Promise<void> => {
  try {
    console.log("Removendo item do carrinho:", { userId, cartItemId });
    const response = await fetch(`${API_BASE_URL}/${userId}/remove/${cartItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao remover item do carrinho:", errorData);
      throw new Error(errorData.message || "Erro ao remover item.");
    }

    console.log("Item removido do carrinho com sucesso.");
    toastAlert("Item removido do carrinho.", "info");
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    toastAlert("Erro ao remover item do carrinho.", "error");
  }
};
