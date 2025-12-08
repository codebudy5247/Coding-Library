import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProfileApp from './UserProfileApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div style={{ padding: '1rem' }}>
            <h1>User Profile Micro Frontend - Standalone Mode</h1>
            <UserProfileApp />
        </div>
    </React.StrictMode>
);
