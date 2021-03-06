import ip from 'ip';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.dev.babel';
import dev from './devConfig.json';

new WebpackDevServer(webpack(config), {
	contentBase: config.output.path,
	publicPath: config.output.publicPath,
	hot: true,
	noInfo: true,
}).listen(dev.port, 'localhost', (err, result) => {
	if (err) {
		return console.log(result);
	}

	console.log(`Server started at http://localhost:${dev.port}`);
	console.log(`Tunnel started at http://${ip.address()}:${dev.port}\n`);
	return result;
});
