
var cameraVector = new THREE.Vector3(),
	rayCaster = new THREE.Raycaster();

function hitTest(x, y, camera, objects, recursive) {
	cameraVector.set( x, -y, 0.5 );
	rayCaster.setFromCamera(cameraVector, camera);
	return rayCaster.intersectObjects( objects, recursive );
}

hitTest.testGrid = function(x, y, camera, objects, cols, rows) {
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
	var targetRow = ~~(rows * .5) + ~~(rows * .5 * (y / window.innerHeight * range.y.size + range.y.min));
	var targetCol = ~~(cols * .5) + ~~(cols * .5 * (x / window.innerWidth * range.x.size + range.x.min));
	var results = [];
	for (var iRow = 0; iRow < rows; iRow++) {
		var ratioY = iRow / rows;
		var resultsLine = "" + iRow;
		while(resultsLine.length < 3) resultsLine += " ";
		for (var iCol = 0; iCol < cols; iCol++) {
			var ratioX = iCol / cols;
			var x = ratioX * range.x.size + range.x.min;
			var y = ratioY * range.y.size + range.y.min;
			var hit = hitTest(x, y, camera, objects).length > 0;
			if(iCol == targetCol && iRow == targetRow) {
				resultsLine += hit ? '●' : '◌';
			} else {
				resultsLine += hit ? '▓' : '░';
			}
		};
		console.log(resultsLine);
		results.push(resultsLine);
	};
}

module.exports = hitTest;