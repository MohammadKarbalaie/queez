"use client";

import React from "react";
import { Provider, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { FiltersAside } from "./components/FiltersAside";
import store from "./redux/store";
import ProductList from "./ProductList/ProductList";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { selectCartItemCount } from './redux/CartSlice';

const queryClient = new QueryClient();

function CartLink() {

  const cartItemsCount = useSelector(selectCartItemCount);

  return (
    <Link href="/Card" className="relative text-3xl font-bold">
      <AiOutlineShoppingCart />
      {cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-yellow-600 text-white rounded-full px-2 py-1 text-xs">
          {cartItemsCount}
        </span>
      )}
    </Link>
  );
}

export default function Home() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="flex">
          <CartLink />
          <div className="w-2/12">
            <FiltersAside />
          </div>
          <div className="w-10/12">
            <ProductList />
          </div>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}
