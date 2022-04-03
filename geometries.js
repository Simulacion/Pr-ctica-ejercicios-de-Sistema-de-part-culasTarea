import * as initialConditions from './initial_conditions.js'; 
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import Particle from './Particle.js'


const geometry = new THREE.SphereGeometry(initialConditions.tam, 32, 16);
const material = new THREE.MeshBasicMaterial();

var particles = []
var color = new THREE.Color( 0xffffff );


for (let i = 0; i < initialConditions.particles; i++) {
    let newParticle = new Particle()

    color.setHex( Math.random() * 0xffffff );
    let geometry = new THREE.SphereGeometry(Math.floor(Math.random() * (100 - 40)+ 40), 32, 16);
    let material = new THREE.MeshBasicMaterial({color});

    newParticle.particle = new THREE.Mesh(geometry , material);

    particles.push(newParticle);
}


export {
    particles,
}