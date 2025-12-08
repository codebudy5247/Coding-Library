import React from 'react';

export const Container: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            ...style
        }}>
            {children}
        </div>
    );
};
