import React from 'react';

export const Image: React.FC<{ src: string; alt: string; style?: React.CSSProperties }> = ({ src, alt, style }) => {
    return <img src={src} alt={alt} style={{ maxWidth: '100%', borderRadius: '4px', ...style }} />;
};
