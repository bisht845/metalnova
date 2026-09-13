import { apiRequest } from '../api';

export const getProducts = () => apiRequest('/products');
