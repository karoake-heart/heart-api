const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let CssLoader = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',

        }
        ]
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
                NODE_ENV: `'production'`,
                BROWSER: true,
                PORT:  JSON.stringify(process.env.PORT),
                HEART_DATABASE_URL: JSON.stringify(process.env.HEART_DATABASE_URL)
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
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
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
                NODE_ENV: `'production'`,
                BROWSER: true
            },
            'process.env.HEART_DATABASE_URL': JSON.stringify(process.env.HEART_DATABASE_URL),
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
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    }

}

module.exports = [serverConfig, clientConfig];