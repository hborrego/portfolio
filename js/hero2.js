// import * as THREE from "./three.module.js";
// import Stats from "./jsm/libs/stats.module.js";

var container;
var camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2(),
  INTERSECTED;
var radius = 100,
  theta = 0;

init();
animate();
function init() {
  container = document.querySelector("#hero");

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,1,
    10000
  );
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  var light = new THREE.DirectionalLight(0xffffff, 1);

  light.position.set(1, -1, -1).normalize();
  scene.add(light);
  var light2 = new THREE.DirectionalLight(0xffffff, 2);

  light.position.set(0, 0, 120).normalize();
  scene.add(light);

  var geometry = new THREE.DodecahedronBufferGeometry(20, 0);
  var material = new THREE.MeshLambertMaterial({ color: 0xffffff });

  for (var i = 0; i < 20; i++) {
    var object = new THREE.Mesh(geometry, material);
    var scaleNum = Math.random() + 0.5;
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    object.scale.x = scaleNum;
    object.scale.y = scaleNum;
    object.scale.z = scaleNum;
    scene.add(object);
  }

  raycaster = new THREE.Raycaster();
  renderer = new THREE.WebGLRenderer( {antialias:true} );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  // document.addEventListener("mousemove", onDocumentMouseMove, false);
  //
  window.addEventListener("resize", onWindowResize, false);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// var controls = new THREE.OrbitControls(camera, renderer.domElement);
//
camera.position.set(0, 0, 100);
// controls.autoRotate = true;
controls.update();

function animate() {
  // controls.update();
  requestAnimationFrame(animate);
  render();

  //   stats.update();
}
function render() {
  theta += 0.1;
  camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();

  // --------------find intersections
  // raycaster.setFromCamera(mouse, camera);
  // var intersects = raycaster.intersectObjects(scene.children);
  // if (intersects.length > 0) {
  //   if (INTERSECTED != intersects[0].object) {
  //     if (INTERSECTED)
  //       INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
  //     INTERSECTED = intersects[0].object;
  //     INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
  //     INTERSECTED.material.emissive.setHex(0xff0000);
  //   }
  // } else {
  //   if (INTERSECTED)
  //     INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
  //   INTERSECTED = null;
  // }
  renderer.render(scene, camera);
}
