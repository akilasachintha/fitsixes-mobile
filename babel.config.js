module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
            [
                'module-resolver',
                {
                    alias: {
                        '@components': './components',
                        '@assets': './assets',
                        '@screens': './screens',
                        '@navigation': './navigation',
                        '@helpers': './helpers',
                        '@features': './features',
                        '@services': './services',
                        '@theme': './theme',
                        '@constants': './constants',
                        '@context': './context',
                        '@config': './config',
                    },
                },
            ],
        ],
    };
};
