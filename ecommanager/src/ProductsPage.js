// ProductsPage.js
import React from 'react';
import { useProducts } from './ProductsContext';

const ProductsPage = () => {
    const products = useProducts();

    return (
        <div>
            <h1>Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>
                                <img src={product.image} alt={product.title} style={{ width: '50px' }} />
                            </td>
                            <td>{product.rating.rate} ({product.rating.count} reviews)</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsPage;
