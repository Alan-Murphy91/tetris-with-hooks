const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: './src/index.js',
	devtool: 'inline-source-map',
	output: {
	  path: path.resolve(__dirname, 'dist'),
	  filename: 'bundle.js'
	},
	module: {
	  rules: [
	  {
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader"
	  	}
	  },
	  {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
	  {
		  test: /\.(sa|sc|c)ss$/,
		  use: [
		  'style-loader',
		  'css-loader',
		  'sass-loader'
		  ]
	  }
	  ]
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./public/index.html",
			filename: "./index.html"
		})
	]
};
