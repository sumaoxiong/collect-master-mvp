function ProductCard({ product, getCategoryIcon }) {
  return (
    <>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="ig-card h-100">
          <div className="ig-card-media">
            <img src={product.imageUrl} alt={product.title} />

            <div className="brand-badge">
              {getCategoryIcon(product.category) ? (
                <img
                  src={getCategoryIcon(product.category)}
                  alt={product.category}
                  className="brand-icon"
                />
              ) : (
                <span>{product.category}</span>
              )}
            </div>
          </div>

          <div className="p-2 p-md-3 p-lg-4">
            <div className="d-flex flex-wrap gap-2 mb-2 mb-lg-3">
              {Array.isArray(product.imagesUrl) &&
                product.imagesUrl.map((tag, index) => (
                  <span key={index} className="card-tag">
                    {tag}
                  </span>
                ))}
            </div>

            <h5 className="fw-bold mb-2 card-title-custom">{product.title}</h5>

            <p className="card-description mb-2 mb-lg-3">
              {product.description}
            </p>

            <div className="text-end">
              <a
                href={product.content}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-link card-link-btn"
              >
                查看原始內容
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
