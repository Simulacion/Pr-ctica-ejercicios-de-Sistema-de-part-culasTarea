import {sphere} from './geometries.js'
import * as initialConditions from './initial_conditions.js'
import * as calculus from './calculus.js'

import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';


var vxn = initialConditions.vx0;
var vyn = initialConditions.vy0;
var vzn = initialConditions.vz0;

var xn  = initialConditions.x0
var yn  = initialConditions.y0
var zn  = initialConditions.z0

var paso = initialConditions.paso;
var krest = initialConditions.krest;

var tn = initialConditions.tn;


const scene = new THREE.Scene();
scene.background = new THREE.Color (255, 255, 255)


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
  );
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
const controls = new OrbitControls( camera, renderer.domElement );

const size = 10000;
const divisions = 50;

const gridHelperX = new THREE.GridHelper( size, divisions );
scene.add( gridHelperX );

const gridHelperY = new THREE.GridHelper( size, divisions );
gridHelperY.rotation.x = Math.PI/2;
scene.add( gridHelperY );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

scene.add(sphere);


camera.position.z = 100;
camera.position.x = -50;
camera.position.y = 50;

function animate() {

  vxn = vxn + calculus.dv(tn, xn, vxn)*paso
  vyn = vyn + calculus.dv(tn, yn, vyn, true)*paso
  vzn = vzn + calculus.dv(tn, zn, vzn)*paso
    
  xn  = xn + calculus.d(tn, xn, vxn)*paso
  yn  = yn + calculus.d(tn, yn, vyn, true)*paso
  zn  = zn + calculus.d(tn, zn, vzn)*paso
    
  tn  = tn + paso
    
  if(yn<=0){
      yn    = -yn
      vxn   =  krest * vxn 
      vyn   = -krest * vyn 
      vzn   =  krest * vzn 
  }
  xn *= 1
  yn *= 1
  zn *= 1

  sphere.position.x = xn
  sphere.position.y = yn
  sphere.position.z = zn
  // console.log(xn, yn, zn);
  
  camera.lookAt(xn, yn, zn);

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

export{
  animate
}

