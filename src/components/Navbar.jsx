// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light px-3">
      <div className="container-fluid">
        {/* Marca o Logo */}
        <Link className="navbar-brand" to="/">
          Mi Tienda
        </Link>

        {/* Links de navegación */}
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Inicio
          </Link>
          <Link className="nav-link" to="/about">
            Acerca
          </Link>
          <Link className="nav-link" to="/products">
            Productos
          </Link>
        </div>

        {/* Carrito a la derecha */}
        <div className="ms-auto d-flex align-items-center">
          <CartWidget to="/cart" showZero={false} />
        </div>
      </div>
    </nav>
  );
}
