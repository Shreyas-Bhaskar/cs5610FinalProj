import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you have styling in App.css

// Debounce function
const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const App = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Function to fetch products
    const fetchProducts = async (search = '') => {
        try {
            const response = await axios.get(`http://localhost:3001/products?search=${search}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Debounced version of fetchProducts
    const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), []);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        debouncedFetchProducts(event.target.value);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="search-input"
                />
            </form>

            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} className="product-image" />
                        <div className="product-info">
                            <h5>{product.title}</h5>
                            <p>${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
