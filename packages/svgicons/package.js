Package.describe({
	summary: "Animated SVG Icons with Snap.svg"
});

Package.on_use(function (api) {
	api.use('jquery', 'client');

	var path = Npm.require('path');
	api.add_files(path.join('js', 'modernizr.custom.js'), 'client');
	api.add_files(path.join('js', 'snap.svg-min.js'), 'client');
	api.add_files(path.join('js', 'svgicons.js'), 'client');
});