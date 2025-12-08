import React from 'react';

interface DividerProps {
    style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({ style }) => {
    return (
        <hr
            style={{
                border: 'none',
                borderTop: '1px solid #e0e0e0',
                margin: '1rem 0',
                ...style
            }}
        />
    );
};
