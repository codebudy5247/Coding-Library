import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    name: string;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    maxWidth: '800px',
                    margin: '2rem auto',
                    padding: '2rem',
                    background: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '8px',
                }}>
                    <h2 style={{ color: '#856404', marginBottom: '1rem' }}>
                        ⚠️ {this.props.name} Micro Frontend Failed to Load
                    </h2>
                    <p style={{ color: '#856404', marginBottom: '1rem' }}>
                        The {this.props.name} micro frontend is currently unavailable.
                        This could be because:
                    </p>
                    <ul style={{ color: '#856404', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                        <li>The micro frontend server is not running</li>
                        <li>There's a network connectivity issue</li>
                        <li>The application encountered an error</li>
                    </ul>
                    <p style={{ color: '#856404', fontSize: '0.9rem' }}>
                        Error: {this.state.error?.message}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            background: '#ffc107',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
