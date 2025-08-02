
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CustomNavbar from '../../components/base/Navbar';
import Footer from '../../components/base/Footer';
import ProductCard from '../../components/base/ProductCard';
import { products, categories } from '../../mocks/products';

function Products() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, searchTerm]);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <CustomNavbar />
      
      {/* Page Header */}
      <section className="bg-natural-light py-5">
        <Container>
          <Row>
            <Col>
              <h1 className="display-5 fw-bold mb-3">Our Products</h1>
              <p className="lead text-muted">
                Explore our complete range of natural skincare products designed to nourish and protect your skin.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <main className="py-5 flex-grow-1">
        <Container>
          <Row>
            {/* Filters Sidebar */}
            <Col lg={3} className="mb-4">
              <Card className="mb-4">
                <Card.Body>
                  <h5 className="mb-3">Search</h5>
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <h5 className="mb-3">Categories</h5>
                  <div className="d-flex flex-column gap-2">
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? 'success' : 'outline-success'}
                        size="sm"
                        className="d-flex justify-content-between align-items-center text-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span>{category.name}</span>
                        <Badge bg="success">{category.count}</Badge>
                      </Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <h5 className="mb-3">Sort By</h5>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </Form.Select>
                </Card.Body>
              </Card>
            </Col>

            {/* Products Grid */}
            <Col lg={9}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="text-muted mb-0">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <i className="ri-search-line fs-1 text-muted mb-3"></i>
                  <h4>No products found</h4>
                  <p className="text-muted">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <Row>
                  {filteredProducts.map(product => (
                    <Col key={product.id} lg={4} md={6} className="mb-4">
                      <ProductCard 
                        product={product} 
                        onAddToCart={handleAddToCart}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default Products;
