import { Product } from '../types/Product';

export interface FilterState {
    sort: 'asc' | 'desc';
    rating: number;
    outofstock: boolean;
    fastDelivery: boolean;
    products: Product[]; 
    total: number; 
}
