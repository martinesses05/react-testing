import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/cart";

function formatPrice(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

/**
 * CartWidget con toggle (dropdown)
 * - Muestra badge con cantidad total
 * - Al hacer click, despliega listado con + / −, subtotal y total
 * - Cierra con click afuera o tecla Escape
 */
function CartWidgetBase({ showZero = false, className = "" }) {
  const { items, add, remove, clear } = useCart();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Cerrar al clickear afuera o con Escape
  useEffect(() => {
    function handleClick(e) {
      if (open && ref.current && !ref.current.contains(e.target))
        setOpen(false);
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const count = useMemo(() => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((acc, it) => acc + (Number(it?.qty) || 1), 0);
  }, [items]);

  const total = useMemo(() => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((acc, it) => acc + (it.price || 0) * (it.qty || 1), 0);
  }, [items]);

  const shouldShowBadge = showZero ? true : count > 0;
  const hasClear = typeof clear === "function";

  return (
    <div className={`position-relative ${className}`} ref={ref}>
      {/* Botón del carrito (toggle) */}
      <button
        type="button"
        className="btn btn-link text-decoration-none position-relative cart-widget"
        aria-expanded={open}
        aria-label={`Carrito (${count} ${
          count === 1 ? "artículo" : "artículos"
        })`}
        onClick={() => setOpen((v) => !v)}
        data-testid="cart-widget-toggle"
      >
        <span
          className="cart-widget__icon"
          aria-hidden="true"
          data-testid="cart-icon"
        >
          🛒
        </span>
        {shouldShowBadge && (
          <span
            className="cart-widget__badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            data-testid="cart-count"
            title={`${count} en el carrito`}
          >
            {count}
          </span>
        )}
      </button>

      {/* Panel desplegable */}
      {open && (
        <div
          role="dialog"
          aria-label="Carrito"
          className="card shadow position-absolute end-0 mt-2"
          style={{ width: 360, zIndex: 1050 }}
          data-testid="cart-panel"
        >
          <div className="card-header d-flex justify-content-between align-items-center py-2">
            <strong>Tu carrito</strong>
            {hasClear && items?.length > 0 && (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={clear}
                data-testid="clear-cart"
              >
                Vaciar
              </button>
            )}
          </div>

          <div
            className="list-group list-group-flush"
            style={{ maxHeight: "50vh", overflow: "auto" }}
          >
            {!items?.length ? (
              <div className="p-3 text-muted" data-testid="empty-cart">
                Tu carrito está vacío.
              </div>
            ) : (
              items.map((it) => (
                <div key={it.id} className="list-group-item">
                  <div className="d-flex gap-2">
                    {it.image ? (
                      <img
                        src={it.image}
                        alt={it.title}
                        width={56}
                        height={56}
                        className="rounded"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="rounded bg-light d-flex align-items-center justify-content-center"
                        style={{ width: 56, height: 56 }}
                      >
                        🛍️
                      </div>
                    )}

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <div className="fw-semibold">{it.title}</div>
                        <div className="text-nowrap">
                          {formatPrice(it.price)}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <div
                          className="btn-group btn-group-sm"
                          role="group"
                          aria-label={`Cantidad de ${it.title}`}
                        >
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => remove(it.id, 1)}
                            data-testid={`dec-${it.id}`}
                          >
                            −
                          </button>
                          <span
                            className="btn btn-outline-secondary disabled"
                            data-testid={`qty-${it.id}`}
                          >
                            {it.qty || 1}
                          </span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => add(it, 1)}
                            data-testid={`inc-${it.id}`}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-muted small">
                          Subtotal:{" "}
                          <strong>
                            {formatPrice((it.price || 0) * (it.qty || 1))}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="card-footer d-flex justify-content-between align-items-center">
            <div className="fw-bold">Total: {formatPrice(total)}</div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setOpen(false)}
              >
                Seguir
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setOpen(false)}
                data-testid="checkout-btn"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CartWidgetBase.propTypes = {
  showZero: PropTypes.bool,
  className: PropTypes.string,
};

export const CartWidget = memo(CartWidgetBase);
export default CartWidget;
