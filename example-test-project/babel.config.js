module.exports = {
	targets: 'node 18.12',
	presets: [
		'@babel/preset-env',
		'@babel/preset-typescript',
		[
			'babel-preset-solid-panorama',
			{
				moduleName: 'solid-panorama-runtime',
				generate: 'universal'
			}
		]
	],
	plugins: ['@babel/plugin-transform-typescript']
};