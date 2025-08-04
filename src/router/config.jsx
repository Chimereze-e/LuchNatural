import NotFound from "../pages/NotFound.jsx";
import Home from "../pages/home/page.jsx";
import Products from "../pages/products/page.jsx";
import Cart from "../pages/cart/page.jsx";
import Checkout from "../pages/checkout/page.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes; 