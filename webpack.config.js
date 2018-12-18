const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackPreBuildPlugin = require("pre-build-webpack");
const quickname = require("dhtmlweb-quickname");
const glob = require("glob");
const fs = require("fs");

module.exports = {
    devServer: {
        watchOptions: {
            ignored: ["**/pkg.js"]
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /dhtmlweb\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new WebpackPreBuildPlugin(function(stats) {
            const paths = [];
            glob.sync("./src/**/*.js").forEach(path => {
                let name = path.split("/");
                name = name[name.length - 1].split(".")[0];
                if (name !== "index") {
                    paths.push(path);
                }
            });
            fs.writeFile("./pkg.js", quickname(paths, "./src/"), function(err, data){
                if (err) console.log(err);
                console.log("Successfully Written to File.");
            });
        })
    ]
};