import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const actions = useMemo(
    () => ({
      add: (product, qty = 1) =>
        setItems((prev) => {
          if (!product?.id) return prev;
          const idx = prev.findIndex((i) => i.id === product.id);
          const inc = Number(qty) || 1;
          if (idx === -1) {
            return [...prev, { ...product, qty: inc }];
          }
          const next = [...prev];
          const cur = Number(next[idx].qty) || 0;
          next[idx] = { ...next[idx], qty: cur + inc };
          return next;
        }),

      // remove con dos comportamientos:
      // - remove(id, n) => resta n
      // - remove(id)    => elimina el ítem completo
      remove: (id, qty) =>
        setItems((prev) => {
          const idx = prev.findIndex((i) => i.id === id);
          if (idx === -1) return prev;

          if (qty == null) {
            // sin qty: quitar todo el ítem (compatibilidad)
            return prev.filter((i) => i.id !== id);
          }

          const dec = Number(qty) || 1;
          const cur = Number(prev[idx].qty) || 1;
          const newQty = cur - dec;

          if (newQty <= 0) {
            return prev.filter((i) => i.id !== id);
          }

          const next = [...prev];
          next[idx] = { ...prev[idx], qty: newQty };
          return next;
        }),

      setQty: (id, qty) =>
        setItems((prev) => {
          const n = Number(qty) || 0;
          if (n <= 0) return prev.filter((i) => i.id !== id);
          const idx = prev.findIndex((i) => i.id === id);
          if (idx === -1) return prev;
          const next = [...prev];
          next[idx] = { ...prev[idx], qty: n };
          return next;
        }),

      clear: () => setItems([]),
    }),
    []
  );

  const value = useMemo(() => ({ items, ...actions }), [items, actions]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = { children: PropTypes.node.isRequired };
export default CartProvider;
