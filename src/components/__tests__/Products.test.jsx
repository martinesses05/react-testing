import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/utils";

import { CartWidget } from "../../components/CartWidget";
import { MOCK_PRODUCTS } from "../../data/products";
import { describe, expect, it } from "vitest";
import Products from "../../pages/Products";

describe("Products page", () => {
  it("renderiza grid y refleja agregados en el CartWidget", async () => {
    renderWithProviders(
      <>
        <CartWidget />
        <Products />
      </>
    );
    const u = userEvent.setup();

    const cards = screen.getAllByTestId(/product-card-/);
    expect(cards.length).toBe(MOCK_PRODUCTS.length);

    const first = cards[0];
    await u.click(within(first).getByRole("button", { name: /agregar/i }));

    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
    await u.click(screen.getByTestId("cart-widget-toggle"));
    const panel = screen.getByTestId("cart-panel");
    // Buscá dentro del panel para evitar ambigüedad con el grid
    expect(within(panel).getByText(MOCK_PRODUCTS[0].title)).toBeInTheDocument();
  });
});
