import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        vue(),
        federation({
            name: 'notifications',
            filename: 'remoteEntry.js',
            exposes: {
                './NotificationsApp': './src/NotificationsApp.ce.vue',
            },
            shared: {
                vue: {
                    singleton: true,
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
        port: 5004,
        strictPort: true,
    },
});
