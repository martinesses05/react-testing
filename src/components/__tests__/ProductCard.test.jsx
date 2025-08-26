import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/utils";
import { ProductCard } from "../ProductCard";
import { describe, expect, it } from "vitest";

const product = {
  id: "p1",
  title: "Cafetera de Filtro",
  price: 69999,
  image: "https://picsum.photos/seed/cafetera/600/400",
  stock: 12,
};

describe("ProductCard", () => {
  it("agrega, muestra controles y vuelve a botón al llegar a 0", async () => {
    renderWithProviders(<ProductCard product={product} />);
    const u = userEvent.setup();

    await u.click(screen.getByTestId("add-btn-p1"));
    expect(screen.getByTestId("qty-controls-p1")).toBeInTheDocument();
    expect(screen.getByTestId("qty-p1")).toHaveTextContent("1");

    await u.click(screen.getByTestId("inc-btn-p1"));
    expect(screen.getByTestId("qty-p1")).toHaveTextContent("2");

    await u.click(screen.getByTestId("dec-btn-p1"));
    await u.click(screen.getByTestId("dec-btn-p1"));
    expect(screen.queryByTestId("qty-controls-p1")).not.toBeInTheDocument();
    expect(screen.getByTestId("add-btn-p1")).toBeInTheDocument();
  });
});
