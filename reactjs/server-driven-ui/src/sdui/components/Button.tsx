import React from 'react';

export const Button: React.FC<{ label: string; onClick?: () => void; style?: React.CSSProperties }> = ({ label, onClick, style }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                ...style
            }}
        >
            {label}
        </button>
    );
};
