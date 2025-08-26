import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/utils";
import { CartWidget } from "../CartWidget";
import { useCart } from "../../context/cart/useCart";
import { describe, expect, it } from "vitest";

function SeedCart() {
  const { add } = useCart();
  React.useEffect(() => {
    add({ id: "p1", title: "Teclado Mecánico", price: 119999 }, 1);
    add({ id: "p2", title: "Mouse Gamer", price: 34999 }, 2);
  }, [add]);
  return null;
}

describe("CartWidget (dropdown)", () => {
  it("muestra badge y abre/cierra el panel", async () => {
    renderWithProviders(
      <>
        <SeedCart />
        <CartWidget />
      </>
    );
    const u = userEvent.setup();

    expect(screen.getByTestId("cart-count")).toHaveTextContent("3");
    await u.click(screen.getByTestId("cart-widget-toggle"));
    expect(screen.getByTestId("cart-panel")).toBeInTheDocument();

    await u.keyboard("{Escape}");
    expect(screen.queryByTestId("cart-panel")).not.toBeInTheDocument();
  });

  it("permite sumar/restar cantidades", async () => {
    renderWithProviders(
      <>
        <SeedCart />
        <CartWidget />
      </>
    );
    const u = userEvent.setup();
    await u.click(screen.getByTestId("cart-widget-toggle"));

    await u.click(screen.getByTestId("inc-p1"));
    expect(screen.getByTestId("qty-p1")).toHaveTextContent("2");

    await u.click(screen.getByTestId("dec-p2"));
    expect(screen.getByTestId("qty-p2")).toHaveTextContent("1");
  });

  it("muestra vacío cuando no hay items", async () => {
    renderWithProviders(<CartWidget />);
    const u = userEvent.setup();
    await u.click(screen.getByTestId("cart-widget-toggle"));
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
  });
});
