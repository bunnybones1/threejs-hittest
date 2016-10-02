THREE = require('three');

var onReady = function() {
	var View = require('threejs-managed-view').View;
	var hitTest = require('./');
	var camera;
	var cameraType = 'perspective';
	if(cameraType === 'orthographic') {
		camera = new THREE.OrthographicCamera(-4, 6, -5, 5, -100, 100);
	} else {
		camera = new THREE.PerspectiveCamera();
		camera.position.set(0, 5, 5);
		camera.lookAt(new THREE.Vector3());
	}
	var view = new View({
		camera: camera
	})
	view.scene.add(camera);

	//important for test that all world matrices are updated
	// view.camera.updateMatrix();
	view.camera.updateMatrixWorld();
	// view.camera.updateProjectionMatrix();

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
		handle.updateMatrix();
		handle.updateMatrixWorld();
	};


	var orthoScaleX, orthoScaleY, orthoOffsetX, orthoOffsetY;
	if(view.camera instanceof THREE.OrthographicCamera) {
		var rangeX = view.camera.right - view.camera.left;
		var rangeY = view.camera.bottom - view.camera.top;
		orthoScaleX = rangeX * .1;
		orthoScaleY = rangeY * .1;
		orthoOffsetX = rangeX * .5;
		orthoOffsetY = rangeY * .5;
		handles.forEach(function(handle) {
			handle.position.x *= orthoScaleX;
			handle.position.y *= orthoScaleY;
			handle.position.x += orthoOffsetX;
			handle.position.y += orthoOffsetY;
			handle.scale.x *= orthoScaleX;
			handle.scale.y *= orthoScaleY;
			//important for test that all world matrices are updated
			handle.updateMatrixWorld();
		})
	}

	hitTest.testGrid(window.innerWidth * .5, window.innerHeight * .5, view.camera, handles);

}

var loadAndRunScripts = require('loadandrunscripts');
loadAndRunScripts(
	[
		'lib/stats.min.js',
		'lib/threex.rendererstats.js',
	],
	onReady
);
