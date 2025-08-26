// src/pages/Products.jsx
import { MOCK_PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Products() {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Productos</h1>
      <div className="row g-3">
        {MOCK_PRODUCTS.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
