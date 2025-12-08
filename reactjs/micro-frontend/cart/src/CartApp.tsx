import { useState, useEffect } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const CartApp = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Listen for add to cart events from Products micro frontend
        const handleAddToCart = (event: any) => {
            const product = event.detail;
            setCartItems((prevItems) => {
                const existing = prevItems.find((item) => item.id === product.id);
                if (existing) {
                    return prevItems.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...prevItems, { ...product, quantity: 1 }];
            });
        };

        window.addEventListener('addToCart', handleAddToCart);
        return () => window.removeEventListener('addToCart', handleAddToCart);
    }, []);

    const removeItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '2rem auto',
            padding: '2rem',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>🛒 Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    background: '#f9f9f9',
                    borderRadius: '8px',
                    color: '#999',
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                    <p>Your cart is empty</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        Go to Products and click "Add to Cart" to see items here!
                    </p>
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: '1.5rem' }}>
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    gap: '1rem',
                                }}
                            >
                                <div style={{ fontSize: '2.5rem' }}>{item.image}</div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>
                                        {item.name}
                                    </h3>
                                    <p style={{ margin: '0.25rem 0', color: '#999', fontSize: '0.9rem' }}>
                                        ${item.price.toFixed(2)} each
                                    </p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}>
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            border: '1px solid #ddd',
                                            background: 'white',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        -
                                    </button>
                                    <span style={{
                                        minWidth: '40px',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            border: '1px solid #ddd',
                                            background: 'white',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    color: '#667eea',
                                    minWidth: '80px',
                                    textAlign: 'right',
                                }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        borderTop: '2px solid #e0e0e0',
                        paddingTop: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <div>
                            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in cart
                            </p>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>
                                Total: <span style={{ color: '#667eea' }}>${total.toFixed(2)}</span>
                            </h3>
                        </div>
                        <button
                            onClick={() => alert(`Checkout: $${total.toFixed(2)}`)}
                            style={{
                                padding: '1rem 2rem',
                                background: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartApp;
