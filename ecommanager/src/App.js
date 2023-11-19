import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage'; // Import your HomePage component
import ProductsPage from './ProductsPage'; // Import your ProductsPage component
import { ProductsContextProvider } from './ProductsContext'; // Import the ProductsContextProvider

const App = () => {
    useEffect(() => {
        // Fetch data when the component mounts
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                // Store the data in LocalStorage
                localStorage.setItem('products', JSON.stringify(data));
            });
    }, []);

    return (
        <ProductsContextProvider>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                        </ul>
                    </nav>

                    {/* Setup routes */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                    </Routes>
                </div>
            </Router>
        </ProductsContextProvider>
    );
};

export default App;

