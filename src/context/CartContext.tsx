import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCart, updateCartItem, removeCartItem, addCartItem } from "@/lib/cart";
import { toast } from "sonner";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  lowStock?: boolean;
}

interface CartContextType {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  updateItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  addItem: (item: any) => void;
  clearCart: () => void;
  isLoading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load cart from localStorage on mount for session persistence
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Try to load from backend first
        const res = await getCart();
        if (res && res.items) {
          setItems(
            res.items.map((item: any) => ({
              productId: item.productId ?? item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              color: item.color ?? "",
              size: item.size ?? "",
              quantity: item.quantity,
              lowStock: item.lowStock ?? false,
            }))
          );
        }
      } catch (err) {
        // Fallback to localStorage if backend fails
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            setItems(parsedCart);
          } catch (parseErr) {
            console.error('Failed to parse saved cart:', parseErr);
          }
        }
        console.error('Failed to load cart from backend:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const updateItem = async (productId: number, quantity: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await updateCartItem(productId, quantity);
      if (res && res.cart && Array.isArray(res.cart.items)) {
        setItems(
          res.cart.items.map((item: any) => ({
            productId: item.productId ?? item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            color: item.color ?? "",
            size: item.size ?? "",
            quantity: item.quantity,
            lowStock: item.lowStock ?? false,
          }))
        );
        toast.success("Cart updated successfully");
      }
    } catch (err) {
      setError("Failed to update cart item");
      toast.error("Failed to update cart item");
      console.error("Update cart error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await removeCartItem(productId);
      setItems(items => items.filter(item => item.productId !== productId));
      toast.success("Item removed from cart");
    } catch (err) {
      setError("Failed to remove item from cart");
      toast.error("Failed to remove item from cart");
      console.error("Remove cart item error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (item: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await addCartItem(item);
      if (res && res.cart && Array.isArray(res.cart.items)) {
        setItems(
          res.cart.items.map((cartItem: any) => ({
            productId: cartItem.productId ?? cartItem.id,
            name: cartItem.name,
            price: cartItem.price,
            image: cartItem.image,
            color: cartItem.color ?? "",
            size: cartItem.size ?? "",
            quantity: cartItem.quantity,
            lowStock: cartItem.lowStock ?? false,
          }))
        );
        toast.success("Item added to cart");
      } else {
        // Fallback to local update if backend response is unexpected
        setItems(items => [
          ...items,
          {
            productId: item.productId ?? item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            color: item.color ?? "",
            size: item.size ?? "",
            quantity: item.quantity,
            lowStock: item.lowStock ?? false,
          }
        ]);
        toast.success("Item added to cart");
      }
    } catch (err) {
      setError("Failed to add item to cart");
      toast.error("Failed to add item to cart");
      console.error("Add cart item error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      setItems, 
      updateItem, 
      removeItem, 
      addItem, 
      clearCart, 
      isLoading, 
      error 
    }}>
      {children}
    </CartContext.Provider>
  );
};
