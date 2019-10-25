var scene = new THREE.Scene();
THREE.ImageUtils.crossOrigin = "";
THREE.ImageUtils.crossOrigin = "anonymous";
var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 150;
// var activeMarker = null;
var renderer = new THREE.WebGLRenderer();
var pixelDensity = 2;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(pixelDensity);
document.querySelector("#hero").appendChild(renderer.domElement);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(200, 400, 1000);
scene.add(spotLight);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 1000, 300);
scene.add(spotLight);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-300, -200, -300);
scene.add(spotLight);


function addCubes() {
  var xDistance = 100;
  var zDistance = 100;
  var geometry = new THREE.CylinderBufferGeometry( 5, 5, 50, 32 );
  var material = new THREE.MeshLambertMaterial({ color: 0xf5f5f5 });
  
  //initial offset so does not start in middle.
  var xOffset = -1000;
  var zOffset = -1000;
  

  for(var i = 0; i < 21; i++){
      for(var j = 0; j < 21; j++){
          var mesh  = new THREE.Mesh(geometry, material);
          mesh.position.x = (xDistance * i) + xOffset;
          mesh.position.z = (zDistance * j) + zOffset;
          scene.add(mesh);
      }
  };
}

addCubes();

var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.minPolarAngle = controls.maxPolarAngle = Math.PI/2; //
controls.addEventListener("change", onCameraUpdate);
window.addEventListener("resize", onWindowResize, false);
controls.autoRotate = true;

let animate = function() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

/* markers */
// let markers=[]; // all markers
// let markerData = [
//   {
//     position : [-0.89568, 0.10144, 0.1],
//     headline : 'Tailpiece',
//     description : 'Rickenbacker Chrome'
//   }
//   ,
// 	{
// 		position: [0.36156000000000005,0.014730000000000002,0.1],
// 		headline: 'Number of Frets',
// 		description: '24 '
// 	}
// ,
// 	{
// 		position: [0.73006,0.12312000000000001,0.1],
// 		headline: 'Machine Heads',
// 		description: 'Schaller Deluxe'
// 	},
// 	{
// 		position: [-0.44047000000000003,0.036410000000000005,0.1],
// 		headline: 'Type of Pickups',
// 		description: 'Single Coil'
// 	},
// 	{
// 		position: [0,0.05809,0.1],
// 		headline: 'Fret Marker Style',
// 		description: 'Triangle'
// 	},
// 	{
// 		position: [0.2315,0.014730000000000002,-0.1],
// 		headline: 'Neck Wood',
// 		description: 'Maple'
// 	},
// 	{
// 		position: [-0.65724,-0.07197,0.1],
// 		headline: 'Bridge',
// 		description: 'RIC'
// 	},
// 	{
// 		position: [-0.39712000000000003,0.18815,0.1],
// 		headline: 'Body Wood',
// 		description: 'Maple'
// 	}
// ];

// Object.keys(markerData).forEach(function(key){
//   marker = markerData[key];

//   var markerContainer = new THREE.Object3D();

//   var geometry = new THREE.TorusGeometry(0.06, 0.01, 2, 100);
//   var material = new THREE.MeshBasicMaterial({color:0xeeeeee});
//   var torus = new THREE.Mesh(geometry, material);
//   markerContainer.add(torus);

//   var geometry = new THREE.CircleGeometry(0.05, 32);
//   var material = new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.5});
//   var circle = new THREE.Mesh(geometry, material);
//   circle.userData.markerName = key;
//   markerContainer.add(circle);

//   markerContainer.position.set(marker.position[0], marker.position[1], marker.position[2]);
//   markers.push(markerContainer);
//   scene.add(markerContainer);

// });

/* end of markers */
function onCameraUpdate() {
  let cameraAngle = controls.getAzimuthalAngle();
  // markers.forEach(function(marker){
  //   marker.rotation.set(0, cameraAngle, 0);
  // });
  // if(activeMarker){
  //   positionMarker();
  // }
}

/* Helper */
// function addHelper(){
//   var geometry = new THREE.SphereGeometry(0.05, 32, 32);
//   var material  = new THREE.MeshBasicMaterial({color:0xFF0000});
// markerHelper = new THREE.Mesh(geometry, material);
// scene.add(markerHelper);
// markerHelper.position.set(0, 0, 0.08);

// var gui = new dat.GUI();
// gui.add(markerHelper.position, 'x', -1, 1).step(0.00001);
// gui.add(markerHelper.position, 'y', -1, 1).step(0.00001);
// gui.add(markerHelper.position, 'z', -1, 1).step(0.00001);

//   var options = {
//     copyPosition : function(){
//       var string = ',\n';
//       string = string+'\t{\n';
//       string = string+'\t\tposition: ['+markerHelper.position.x+','+markerHelper.position.y+','+markerHelper.position.z+'],\n';
//       string = string+'\t\theadline: \'\',\n';
//       string = string+'\t\tdescription: \'\'\n';
//       string = string+'\t}\n';

//       navigator.clipboard.writeText(string).then(function() {
//         alert('Position copied to clipboad');
//       }, function(err) {
//         alert('Could not copy position: ', err);
//       });
//     }
//   };
//   gui.add(options, 'copyPosition');
// }

// addHelper();

/* end of helper */
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("mousemove", onMouseMove, false);

var canvas = document.getElementsByTagName("canvas");
canvas = canvas[0];
canvas.addEventListener("click", onCanvasClick);

var tooltipContainer = document.getElementById("tooltip");

function onCanvasClick() {
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(scene.children, true);

  // var marker = null;
  // var markerName = null;
  // if(intersects.length){
  //   if(intersects[0].object.userData.markerName){
  //     marker = intersects[0].object;
  //     markerName = marker.userData.markerName;
  //     tooltipContainer.innerHTML = "<p><strong>"+markerData[markerName].headline+"</strong><br />"+markerData[markerName].description+'</p>';

  //     // console.log(markerData[markerName]);
  //   }
  // }

  // if(markerName){
  //   activeMarker = marker;
  //   tooltipContainer.classList.add('is-visible');
  //   positionMarker();
  // }else{
  //   activeMarker = null;
  //   tooltipContainer.classList.remove('is-visible');
  // }
}

// function positionMarker(){
//   let position = toScreenPosition(activeMarker, camera);

//   if(position.x < 0){
//     tooltipContainer.style.left = 0;
//   }else if(position.x + tooltipContainer.offsetWidth < window.innerWidth){
//     tooltipContainer.style.left = (position.x)+'px';
//   }else{
//     tooltipContainer.style.left = (window.innerWidth - tooltipContainer.offsetWidth)+'px';
//   }
//   tooltipContainer.style.top = (position.y)+'px';
//   // console.log(position);
// }

function toScreenPosition(obj, camera) {
  var vector = new THREE.Vector3();
  var widthHalf = 0.5 * renderer.context.canvas.width;
  var heightHalf = 0.5 * renderer.context.canvas.height;

  obj.updateMatrixWorld();
  vector.setFromMatrixPosition(obj.matrixWorld);
  vector.project(camera);

  vector.x = (vector.x * widthHalf + widthHalf) / pixelDensity;
  vector.y = (-(vector.y * heightHalf) + heightHalf) / pixelDensity;
  return vector;
}

function onWindowResize(event) {
  // if(activeMarker){
  //   positionMarker();
  // }

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  aspectRatio = screenWidth / screenHeight;
  renderer.setSize(screenWidth, screenHeight);
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
}

animate();
