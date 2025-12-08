import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductsApp from './ProductsApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div style={{ padding: '1rem' }}>
            <h1>Products Micro Frontend - Standalone Mode</h1>
            <ProductsApp />
        </div>
    </React.StrictMode>
);
