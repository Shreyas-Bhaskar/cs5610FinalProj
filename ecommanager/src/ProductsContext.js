// ProductsContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductsContext = createContext([]);

export const useProducts = () => useContext(ProductsContext);

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch data when the context provider mounts
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            fetch('https://fakestoreapi.com/products')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('products', JSON.stringify(data));
                    setProducts(data);
                });
        }
    }, []);

    return (
        <ProductsContext.Provider value={products}>
            {children}
        </ProductsContext.Provider>
    );
};
