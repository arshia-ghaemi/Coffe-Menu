function Product({ products }) {
  return products.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));
}

function ProductItem({ product }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className="product-cart">
      <img
        className="product-cart__img"
        src={`${baseUrl}${product.pic}`}
        alt={product.name}
      />
      <span className="product-cart__name">{product.name}</span>
      <span className="product-cart__price">{product.price}</span>
    </div>
  );
}

export default Product;
