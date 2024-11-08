  
"use client";  

import React from "react";  
import { useSelector } from "react-redux";  
import { FiltersAside } from "./components/FiltersAside";  
import ProductList from "./ProductList/ProductList";  
import { AiOutlineShoppingCart } from "react-icons/ai";  
import Link from "next/link";  
import { selectCartItemCount } from './redux/CartSlice';  

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
    <div className="flex flex-col">  
     <div className="flex items-end  justify-end py-6 text-white bg-sky-600">
        <p className="px-4"><CartLink /> </p>
     </div> 
     <div className="flex mt-10">
     <div className="w-2/12 ">  
        <FiltersAside />  
      </div>  
      <div className="w-10/12 ml-14">  
        <ProductList />  
      </div> 
      </div> 
    </div>  
  );  
}