import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { fetchProducts } from '../api/servies/products.service';
import { RootState } from './store';

interface FilterState {
    sort: 'asc' | 'desc';
    rating: number;
    outofstock: boolean;
    fastDelivery: boolean;
    products: Product[];
    total: number;
    loading: boolean; 
    error: string | null; 
}

const initialState: FilterState = {
    sort: 'asc',
    rating: 0,
    outofstock: false,
    fastDelivery: false,
    products: [],
    total: 0,
    loading: false, 
    error: null, 
};

export const fetchProductsAsync = createAsyncThunk<
    { products: Product[]; total: number },
    { limit: number; skip: number }
>(
    'filters/fetchProducts',
    async ({ limit, skip }) => {
        const response = await fetchProducts(limit, skip);
        return response;
    }
);

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSort(state, action: PayloadAction<'asc' | 'desc'>) {
            state.sort = action.payload;
        },
        setRating(state, action: PayloadAction<number>) {
            state.rating = action.payload;
        },
        setOutOfStock(state, action: PayloadAction<boolean>) {
            state.outofstock = action.payload;
        },
        setFastDelivery(state, action: PayloadAction<boolean>) {
            state.fastDelivery = action.payload;
        },
        clearFilters(state) {
            state.sort = 'asc';
            state.rating = 0;
            state.outofstock = false;
            state.fastDelivery = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});


export const selectSortedFilteredProducts = (state: RootState) => {
    const { products, sort, rating, outofstock, fastDelivery } = state.filters;
    return products
        .filter((product: Product) => product.rating >= rating)
        .filter((product: Product) => (fastDelivery ? product.availabilityStatus === 'Fast' : true))
        .filter((product: Product) => (outofstock ? product.availabilityStatus === 'outofstock' : product.availabilityStatus !== 'outofstock'))
        .sort((a: Product, b: Product) => (sort === 'asc' ? a.price - b.price : b.price - a.price));
};

export const { setSort, setRating, setOutOfStock, setFastDelivery, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
