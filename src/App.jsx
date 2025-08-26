import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/cart/";
import Home from "./pages/Home";
import About from "./pages/About";
import { Navbar } from "./components/Navbar";
import Products from "./pages/Products";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
