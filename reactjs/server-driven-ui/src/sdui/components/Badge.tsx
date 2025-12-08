import React from 'react';

interface BadgeProps {
    text: string;
    variant?: 'success' | 'warning' | 'error' | 'info';
    style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'info', style }) => {
    const colors = {
        success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
        warning: { bg: '#fff3cd', color: '#856404', border: '#ffeeba' },
        error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
        info: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' }
    };

    const colorScheme = colors[variant];

    return (
        <span
            style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                backgroundColor: colorScheme.bg,
                color: colorScheme.color,
                border: `1px solid ${colorScheme.border}`,
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '500',
                ...style
            }}
        >
            {text}
        </span>
    );
};
