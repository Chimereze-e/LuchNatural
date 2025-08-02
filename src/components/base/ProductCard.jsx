
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart, showAddToCart = true }) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Card className="product-card h-100">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name}
          style={{ height: '250px', objectFit: 'cover' }}
        />
        {product.isNew && (
          <Badge 
            bg="success" 
            className="position-absolute top-0 start-0 m-2"
          >
            New
          </Badge>
        )}
        {product.discount && (
          <Badge 
            bg="danger" 
            className="position-absolute top-0 end-0 m-2"
          >
            -{product.discount}%
          </Badge>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <small className="text-muted text-uppercase">{product.category}</small>
        </div>
        
        <Card.Title className="h6 mb-2">
          <Link 
            to={`/product/${product.id}`} 
            className="text-decoration-none text-dark"
          >
            {product.name}
          </Link>
        </Card.Title>
        
        <Card.Text className="text-muted small mb-3 flex-grow-1">
          {product.description.substring(0, 100)}...
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through me-2">
                ${product.originalPrice}
              </span>
            )}
            <span className="fw-bold fs-5 text-primary-green">
              ${product.price}
            </span>
          </div>
          
          {showAddToCart && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={handleAddToCart}
              className="px-3"
            >
              <i className="ri-shopping-cart-line me-1"></i>
              Add to Cart
            </Button>
          )}
        </div>
        
        <div className="mt-2 d-flex align-items-center">
          <div className="text-warning me-2">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'}`}
              ></i>
            ))}
          </div>
          <small className="text-muted">({product.reviews} reviews)</small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
