
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

function hitTest(x, y, camera, objects) {
	if(camera instanceof THREE.PerspectiveCamera) {
		updateCameraVector(camera, x, y);
		var raycaster = new THREE.Raycaster( worldCameraPosition, cameraVector );
		return raycaster.intersectObjects( objects );
	} else {
		throw new Error('unsupported camera type', typeof camera);
	}
}

module.exports = hitTest;