import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import Particle from './Classes/Particle.js'
import Calculus from './Classes/Calculus.js'

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
const size = 100000;
const divisions = 100;

const gridHelperX = new THREE.GridHelper( size, divisions );
scene.add( gridHelperX );

//SITUATIONS--------------------------------------------------
var particles = []

// let particle = new Particle(xn, yn, zn, vxn, vyn, vzn, mass, tam, color, krest)
// null ==> random values by default  
function situation1(n) {
  console.log(n/4);
  particles = []
  for (let i = 0; i < n/4; i++) {
    // Se toma el valor 1 para que el lenguaje no tome un valor aleatorio
    let particleType1 = new Particle(20, 1, 20,  100,  200,   1,    null, null, null, null);
    let particleType2 = new Particle(20, 1, 20, -100,  200,   1,    null, null, null, null);
    let particleType3 = new Particle(20, 1, 20,  1,    200,   100,  null, null, null, null);      
    let particleType4 = new Particle(20, 1, 20,  1,    200,  -100,  null, null, null, null);

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

function situation2(n) {
  particles = []
  for (let i = 0; i < n/4; i++) {
    let particleType1 = new Particle(20, 1, 20,  100,  200,   100,  null, null, null, null);
    let particleType2 = new Particle(20, 1, 20, -100,  200,   100,  null, null, null, null);
    let particleType3 = new Particle(20, 1, 20, -100,  200,   100,  null, null, null, null);
    let particleType4 = new Particle(20, 1, 20,  100,  200,  -100,  null, null, null, null);

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

function situation3(n) {
  particles = []
  for (let i = 0; i < n*0.1; i++) {
    let particle= new Particle(1000, 10000, 1000,  1,  1,   1,  null, null, null, 0.9);
    particles.push(particle);
    scene.add(particles[i].getParticle());
  }
  for (let i = 0; i < n*0.3; i++) {
    let fac = Math.round(Math.random()*2-1);
    let vx = Math.floor(Math.random()*(200))*fac
    let vy = Math.floor(Math.random()*(1000))

    let krest = Math.random();

    let particleType2 = new Particle(1, 1, 1,  vx,  vy,   vx,  null, null, new THREE.Color(255, 0, 0), krest);
    let particleType3 = new Particle(1000, 1, 100,  vx,  vy/10,   vx,  null, null, new THREE.Color(0, 0, 255), 0.5);
    let particleType4 = new Particle(1, 1, 1000,  Math.abs(vx),  vy,   Math.abs(vx),  null, null, new THREE.Color(0, 255, 0), krest);

    particles.push(particleType2);
    particles.push(particleType3);
    particles.push(particleType4);
    scene.add(particles[i].getParticle());
    scene.add(particles[i+1].getParticle());
    scene.add(particles[i+2].getParticle());
  }
}

// EVENTS ------------------------------
var nParticlesInputRange = document.getElementById('nParticlesInputRange');

var radioButtonEuler = document.getElementById('radioButtonEuler');
var radioButtonRK = document.getElementById('radioButtonRK');

var situation1Button = document.getElementById('situation1Button');
var situation2Button = document.getElementById('situation2Button');
var situation3Button = document.getElementById('situation3Button');

situation1Button.addEventListener('click', ()=>{
  var n = parseInt(nParticlesInputRange.value);
  situation1(n);
})
situation2Button.addEventListener('click', ()=>{
  var n = parseInt(nParticlesInputRange.value);
  situation2(n);
})
situation3Button.addEventListener('click', ()=>{
  var n = parseInt(nParticlesInputRange.value);
  situation3(n);
})

function animate() {

  for (let i = 0; i < particles.length; i++) {
    if (radioButtonRK.checked)
      particles[i].parabolicShot_RK();
    if(radioButtonEuler.checked)
      particles[i].parabolicShot_Euler();
  }
  
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

export{
  animate
}

