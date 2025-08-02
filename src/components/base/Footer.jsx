
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="brand-font mb-3">LuchNatural</h5>
            <p className="text-muted">
              Discover the power of nature with our premium collection of natural skincare products. 
              Pure, organic, and effective solutions for healthy, glowing skin.
            </p>
          </Col>
          
          <Col md={2} className="mb-4">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-muted text-decoration-none">Products</Link></li>
              <li><Link to="/about" className="text-muted text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-muted text-decoration-none">Contact</Link></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li><Link to="/products?category=cleansers" className="text-muted text-decoration-none">Cleansers</Link></li>
              <li><Link to="/products?category=moisturizers" className="text-muted text-decoration-none">Moisturizers</Link></li>
              <li><Link to="/products?category=serums" className="text-muted text-decoration-none">Serums</Link></li>
              <li><Link to="/products?category=treatments" className="text-muted text-decoration-none">Treatments</Link></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="mb-3">Connect With Us</h6>
            <div className="d-flex gap-3 mb-3">
              <a href="#" className="text-muted fs-4">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="text-muted fs-4">
                <i className="ri-instagram-fill"></i>
              </a>
              <a href="#" className="text-muted fs-4">
                <i className="ri-twitter-fill"></i>
              </a>
              <a href="#" className="text-muted fs-4">
                <i className="ri-youtube-fill"></i>
              </a>
            </div>
            <p className="text-muted mb-0">
              <i className="ri-mail-line me-2"></i>
              info@luchnatural.com
            </p>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted mb-0">
              © 2024 LuchNatural. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <Link to="/privacy" className="text-muted text-decoration-none me-3">Privacy Policy</Link>
            <Link to="/terms" className="text-muted text-decoration-none">Terms of Service</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
