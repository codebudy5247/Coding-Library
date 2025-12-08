import React from 'react';

interface ListProps {
    items?: string[];
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const List: React.FC<ListProps> = ({ items, children, style }) => {
    return (
        <ul
            style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                ...style
            }}
        >
            {items ? items.map((item, idx) => (
                <li
                    key={idx}
                    style={{
                        padding: '0.75rem',
                        borderBottom: '1px solid #eee',
                        color: '#333'
                    }}
                >
                    {item}
                </li>
            )) : children}
        </ul>
    );
};
