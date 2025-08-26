// src/components/ProductCard.jsx
import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/cart";

function formatPrice(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function ProductCardBase({ product, className = "" }) {
  const { items, add, remove } = useCart();
  const { id, title, price, image, stock } = product;

  const qty = useMemo(
    () => items.find((i) => i.id === id)?.qty || 0,
    [items, id]
  );

  const addOne = () => add(product, 1);
  const subOne = () => remove(id, 1);

  return (
    <div
      className={`card h-100 product-card ${className}`}
      data-testid={`product-card-${id}`}
    >
      {image && <img src={image} className="card-img-top" alt={title} />}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{title}</h5>
        <div className="text-muted mb-2">Stock: {stock}</div>
        <div className="fw-bold mb-3">{formatPrice(price)}</div>

        {qty === 0 ? (
          <button
            className="btn btn-primary mt-auto"
            onClick={addOne}
            aria-label={`Agregar ${title} al carrito`}
            data-testid={`add-btn-${id}`}
          >
            Agregar al carrito
          </button>
        ) : (
          <div
            className="mt-auto d-flex align-items-center gap-2"
            data-testid={`qty-controls-${id}`}
          >
            <button
              className="btn btn-outline-secondary"
              onClick={subOne}
              aria-label={`Quitar uno de ${title}`}
              data-testid={`dec-btn-${id}`}
            >
              −
            </button>
            <span className="fw-bold" data-testid={`qty-${id}`}>
              {qty}
            </span>
            <button
              className="btn btn-outline-secondary"
              onClick={addOne}
              aria-label={`Agregar uno de ${title}`}
              data-testid={`inc-btn-${id}`}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

ProductCardBase.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    stock: PropTypes.number,
  }).isRequired,
  className: PropTypes.string,
};

export const ProductCard = memo(ProductCardBase);
export default ProductCard;
