
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { 
  User, 
  MenuItem, 
  Order, 
  OrderItem, 
  InventoryItem,
  Transaction,
  OrderStatus
} from '@/types';
import { useToast } from '@/hooks/use-toast';
import { cookieCartUtils, CartItem } from '@/utils/cookieCart';

// Define the context state
interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  cart: CartItem[];
  orders: Order[];
  menuItems: MenuItem[];
  inventory: InventoryItem[];
  transactions: Transaction[];
  isLoading: boolean;
}

// Define the context actions
interface AppActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  addToCart: (item: MenuItem, quantity: number, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (paymentMethod: string) => Promise<Order | null>;
  placeAnonymousOrder: (customerName: string, customerEmail?: string, paymentMethod?: string) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (item: MenuItem) => Promise<void>;
  updateItemAvailability: (itemId: string, status: 'available' | 'unavailable') => Promise<void>;
  addToWallet: (amount: number) => Promise<void>;
  payWithWallet: (amount: number) => Promise<boolean>;
}

// Combine state and actions for the context
type AppContextType = AppState & AppActions;

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data for initial development
import { mockUsers } from '@/data/users';
import { mockMenuItems } from '@/data/menu';
import { mockOrders } from '@/data/orders';
import { mockInventory } from '@/data/inventory';
import { mockTransactions } from '@/data/transactions';

