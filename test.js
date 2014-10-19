var onReady = function() {
	var View = require('threejs-managed-view').View;
	var hitTest = require('./');
	var view = new View({
	})

	//important for test that all world matrices are updated
	// view.camera.updateMatrix();
	view.camera.updateMatrixWorld();

	var handles = [];
	var handleProps = [
		[-2, -1.5, 0, 2],
		[2, -1, 0, .5],
		[-1, 2, 0, .75],
		[3, 2, 0, 1]
	];
	for (var i = 0; i < handleProps.length; i++) {
		var handle = new THREE.Mesh(
			new THREE.SphereGeometry(handleProps[i][3], 32, 16)
		)
		handle.position.x = handleProps[i][0];
		handle.position.y = handleProps[i][1];
		handle.position.z = handleProps[i][2];
		handles.push(handle);
		view.scene.add(handle);
		//important for test that all world matrices are updated
		// handle.updateMatrix();
		handle.updateMatrixWorld();
	};



	var cols = 60;
	var rows = ~~(cols / window.innerWidth * window.innerHeight * .5);
	var range = {
		x: {
			min : -1,
			max : 1
		},
		y: {
			min : -1,
			max : 1
		}
	};
	range.x.size = range.x.max - range.x.min;
	range.y.size = range.y.max - range.y.min;
	var results = [];
	for (var iRow = 0; iRow < rows; iRow++) {
		var ratioY = iRow / rows;
		var resultsLine = "" + iRow;
		while(resultsLine.length < 3) resultsLine += " ";
		for (var iCol = 0; iCol < cols; iCol++) {
			var ratioX = iCol / cols;
			var x = ratioX * range.x.size + range.x.min;
			var y = ratioY * range.y.size + range.y.min;
			resultsLine += hitTest(x, y, view.camera, handles).length > 0 ? 'X' : '_';
		};
		console.log(resultsLine);
		results.push(resultsLine);
	};
	console.log(view.camera.parent === handles[1].parent)

}

var loadAndRunScripts = require('loadandrunscripts');
loadAndRunScripts(
	[
		'bower_components/three.js/three.js',
		'lib/stats.min.js',
		'lib/threex.rendererstats.js',
	],
	onReady
);
