import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/utils";
import { Navbar } from "../Navbar";
import { useCart } from "../../context/cart/useCart";
import { describe, expect, it } from "vitest";

// Seed sencillo para ver badge y panel
function SeedCart() {
  const { add } = useCart();
  React.useEffect(() => {
    add({ id: "p1", title: "Teclado Mecánico", price: 119999 }, 1);
  }, [add]);
  return null;
}

describe("Navbar", () => {
  it("renderiza links y el CartWidget", () => {
    renderWithProviders(<Navbar />);

    const brand = screen.getByRole("link", { name: /mi tienda/i });
    const linkInicio = screen.getByRole("link", { name: /inicio/i });
    const linkAcerca = screen.getByRole("link", { name: /acerca/i });
    const linkProductos = screen.getByRole("link", { name: /productos/i });

    // Usar getAttribute para evitar URL absolutas de jsdom
    expect(brand.getAttribute("href")).toBe("/");
    expect(linkInicio.getAttribute("href")).toBe("/");
    expect(linkAcerca.getAttribute("href")).toBe("/about");
    expect(linkProductos.getAttribute("href")).toBe("/products");

    // CartWidget presente (toggle)
    expect(screen.getByTestId("cart-widget-toggle")).toBeInTheDocument();
  });

  it("muestra badge con cantidad y abre/cierra el panel del carrito", async () => {
    renderWithProviders(
      <>
        <SeedCart />
        <Navbar />
      </>
    );
    const u = userEvent.setup();

    // Badge debería mostrar 1
    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");

    // Abrir panel
    await u.click(screen.getByTestId("cart-widget-toggle"));
    expect(screen.getByTestId("cart-panel")).toBeInTheDocument();
    expect(screen.getByText(/teclado mecánico/i)).toBeInTheDocument();

    // Cerrar con Escape
    await u.keyboard("{Escape}");
    expect(screen.queryByTestId("cart-panel")).not.toBeInTheDocument();
  });
});
