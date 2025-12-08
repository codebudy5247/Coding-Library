import React from 'react';

export const Text: React.FC<{ content: string; style?: React.CSSProperties }> = ({ content, style }) => {
    return <p style={{ margin: '0.5rem 0', color: '#333', lineHeight: '1.6', ...style }}>{content}</p>;
};
