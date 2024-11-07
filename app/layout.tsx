// app/layout.tsx  
"use client";  

import RootLayout from "./RootLayout";  
import { Provider } from "react-redux";  
import { QueryClient, QueryClientProvider } from "react-query";  
import store from './redux/store'; // آدرس صحیح فایل store  

const queryClient = new QueryClient();  

export default function Layout({  
  children,  
}: Readonly<{  
  children: React.ReactNode;  
}>) {  
  return (  
    <Provider store={store}>  
      <QueryClientProvider client={queryClient}>  
        <RootLayout>{children}</RootLayout>  
      </QueryClientProvider>  
    </Provider>  
  );  
}