import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { CartProvider } from "../context/cart/CartProvider";

// Render de componentes con Provider + Router
export function renderWithProviders(ui, { route = "/" } = {}) {
  const Wrapper = ({ children }) => (
    <CartProvider>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </CartProvider>
  );
  return render(ui, { wrapper: Wrapper });
}

// Render de hooks con CartProvider
export function renderHookWithCart(cb) {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
  return renderHook(cb, { wrapper });
}
