import { useNavigate } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import routes from './config.jsx';

let navigateResolver;

export const navigatePromise = new Promise((resolve) => {
  navigateResolver = resolve;
})


export function AppRoutes() {
  const element = useRoutes(routes);
  const navigate = useNavigate();
  window.REACT_APP_NAVIGATE = navigate;
  navigateResolver(navigate);
  return element
} 