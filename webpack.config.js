const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    if (env == null) {
        env = {};
    }
    let HEART_DATABASE_URL = JSON.stringify(env.HEART_DATABASE_URL);
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
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: 'css-loader'
                }
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
                    BROWSER: true,
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
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                        }
                        ],

                    })
                }
            ]
        }
    };
    return [serverConfig, clientConfig];
}