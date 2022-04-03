import {particles} from './geometries.js'

import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';



var container = document.getElementById('canvas');

var canvasWidth = container.offsetWidth;
var canvasHeight = container.offsetHeight;


const scene = new THREE.Scene();
scene.background = new THREE.Color (255, 255, 255)


const camera = new THREE.PerspectiveCamera(
  75,
  canvasWidth / canvasHeight,
  0.1,
  10000
  );
  
const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);

container.appendChild(renderer.domElement);


const controls = new OrbitControls( camera, renderer.domElement );

const size = 10000;
const divisions = 50;

const gridHelperX = new THREE.GridHelper( size, divisions );
scene.add( gridHelperX );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


camera.position.x = -820;
camera.position.z = 1765;
camera.position.y = 2158;


for (let i = 0; i < particles.length; i++) {
  scene.add(particles[i].particle);
}

function animate() {

  for (let i = 0; i < particles.length; i++) {
    particles[i].euler();
  }
  
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

export{
  animate
}

