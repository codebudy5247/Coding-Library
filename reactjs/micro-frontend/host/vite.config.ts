import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'host',
            remotes: {
                products: 'http://localhost:5001/assets/remoteEntry.js',
                cart: 'http://localhost:5002/assets/remoteEntry.js',
                userProfile: 'http://localhost:5003/assets/remoteEntry.js',
                notifications: 'http://localhost:5004/assets/remoteEntry.js',
                settings: 'http://localhost:5005/remoteEntry.js',
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: '^18.2.0',
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^18.2.0',
                },
            },
        }),
    ],
    build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
    server: {
        port: 5000,
        strictPort: true,
    },
});
