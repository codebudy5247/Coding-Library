import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

const products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, description: 'Premium noise-canceling headphones', image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 249.99, description: 'Fitness tracking smartwatch', image: '⌚' },
    { id: 3, name: 'Laptop Stand', price: 49.99, description: 'Ergonomic aluminum stand', image: '💻' },
    { id: 4, name: 'Mechanical Keyboard', price: 129.99, description: 'RGB backlit gaming keyboard', image: '⌨️' },
    { id: 5, name: 'Wireless Mouse', price: 59.99, description: 'Precision wireless mouse', image: '🖱️' },
    { id: 6, name: 'USB-C Hub', price: 79.99, description: '7-in-1 connectivity hub', image: '🔌' },
];

const ProductsApp = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToCart = (product: Product) => {
        // Dispatch custom event for inter-app communication
        window.dispatchEvent(
            new CustomEvent('addToCart', { detail: product })
        );
        console.log('Added to cart:', product.name);
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '2rem auto',
            padding: '2rem',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>📦 Products Catalog</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                Browse our selection of tech products. Click "Add to Cart" to see inter-app communication!
            </p>

            {/* Search */}
            <input
                type="text"
                placeholder="🔍 Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    marginBottom: '1.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                }}
            />

            {/* Products Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
            }}>
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s, boxShadow 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
                            {product.image}
                        </div>
                        <h3 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                            {product.name}
                        </h3>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                            {product.description}
                        </p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#667eea' }}>
                                ${product.price}
                            </span>
                            <button
                                onClick={() => handleAddToCart(product)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: '#667eea',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#764ba2'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#667eea'}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                    No products found matching "{searchTerm}"
                </div>
            )}
        </div>
    );
};

export default ProductsApp;
