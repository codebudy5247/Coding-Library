import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import VueWrapper from './components/VueWrapper';

// Lazy load micro frontends
const ProductsApp = lazy(() => import('products/ProductsApp'));
const CartApp = lazy(() => import('cart/CartApp'));
const UserProfileApp = lazy(() => import('userProfile/UserProfileApp'));
const NotificationsAppComponent = lazy(() => import('notifications/NotificationsApp'));

const Navigation = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '1rem 2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <h1 style={{ color: 'white', fontSize: '1.5rem' }}>
                    🏢 Micro Frontend Demo
                </h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {[
                        { to: '/', label: '🏠 Home' },
                        { to: '/products', label: '📦 Products' },
                        { to: '/cart', label: '🛒 Cart' },
                        { to: '/profile', label: '👤 Profile' },
                        { to: '/notifications', label: '🔔 Notifications' },
                        { to: '/settings', label: '⚙️ Settings' },
                    ].map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                background: isActive(to) ? 'rgba(255,255,255,0.2)' : 'transparent',
                                transition: 'background 0.2s',
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

const Home = () => (
    <div style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '2rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>Welcome to Micro Frontend Architecture Demo</h2>
        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem' }}>
            This application demonstrates a micro frontend architecture where different parts of the UI
            are developed and deployed independently.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
            {[
                { icon: '📦', title: 'Products', desc: 'Browse product catalog', port: 5001 },
                { icon: '🛒', title: 'Cart', desc: 'Shopping cart management', port: 5002 },
                { icon: '👤', title: 'Profile', desc: 'User profile settings', port: 5003 },
            ].map((mfe) => (
                <div key={mfe.title} style={{
                    padding: '1.5rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    background: '#fafafa',
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{mfe.icon}</div>
                    <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{mfe.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{mfe.desc}</p>
                    <p style={{ color: '#999', fontSize: '0.8rem' }}>Port: {mfe.port}</p>
                </div>
            ))}
        </div>
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#e3f2fd', borderRadius: '4px' }}>
            <h3 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>💡 How it works:</h3>
            <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Each section (Products, Cart, Profile) is a separate application</li>
                <li>They run on different ports and can be deployed independently</li>
                <li>The Host (this app) dynamically loads them using Module Federation</li>
                <li>Shared dependencies (React) are loaded only once</li>
                <li>Teams can work independently on different micro frontends</li>
            </ul>
        </div>
    </div>
);

function App() {
    return (
        <BrowserRouter>
            <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/products"
                        element={
                            <ErrorBoundary name="Products">
                                <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading Products...</div>}>
                                    <ProductsApp />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <ErrorBoundary name="Cart">
                                <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading Cart...</div>}>
                                    <CartApp />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ErrorBoundary name="User Profile">
                                <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading Profile...</div>}>
                                    <UserProfileApp />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/notifications"
                        element={
                            <ErrorBoundary name="Notifications">
                                <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading Notifications...</div>}>
                                    <VueWrapper component={NotificationsAppComponent} />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <div style={{
                                maxWidth: '1200px',
                                margin: '2rem auto',
                                padding: '2rem',
                                background: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                textAlign: 'center'
                            }}>
                                <h2>⚙️ Settings (Angular)</h2>
                                <p style={{ color: '#666', marginTop: '1rem' }}>
                                    This would load the Angular Settings micro frontend.<br />
                                    <strong style={{ color: '#dd0031' }}>Angular integration requires additional setup</strong> with ng serve running.
                                </p>
                                <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '1rem' }}>
                                    The Angular app is fully configured at <code>localhost:5005</code>
                                </p>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
