
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-2">
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
            <ul style={{ color: 'white', listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ marginBottom: '8px' }}><Link to="/" style={{ color: 'white' }}>Home</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/products" style={{ color: 'white' }}>Products</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/about" style={{ color: 'white' }}>About</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/contact" style={{ color: 'white' }}>Contact</Link></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="mb-3">Categories</h6>
            <ul style={{ color: 'white', listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ marginBottom: '8px' }}><Link to="/products?category=cleansers" style={{ color: 'white' }}>Cleansers</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/products?category=moisturizers" style={{ color: 'white' }}>Moisturizers</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/products?category=serums" style={{ color: 'white' }}>Serums</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/products?category=treatments" style={{ color: 'white' }}>Treatments</Link></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="mb-3">Connect With Us</h6>
            <div style={{ color: 'white', marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                  <i className="ri-instagram-fill"></i>
                </a>
                <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                  <i className="ri-twitter-fill"></i>
                </a>
                <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                  <i className="ri-youtube-fill"></i>
                </a>
              </div>
              <p style={{ color: 'white', margin: 0 }}>
                <i className="ri-mail-line" style={{ marginRight: '8px' }}></i>
                info@luchnatural.com
              </p>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" style={{ borderColor: '#666' }} />
        
        <Row className="align-items-center">
          <Col md={6}>
            <p style={{ color: '#ccc', margin: 0 }}>
              © 2024 LuchNatural. All rights reserved.
            </p>
          </Col>
          <Col md={6} style={{ textAlign: 'right' }}>
            <Link to="/privacy" style={{ color: '#ccc', textDecoration: 'none', marginRight: '15px' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: '#ccc', textDecoration: 'none' }}>Terms of Service</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
