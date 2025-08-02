
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../../components/base/Navbar';
import Footer from '../../components/base/Footer';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
    setCartItems(cart);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08;
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Redirect to success page after showing success message
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <CustomNavbar />
        
        <main className="flex-grow-1 d-flex align-items-center">
          <Container>
            <Row className="justify-content-center text-center">
              <Col md={6}>
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                     style={{width: '100px', height: '100px'}}>
                  <i className="ri-check-line fs-1"></i>
                </div>
                <h2 className="mb-3">Order Placed Successfully!</h2>
                <p className="text-muted mb-4">
                  Thank you for your purchase. You'll receive an order confirmation email shortly.
                </p>
                <p className="small text-muted">
                  Redirecting to homepage...
                </p>
              </Col>
            </Row>
          </Container>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <CustomNavbar />
      
      {/* Page Header */}
      <section className="bg-natural-light py-4">
        <Container>
          <Row>
            <Col>
              <h1 className="h2 mb-0">Checkout</h1>
            </Col>
          </Row>
        </Container>
      </section>

      <main className="py-5 flex-grow-1">
        <Container>
          <Form onSubmit={handleSubmit} id="checkout-form">
            <Row>
              <Col lg={8}>
                {/* Contact Information */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">Contact Information</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={12} className="mb-3">
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Shipping Address */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">Shipping Address</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col md={12} className="mb-3">
                        <Form.Label>Address *</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Label>City *</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col md={3} className="mb-3">
                        <Form.Label>State *</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col md={3} className="mb-3">
                        <Form.Label>ZIP Code *</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col md={12} className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Payment Information */}
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Payment Information</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <Form.Label>Payment Method</Form.Label>
                      <div className="d-flex gap-3">
                        <Form.Check
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          label="Credit/Debit Card"
                        />
                        <Form.Check
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleInputChange}
                          label="PayPal"
                        />
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <Row>
                        <Col md={12} className="mb-3">
                          <Form.Label>Card Number *</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Label>Expiry Date *</Form.Label>
                          <Form.Control
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Label>CVV *</Form.Label>
                          <Form.Control
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                          />
                        </Col>
                        <Col md={12} className="mb-3">
                          <Form.Label>Name on Card *</Form.Label>
                          <Form.Control
                            type="text"
                            name="nameOnCard"
                            value={formData.nameOnCard}
                            onChange={handleInputChange}
                            required
                          />
                        </Col>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                {/* Order Summary */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">Order Summary</h5>
                  </Card.Header>
                  <Card.Body>
                    {cartItems.map(item => (
                      <div key={item.id} className="d-flex align-items-center mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="me-3 rounded"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0 small">{item.name}</h6>
                          <small className="text-muted">Qty: {item.quantity}</small>
                        </div>
                        <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    
                    <hr />
                    
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax (8%):</span>
                      <span>${getTax().toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span className="text-success">Free</span>
                    </div>
                    
                    <hr />
                    
                    <div className="d-flex justify-content-between mb-3 fw-bold fs-5">
                      <span>Total:</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                    
                    <Button
                      type="submit"
                      variant="dark"
                      size="lg"
                      className="w-100"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        'Complete Order'
                      )}
                    </Button>
                  </Card.Body>
                </Card>

                {/* Security Notice */}
                <Alert variant="info" className="small">
                  <i className="ri-shield-check-line me-2"></i>
                  Your payment information is secure and encrypted.
                </Alert>
              </Col>
            </Row>
          </Form>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