// Create the provider
export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // State initialization
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { toast } = useToast();

  // Check if user is authenticated on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('smartCafeteriaUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load cart from cookies
    const cookieCart = cookieCartUtils.getCart();
    setCart(cookieCart);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const foundUser = mockUsers.find(u => u.email === email);
      
      // Simulating authentication
      if (foundUser) {
        // In a real app, you'd verify password here
        setUser(foundUser);
        localStorage.setItem('smartCafeteriaUser', JSON.stringify(foundUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartCafeteriaUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      // Create a new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: role as any,
        walletBalance: 0,
      };
      
      // In a real app, you'd save this to a database
      // For now, we'll just set the user state
      setUser(newUser);
      localStorage.setItem('smartCafeteriaUser', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart (works for both authenticated and anonymous users)
  const addToCart = (item: MenuItem, quantity: number, specialInstructions?: string) => {
    const updatedCart = cookieCartUtils.addItem(item, quantity, specialInstructions);
    setCart(updatedCart);
    
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${quantity} ${item.name} ditambahkan ke keranjang Anda`,
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    const updatedCart = cookieCartUtils.removeItem(itemId);
    setCart(updatedCart);
    
    toast({
      title: "Dihapus dari keranjang",
      description: "Item dihapus dari keranjang Anda",
    });
  };

  // Update cart item quantity
  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    const updatedCart = cookieCartUtils.updateQuantity(itemId, quantity);
    setCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    cookieCartUtils.clearCart();
    setCart([]);
  };

  // Place order (for authenticated users)
  const placeOrder = async (paymentMethod: string) => {
    if (cart.length === 0) {
      toast({
        title: "Tidak dapat membuat pesanan",
        description: "Keranjang Anda kosong",
        variant: "destructive",
      });
      return null;
    }
    
    if (!user) {
      toast({
        title: "Diperlukan autentikasi",
        description: "Silakan login untuk membuat pesanan",
        variant: "destructive",
      });
      return null;
    }
    
    setIsLoading(true);
    
    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);
      
      if (paymentMethod === 'wallet' && (user.walletBalance < totalAmount)) {
        throw new Error('Saldo dompet tidak mencukupi');
      }
      
      const now = new Date();
      const readyTime = new Date(now.getTime() + 15 * 60000);
      
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        customerId: user.id,
        customerName: user.name,
        items: cart.map(({ imageUrl, ...item }) => item),
        totalAmount,
        status: 'confirmed',
        createdAt: now.toISOString(),
        estimatedReadyTime: readyTime.toISOString(),
        paymentMethod: paymentMethod as any,
        paymentStatus: 'completed',
      };
      
      setOrders(currentOrders => [newOrder, ...currentOrders]);
      
      if (paymentMethod === 'wallet') {
        setUser(currentUser => {
          if (!currentUser) return null;
          return {
            ...currentUser,
            walletBalance: currentUser.walletBalance - totalAmount
          };
        });
        
        const newTransaction: Transaction = {
          id: `transaction-${Date.now()}`,
          userId: user.id,
          amount: totalAmount,
          type: 'payment',
          status: 'completed',
          createdAt: now.toISOString(),
          description: `Pembayaran untuk pesanan #${newOrder.id}`,
        };
        
        setTransactions(currentTransactions => [newTransaction, ...currentTransactions]);
      }
      
      clearCart();
      
      toast({
        title: "Pesanan berhasil dibuat",
        description: `Pesanan Anda #${newOrder.id.substring(6)} telah dibuat`,
      });
      
      return newOrder;
    } catch (error) {
      toast({
        title: "Gagal membuat pesanan",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const placeAnonymousOrder = async (customerName: string, customerEmail?: string, paymentMethod: string = 'qris') => {
    if (cart.length === 0) {
      toast({
        title: "Tidak dapat membuat pesanan",
        description: "Keranjang Anda kosong",
        variant: "destructive",
      });
      return null;
    }
    
    setIsLoading(true);
    
    try {
      // Calculate order total
      const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);
      
      // Create new order
      const now = new Date();
      const readyTime = new Date(now.getTime() + 15 * 60000); // 15 minutes from now
      
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        customerId: 'anonymous',
        customerName,
        items: cart.map(({ imageUrl, ...item }) => item), // Remove imageUrl from cart items
        totalAmount,
        status: 'confirmed',
        createdAt: now.toISOString(),
        estimatedReadyTime: readyTime.toISOString(),
        paymentMethod: paymentMethod as any,
        paymentStatus: 'completed',
      };
      
      // Update orders state
      setOrders(currentOrders => [newOrder, ...currentOrders]);
      
      // Clear the cart
      clearCart();
      
      toast({
        title: "Pesanan berhasil dibuat",
        description: `Pesanan Anda #${newOrder.id.substring(6)} telah dibuat`,
      });
      
      return newOrder;
    } catch (error) {
      toast({
        title: "Gagal membuat pesanan",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      setOrders(currentOrders => 
        currentOrders.map(order => 
          order.id === orderId 
            ? { 
                ...order, 
                status,
                completedAt: status === 'completed' ? new Date().toISOString() : order.completedAt 
              } 
            : order
        )
      );
      
      toast({
        title: "Order updated",
        description: `Order status updated to ${status}`,
      });
    } catch (error) {
      toast({
        title: "Failed to update order",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel order
  const cancelOrder = async (orderId: string) => {
    setIsLoading(true);
    try {
      // Get the order
      const order = orders.find(o => o.id === orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      
      // Check if order can be cancelled
      if (['completed', 'cancelled'].includes(order.status)) {
        throw new Error(`Order cannot be cancelled in ${order.status} state`);
      }
      
      // In a real app, this would be an API call
      setOrders(currentOrders => 
        currentOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' } 
            : order
        )
      );
      
      // If payment was made with wallet, refund the amount
      if (order.paymentMethod === 'wallet' && user) {
        setUser(currentUser => {
          if (!currentUser) return null;
          return {
            ...currentUser,
            walletBalance: currentUser.walletBalance + order.totalAmount
          };
        });
        
        // Add refund transaction
        const newTransaction: Transaction = {
          id: `transaction-${Date.now()}`,
          userId: user.id,
          amount: order.totalAmount,
          type: 'deposit',
          status: 'completed',
          createdAt: new Date().toISOString(),
          description: `Refund for cancelled order #${order.id.substring(6)}`,
        };
        
        setTransactions(currentTransactions => [newTransaction, ...currentTransactions]);
      }
      
      toast({
        title: "Order cancelled",
        description: `Your order #${order.id.substring(6)} has been cancelled`,
      });
    } catch (error) {
      toast({
        title: "Failed to cancel order",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Add menu item
  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const newItem: MenuItem = {
        ...item,
        id: `item-${Date.now()}`,
      };
      
      setMenuItems(currentItems => [...currentItems, newItem]);
      
      toast({
        title: "Menu item added",
        description: `${item.name} has been added to the menu`,
      });
    } catch (error) {
      toast({
        title: "Failed to add menu item",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update menu item
  const updateMenuItem = async (item: MenuItem) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      setMenuItems(currentItems => 
        currentItems.map(currentItem => 
          currentItem.id === item.id ? item : currentItem
        )
      );
      
      toast({
        title: "Menu item updated",
        description: `${item.name} has been updated`,
      });
    } catch (error) {
      toast({
        title: "Failed to update menu item",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update item availability
  const updateItemAvailability = async (itemId: string, status: 'available' | 'unavailable') => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      setMenuItems(currentItems => 
        currentItems.map(item => 
          item.id === itemId ? { ...item, status } : item
        )
      );
      
      const item = menuItems.find(item => item.id === itemId);
      
      toast({
        title: "Item availability updated",
        description: `${item?.name} is now ${status}`,
      });
    } catch (error) {
      toast({
        title: "Failed to update item availability",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Add to wallet
  const addToWallet = async (amount: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to add money to wallet",
        variant: "destructive",
      });
      throw new Error('Authentication required');
    }
    
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      setUser(currentUser => {
        if (!currentUser) return null;
        return {
          ...currentUser,
          walletBalance: currentUser.walletBalance + amount
        };
      });
      
      // Add transaction
      const newTransaction: Transaction = {
        id: `transaction-${Date.now()}`,
        userId: user.id,
        amount,
        type: 'deposit',
        status: 'completed',
        createdAt: new Date().toISOString(),
        description: `Added ₹${amount} to wallet`,
      };
      
      setTransactions(currentTransactions => [newTransaction, ...currentTransactions]);
      
      toast({
        title: "Wallet updated",
        description: `₹${amount} added to your wallet`,
      });
    } catch (error) {
      toast({
        title: "Failed to add money to wallet",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Pay with wallet
  const payWithWallet = async (amount: number): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to use wallet",
        variant: "destructive",
      });
      return false;
    }
    
    if (user.walletBalance < amount) {
      toast({
        title: "Insufficient balance",
        description: "Please add money to your wallet",
        variant: "destructive",
      });
      return false;
    }
    
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      setUser(currentUser => {
        if (!currentUser) return null;
        return {
          ...currentUser,
          walletBalance: currentUser.walletBalance - amount
        };
      });
      
      // Add transaction
      const newTransaction: Transaction = {
        id: `transaction-${Date.now()}`,
        userId: user.id,
        amount,
        type: 'payment',
        status: 'completed',
        createdAt: new Date().toISOString(),
        description: `Payment of ₹${amount} from wallet`,
      };
      
      setTransactions(currentTransactions => [newTransaction, ...currentTransactions]);
      
      toast({
        title: "Payment successful",
        description: `₹${amount} paid from your wallet`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AppContextType = {
    // State
    user,
    isAuthenticated: !!user,
    cart,
    orders,
    menuItems,
    inventory,
    transactions,
    isLoading,
    
    // Actions
    login,
    logout,
    register,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    placeOrder,
    placeAnonymousOrder,
    updateOrderStatus,
    cancelOrder,
    addMenuItem,
    updateMenuItem,
    updateItemAvailability,
    addToWallet,
    payWithWallet,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
