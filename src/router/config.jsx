import NotFound from "../pages/NotFound.jsx";
import Home from "../pages/home/page.jsx";
import Products from "../pages/products/page.jsx";
import Cart from "../pages/cart/page.jsx";
import Checkout from "../pages/checkout/page.jsx";

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