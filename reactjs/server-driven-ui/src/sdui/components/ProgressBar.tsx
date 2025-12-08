import React from 'react';

interface ProgressBarProps {
    value: number;
    max?: number;
    color?: string;
    label?: string;
    style?: React.CSSProperties;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    max = 100,
    color = '#007bff',
    label,
    style
}) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div style={{ width: '100%', ...style }}>
            {label && <div style={{ marginBottom: '0.5rem', color: '#333', fontSize: '0.875rem' }}>{label}</div>}
            <div
                style={{
                    width: '100%',
                    height: '1.5rem',
                    backgroundColor: '#e9ecef',
                    borderRadius: '4px',
                    overflow: 'hidden'
                }}
            >
                <div
                    style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        transition: 'width 0.3s ease'
                    }}
                >
                    {percentage > 20 && `${Math.round(percentage)}%`}
                </div>
            </div>
        </div>
    );
};
