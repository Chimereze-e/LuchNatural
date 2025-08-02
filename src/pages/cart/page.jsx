
import { Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomNavbar from '../../components/base/Navbar';
import Footer from '../../components/base/Footer';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('storage'));
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <CustomNavbar />
        
        <main className="flex-grow-1 d-flex align-items-center">
          <Container>
            <Row className="justify-content-center text-center">
              <Col md={6}>
                <i className="ri-shopping-cart-line fs-1 text-muted mb-4"></i>
                <h2 className="mb-3">Your Cart is Empty</h2>
                <p className="text-muted mb-4">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Button 
                  as={Link} 
                  to="/products" 
                  variant="dark" 
                  size="lg"
                  className="px-4"
                >
                  Continue Shopping
                </Button>
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
              <h1 className="h2 mb-0">Shopping Cart</h1>
            </Col>
          </Row>
        </Container>
      </section>

      <main className="py-5 flex-grow-1">
        <Container>
          <Row>
            <Col lg={8}>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Cart Items ({cartItems.length})</h5>
                  <Button 
                    variant="link" 
                    className="text-danger p-0"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </Card.Header>
                <Card.Body className="p-0">
                  <Table responsive className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Product</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="me-3 rounded"
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                              />
                              <div>
                                <h6 className="mb-1">{item.name}</h6>
                                <small className="text-muted text-uppercase">
                                  {item.category}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td className="text-center align-middle">
                            <div className="d-flex align-items-center justify-content-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <i className="ri-subtract-line"></i>
                              </Button>
                              <Form.Control
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                                className="mx-2 text-center"
                                style={{ width: '60px' }}
                                min="0"
                              />
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <i className="ri-add-line"></i>
                              </Button>
                            </div>
                          </td>
                          <td className="text-end align-middle">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="text-end align-middle fw-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="align-middle">
                            <Button
                              variant="link"
                              className="text-danger p-0"
                              onClick={() => removeItem(item.id)}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Order Summary</h5>
                </Card.Header>
                <Card.Body>
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
                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Total:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                  
                  <Button
                    variant="dark"
                    size="lg"
                    className="w-100 mb-3"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    as={Link}
                    to="/products"
                    variant="outline-secondary"
                    size="lg"
                    className="w-100"
                  >
                    Continue Shopping
                  </Button>
                </Card.Body>
              </Card>

              {/* Shipping Info */}
              <Card className="mt-4">
                <Card.Body>
                  <h6 className="mb-3">
                    <i className="ri-truck-line me-2"></i>
                    Shipping Information
                  </h6>
                  <ul className="list-unstyled small text-muted mb-0">
                    <li className="mb-1">✓ Free shipping on orders over $50</li>
                    <li className="mb-1">✓ 2-3 business days delivery</li>
                    <li>✓ Secure packaging guaranteed</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
