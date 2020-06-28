const path = require('path');

module.exports = {
    mode: "development",
    entry: "./frontend/index.js",
    output: {
        path: path.resolve(__dirname, "frontend"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};