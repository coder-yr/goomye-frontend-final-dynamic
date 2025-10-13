import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import OrderTrackPage from "./pages/order-track/Index";
import ResetPasswordPage from "./pages/ResetPassword";
import ReturnForm from "./pages/ReturnForm";
import NotFound from "./pages/NotFound";
import MyReviewsPage from "./pages/MyReviewsPage";
import MyOrders from "./pages/MyOrders";
import SignUpForm from "./app/signup/page";
import Products from "./pages/Products";
import ProductPage from "./pages/Product";
import Account from "./pages/Account";
import LoginPage from "./pages/login";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ReviewAndPay from "./pages/ReviewAndPay";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetails from "./pages/OrderDetails";
import RefundStatusPage from "./pages/refund-status/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/order-track/:orderId" element={<OrderTrackPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/return" element={<ReturnForm />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/review-and-pay" element={<ReviewAndPay />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/reviews" element={<MyReviewsPage />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/refund-status/:orderId" element={<RefundStatusPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
