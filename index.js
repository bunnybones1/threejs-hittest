
var worldCameraPosition = new THREE.Vector3(),
	offset = new THREE.Vector3(),
	cameraVector = new THREE.Vector3(),
	projector = new THREE.Projector();

function updateCameraVector(camera, x, y) {
	//flip y, just cuz
	cameraVector.set( x, -y, 0.5 );
	projector.unprojectVector( cameraVector, camera );
	worldCameraPosition.copy(camera.position);
	camera.parent.localToWorld(worldCameraPosition);
	cameraVector.sub( worldCameraPosition ).normalize();
};

function updateCameraVectorOrtho(camera, x, y) {
	//flip y, just cuz
	cameraVector.set( x, -y, 0.5 );
	projector.unprojectVector( cameraVector, camera );
	worldCameraPosition.copy(camera.position);
	camera.parent.localToWorld(worldCameraPosition);
	cameraVector.sub( worldCameraPosition ).normalize();
};

function hitTest(x, y, camera, objects) {
	if(camera instanceof THREE.PerspectiveCamera) {
		updateCameraVector(camera, x, y);
		var raycaster = new THREE.Raycaster( worldCameraPosition, cameraVector );
		return raycaster.intersectObjects( objects );
	} else {
		cameraVector.set( x, -y, 0.5 );
		var ray = projector.pickingRay( cameraVector, camera );
		return ray.intersectObjects( objects );
	}
}
hitTest.testGrid = function(camera, objects, cols, rows) {
	cols = cols || 60;
	rows = rows || ~~(cols / window.innerWidth * window.innerHeight * .5);
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
			resultsLine += hitTest(x, y, camera, objects).length > 0 ? 'X' : '_';
		};
		console.log(resultsLine);
		results.push(resultsLine);
	};
}

module.exports = hitTest;