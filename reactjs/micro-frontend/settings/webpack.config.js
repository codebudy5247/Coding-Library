const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    output: {
        uniqueName: "settings",
        publicPath: "auto"
    },
    optimization: {
        runtimeChunk: false
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "settings",
            filename: "remoteEntry.js",
            exposes: {
                './SettingsModule': './src/app/settings/settings.module.ts',
            },
            shared: {
                "@angular/core": { singleton: true, strictVersion: true },
                "@angular/common": { singleton: true, strictVersion: true },
                "@angular/platform-browser": { singleton: true, strictVersion: true },
            }
        })
    ],
};
