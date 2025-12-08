import React from 'react';

interface InputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    type?: string;
    style?: React.CSSProperties;
}

export const Input: React.FC<InputProps> = ({ placeholder, value, onChange, type = 'text', style }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                width: '100%',
                boxSizing: 'border-box',
                ...style
            }}
        />
    );
};
