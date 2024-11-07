"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import Link from 'next/link';
import { removeFromCart } from '../redux/CartSlice';
import { AiFillCheckSquare } from 'react-icons/ai';
import Image from 'next/image';

interface CartItem {
  id: number; 
  title: string;
  price: number;
  images: string;
}

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className='float-start border px-20 py-10'>
      <h2 className='text-2xl font-semibold bg-sky-400 px-4 text-white py-2 rounded-xl'>Your Cart</h2>
      {cartItems.map((item: CartItem) => (
        <div key={item.id} className='flex gap-2 border-b-2 border-black px-10 py-4'>
          <div className='flex flex-col mr-4'>
            <Image src={item.images} alt={item.title} width={150} height={150} className='mx-auto w-20 rounded-full border' />
          </div>
          <div className='flex flex-col gap-1 items-start justify-center'>
            <h3 className='font-semibold text-lg'>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <button className='bg-red-500 text-white px-4 py-1 rounded-lg' onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </div>
        </div>
      ))}
      {cartItems.length > 0 && (
        <Link href="/checkout">
          <button className="mt-4 w-32 bg-blue-500 text-white p-2 rounded">
            <p className='flex items-center gap-2'>Checkout <AiFillCheckSquare /></p>
          </button>
        </Link>
      )}
    </div>
  );
};

export default CartPage;
