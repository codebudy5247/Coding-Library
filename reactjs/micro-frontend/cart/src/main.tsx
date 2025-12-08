import React from 'react';
import ReactDOM from 'react-dom/client';
import CartApp from './CartApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div style={{ padding: '1rem' }}>
            <h1>Cart Micro Frontend - Standalone Mode</h1>
            <CartApp />
        </div>
    </React.StrictMode>
);
