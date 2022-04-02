import {particles} from './geometries.js'
import * as initialConditions from './initial_conditions.js'
import * as calculus from './calculus.js'

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


// initial conditions
var particlesProperties = []

var vxn = initialConditions.vx0;
var vyn = initialConditions.vy0;
var vzn = initialConditions.vz0;

var xn  = initialConditions.x0;
var yn  = initialConditions.y0;
var zn  = initialConditions.z0;

var masa = initialConditions.masa;

var paso = initialConditions.paso;
var krest = initialConditions.krest;

var tn = initialConditions.tn;

for (let i = 0; i < particles.length; i++) {
  particlesProperties.push(new Object({particle: particles[i], xn, yn, zn, vxn, vyn, vzn, masa}));
  scene.add(particles[0]);
}


function animate() {
  tn  = tn + paso

  for (let i = 0; i < particlesProperties.length; i++) {
    particlesProperties[i].vxn = particlesProperties[i].vxn + calculus.dv(tn, particlesProperties[i].xn, particlesProperties[i].vxn)*paso
    particlesProperties[i].vyn = particlesProperties[i].vyn + calculus.dv(tn, particlesProperties[i].yn, particlesProperties[i].vyn, true)*paso
    particlesProperties[i].vzn = particlesProperties[i].vzn + calculus.dv(tn, particlesProperties[i].zn, particlesProperties[i].vzn)*paso
    particlesProperties[i].xn  = particlesProperties[i].xn  + calculus.d(tn, particlesProperties[i].xn, particlesProperties[i].vxn)*paso
    particlesProperties[i].yn  = particlesProperties[i].yn  + calculus.d(tn, particlesProperties[i].yn, particlesProperties[i].vyn, true)*paso
    particlesProperties[i].zn  = particlesProperties[i].zn  + calculus.d(tn, particlesProperties[i].zn, particlesProperties[i].vzn)*paso

    if(yn<=0){
      particlesProperties[i].yn    = 0
      particlesProperties[i].vxn   =  krest * particlesProperties[i].vxn 
      particlesProperties[i].vyn   = -krest * particlesProperties[i].vyn 
      particlesProperties[i].vzn   =  krest * particlesProperties[i].vzn 
    }
    particlesProperties[i].particle.position.x = particlesProperties[i].xn;
    particlesProperties[i].particle.position.y = particlesProperties[i].yn;
    particlesProperties[i].particle.position.z = particlesProperties[i].zn;
  }
  
  // camera.lookAt(xn, yn, zn);
  // console.log(camera.position);
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

export{
  animate
}

