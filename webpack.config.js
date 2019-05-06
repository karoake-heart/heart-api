const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    let PORT = env.PORT || 3000;
    let NODE_ENV = env.NODE_ENV || 'production';
    let HEART_DATABASE_URL = JSON.stringify(env.HEART_DATABASE_URL);

    let CssLoader = {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
            }
            ],

        })
    };
    let serverConfig = {
        entry: {
            bundle: path.resolve(__dirname, 'server.js')
        },
        output: {
            path: path.resolve(__dirname),
            filename: '[name].js',
            publicPath: '/'
        },
        target: 'node',
        externals: nodeExternals(),
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: NODE_ENV,
                    BROWSER: true,
                    PORT: PORT,
                    HEART_DATABASE_URL: HEART_DATABASE_URL
                },
                __DEV__: false
            }),
            new ExtractTextPlugin({
                filename: 'styles.css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: ["@babel/preset-react", "@babel/preset-env"]
                        }
                    },
                    exclude: '/node_modules/'
                },
                CssLoader
            ]
        }
    };

    let clientConfig = {
        entry: {
            client: path.resolve(__dirname, 'visualizer', 'client', 'index.js')
        },
        output: {
            path: path.resolve(__dirname, 'visualizer'),
            filename: '[name].js',
            publicPath: '/'
        },
        target: 'web',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: NODE_ENV,
                    BROWSER: true,
                    PORT: PORT,
                    HEART_DATABASE_URL: HEART_DATABASE_URL
                },
                __DEV__: false
            }),
            new ExtractTextPlugin({
                filename: 'styles.css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, 'visualizer', 'client'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: ["@babel/preset-react", "@babel/preset-env"]
                        }
                    },
                    exclude: '/node_modules/'
                },
                CssLoader
            ]
        }
    };
    return [serverConfig, clientConfig];
}