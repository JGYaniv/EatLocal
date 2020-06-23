const path = require('path');

module.exports = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, ""),
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