import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from '../../components/base/Navbar';
import Footer from '../../components/base/Footer';
import ProductCard from '../../components/base/ProductCard';
import { products } from '../../mocks/products';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Trigger a storage event to update cart count
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <CustomNavbar />

      {/* Hero Section */}
      <section 
        className="hero-section d-flex align-items-center position-relative"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=natural%20skincare%20spa%20setting%20with%20organic%20green%20ingredients%2C%20botanical%20elements%2C%20soft%20natural%20lighting%2C%20serene%20and%20peaceful%20green%20atmosphere%2C%20minimalist%20clean%20aesthetic%2C%20abundant%20green%20plants%20and%20natural%20textures%2C%20emerald%20and%20forest%20green%20tones&width=1200&height=500&seq=hero2&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
        <Container className="position-relative">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="text-white">
                <h1 className="display-4 fw-bold mb-4">
                  Discover Natural Beauty
                </h1>
                <p className="lead mb-4">
                  Transform your skincare routine with our premium collection of natural, 
                  organic products. Pure ingredients, proven results, beautiful skin.
                </p>
                <div className="d-flex gap-3">
                  <Button 
                    as={Link} 
                    to="/products" 
                    variant="success" 
                    size="lg"
                    className="px-4"
                  >
                    Shop Now
                  </Button>
                  <Button 
                    as={Link} 
                    to="/about" 
                    variant="outline-light" 
                    size="lg"
                    className="px-4"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-natural-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="h1 mb-3">Why Choose LuchNatural?</h2>
              <p className="lead text-muted">
                Experience the difference of truly natural skincare
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="bg-white rounded-circle d-inline-flex align-items-center justify-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="ri-leaf-line fs-1 text-success"></i>
                </div>
                <h4>100% Natural</h4>
                <p className="text-muted">
                  Made with pure, organic ingredients sourced from nature's finest botanicals.
                </p>
              </div>
            </Col>

            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="bg-white rounded-circle d-inline-flex align-items-center justify-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="ri-shield-check-line fs-1 text-primary"></i>
                </div>
                <h4>Dermatologist Tested</h4>
                <p className="text-muted">
                  All products are tested and approved by certified dermatologists for safety.
                </p>
              </div>
            </Col>

            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="bg-white rounded-circle d-inline-flex align-items-center justify-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="ri-heart-line fs-1 text-danger"></i>
                </div>
                <h4>Cruelty Free</h4>
                <p className="text-muted">
                  We never test on animals and are committed to ethical beauty practices.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="h1 mb-3">Featured Products</h2>
              <p className="lead text-muted">
                Discover our most popular natural skincare essentials
              </p>
            </Col>
          </Row>

          <Row>
            {featuredProducts.map(product => (
              <Col key={product.id} lg={3} md={6} className="mb-4">
                <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              </Col>
            ))}
          </Row>

          <Row className="text-center mt-4">
            <Col>
              <Button 
                as={Link} 
                to="/products" 
                variant="success" 
                size="lg"
                className="px-5"
              >
                View All Products
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-primary-green text-white">
        <Container>
          <Row className="text-center">
            <Col lg={6} className="mx-auto">
              <h3 className="mb-3">Stay Updated</h3>
              <p className="mb-4">
                Subscribe to our newsletter for skincare tips, new product launches, and exclusive offers.
              </p>

              <form className="d-flex gap-2 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
                <Button variant="success" type="submit" className="px-4 whitespace-nowrap">
                  Subscribe
                </Button>
              </form>

              <small className="text-muted">
                We respect your privacy. Unsubscribe at any time.
              </small>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
} 