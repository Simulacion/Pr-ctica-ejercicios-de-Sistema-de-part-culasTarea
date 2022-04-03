import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import Particle from './Classes/Particle.js'

// CREATE SCENE AND CAMERA-------------------------------------------------
var container = document.getElementById('canvas');

var canvasWidth = container.offsetWidth;
var canvasHeight = container.offsetHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color (255, 255, 255)

const camera = new THREE.PerspectiveCamera(
  75,
  canvasWidth / canvasHeight,
  0.1,
  100000
  );
camera.position.x = -1000;
camera.position.z = 10000;
camera.position.y = 10000;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);

container.appendChild(renderer.domElement);

// ORBIT CONTROLS -------------------------------------------------
const controls = new OrbitControls( camera, renderer.domElement );

// GRID ----------------------------------------------------------
const size = 50000;
const divisions = 100;

const gridHelperX = new THREE.GridHelper( size, divisions );
scene.add( gridHelperX );



//SITUATIONS--------------------------------------------------
var particles = []

// let particle = new Particle(xn, yn, zn, vxn, vyn, vzn, mass, tam, color, krest)
// null ==> random values by default  
function situation1() {
  for (let i = 0; i < 25; i++) {
    let particleType1 = new Particle(20, 0, 20,  100,  200,   0,    null, null, null, null);
    let particleType2 = new Particle(20, 0, 20, -100,  200,   0,    null, null, null, null);
    let particleType3 = new Particle(20, 0, 20,  0,    200,   100,  null, null, null, null);
    let particleType4 = new Particle(20, 0, 20,  0,    200,  -100,  null, null, null, null);

    particles.push(particleType1);
    particles.push(particleType2);
    particles.push(particleType3);
    particles.push(particleType4);

    scene.add(particles[i    ].getParticle());
    scene.add(particles[i + 1].getParticle());
    scene.add(particles[i + 2].getParticle());
    scene.add(particles[i + 3].getParticle());
  }
}

function situation2() {
  for (let i = 0; i < 25; i++) {
    let particleType1 = new Particle(20, 0, 20,  100,  200,   100,  null, null, null, null);
    let particleType2 = new Particle(20, 0, 20, -100,  200,   100,  null, null, null, null);
    let particleType3 = new Particle(20, 0, 20, -100,  200,   100,  null, null, null, null);
    let particleType4 = new Particle(20, 0, 20,  100,  200,  -100,  null, null, null, null);

    particles.push(particleType1);
    particles.push(particleType2);
    particles.push(particleType3);
    particles.push(particleType4);

    scene.add(particles[i    ].getParticle());
    scene.add(particles[i + 1].getParticle());
    scene.add(particles[i + 2].getParticle());
    scene.add(particles[i + 3].getParticle());

  }
}

// EVENTS ------------------------------
var situation1Button = document.getElementById('situation1Button');
var situation2Button = document.getElementById('situation2Button');
var situation3Button = document.getElementById('situation3Button');

situation1Button.addEventListener('click', ()=>{
  situation1();
})
situation2Button.addEventListener('click', ()=>{
  situation2();
})

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

