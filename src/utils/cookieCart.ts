import Cookies from 'js-cookie';
import { MenuItem } from '@/types';

export interface CartItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  imageUrl: string;
  specialInstructions?: string;
}

const CART_COOKIE_NAME = 'warung_sunda_cart';
const CART_EXPIRY_DAYS = 7;

export const cookieCartUtils = {
  // Get cart from cookies
  getCart: (): CartItem[] => {
    try {
      const cartData = Cookies.get(CART_COOKIE_NAME);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error reading cart from cookies:', error);
      return [];
    }
  },

  // Save cart to cookies
  setCart: (cart: CartItem[]): void => {
    try {
      Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), { 
        expires: CART_EXPIRY_DAYS,
        sameSite: 'strict'
      });
    } catch (error) {
      console.error('Error saving cart to cookies:', error);
    }
  },

  // Add item to cart
  addItem: (item: MenuItem, quantity: number, specialInstructions?: string): CartItem[] => {
    const currentCart = cookieCartUtils.getCart();
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.itemId === item.id);

    let updatedCart: CartItem[];

    if (existingItemIndex !== -1) {
      // Update existing item
      updatedCart = currentCart.map((cartItem, index) => 
        index === existingItemIndex 
          ? { 
              ...cartItem, 
              quantity: cartItem.quantity + quantity,
              total: (cartItem.quantity + quantity) * cartItem.price,
              specialInstructions: specialInstructions || cartItem.specialInstructions
            } 
          : cartItem
      );
    } else {
      // Add new item
      const newItem: CartItem = {
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity,
        total: quantity * item.price,
        imageUrl: item.imageUrl,
        specialInstructions
      };
      updatedCart = [...currentCart, newItem];
    }

    cookieCartUtils.setCart(updatedCart);
    return updatedCart;
  },

  // Remove item from cart
  removeItem: (itemId: string): CartItem[] => {
    const currentCart = cookieCartUtils.getCart();
    const updatedCart = currentCart.filter(item => item.itemId !== itemId);
    cookieCartUtils.setCart(updatedCart);
    return updatedCart;
  },

  // Update item quantity
  updateQuantity: (itemId: string, quantity: number): CartItem[] => {
    if (quantity <= 0) {
      return cookieCartUtils.removeItem(itemId);
    }

    const currentCart = cookieCartUtils.getCart();
    const updatedCart = currentCart.map(item => 
      item.itemId === itemId 
        ? { ...item, quantity, total: quantity * item.price } 
        : item
    );
    
    cookieCartUtils.setCart(updatedCart);
    return updatedCart;
  },

  // Clear cart
  clearCart: (): void => {
    Cookies.remove(CART_COOKIE_NAME);
  },

  // Get cart total
  getCartTotal: (): number => {
    const cart = cookieCartUtils.getCart();
    return cart.reduce((sum, item) => sum + item.total, 0);
  },

  // Get cart item count
  getCartItemCount: (): number => {
    const cart = cookieCartUtils.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }
};