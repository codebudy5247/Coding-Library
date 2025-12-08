import React from 'react';

export const Card: React.FC<{ title?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ title, children, style }) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            ...style
        }}>
            {title && <h3 style={{ marginTop: 0, color: '#2d3748' }}>{title}</h3>}
            {children}
        </div>
    );
};
