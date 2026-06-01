import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/auth/userAuth/login";
import Register from "./pages/auth/userAuth/Register";
import Homepage from "./pages/home/Homepage";
import WishList from "./pages/wishlist/WishList";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Payment from "./pages/payment/Payment";
import Account from "./components/user-account/Account";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import NotFound from "./pages/404Error/NotFound";
import Product from "./pages/product/Product";
import UserDashboard from "./pages/home/UserDashboard";
import BestSelling from "./pages/home/products/best-selling/BestSelling";
import AllProducts from "./pages/AllProducts/AllProducts";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route>
        <Route path="/best-selling-products" element={<BestSelling />} />
        <Route path="/products" element={<AllProducts />} />
      </Route>
      <Route>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/wishlist" element={<WishList />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/checkout" element={<Checkout />} />
        <Route path="/user/payment" element={<Payment />} />
        <Route path="/user/account" element={<Account />} />
        <Route path="/user/about" element={<About />} />

        <Route path="/user/contact" element={<Contact />} />
        <Route path="/user/notfound" element={<NotFound />} />
        <Route path="/user/product/:id" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
