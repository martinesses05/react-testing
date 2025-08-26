// src/components/__tests__/useCart_and_Provider.test.jsx
import React from "react";
import { screen, renderHook, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { renderHookWithCart, renderWithProviders } from "../../test/utils";
import { useCart } from "../../context/cart";

describe("useCart + CartProvider", () => {
  it("throw si se usa fuera del provider", () => {
    // renderHook ejecuta el hook; lo envolvemos en expect(...).toThrow(...)
    expect(() => renderHook(() => useCart())).toThrow(
      /dentro de <CartProvider>/i
    );
    // Si preferís un match más laxo:  /.+CartProvider|Invalid hook call|useCart/i
  });

  it("acciones: add, remove, setQty, clear", () => {
    const { result } = renderHookWithCart(() => useCart());
    const p = { id: "p1", title: "Prod", price: 100 };

    act(() => {
      result.current.add(p, 1);
      result.current.add(p, 2);
    });
    expect(result.current.items.find((i) => i.id === "p1")?.qty).toBe(3);

    act(() => {
      result.current.remove("p1", 1);
    });
    expect(result.current.items.find((i) => i.id === "p1")?.qty).toBe(2);

    act(() => {
      result.current.setQty("p1", 5);
    });
    expect(result.current.items.find((i) => i.id === "p1")?.qty).toBe(5);

    act(() => {
      result.current.clear();
    });
    expect(result.current.items).toEqual([]);
  });

  it("flujo mínimo con consumidor", async () => {
    function Dummy() {
      const { items, add, remove } = useCart();
      const p = { id: "p1", title: "X", price: 10 };
      return (
        <div>
          <span data-testid="qty">{items[0]?.qty ?? 0}</span>
          <button onClick={() => add(p, 1)}>add</button>
          <button onClick={() => remove("p1", 1)}>dec</button>
        </div>
      );
    }

    renderWithProviders(<Dummy />);
    const u = userEvent.setup();

    await u.click(screen.getByText("add"));
    await u.click(screen.getByText("add"));
    expect(screen.getByTestId("qty")).toHaveTextContent("2");

    await u.click(screen.getByText("dec"));
    expect(screen.getByTestId("qty")).toHaveTextContent("1");
  });
});
