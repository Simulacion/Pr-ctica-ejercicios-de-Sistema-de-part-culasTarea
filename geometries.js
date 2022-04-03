import * as initialConditions from './initial_conditions.js'; 
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';

const geometry = new THREE.SphereGeometry(initialConditions.tam, 32, 16);
const material = new THREE.MeshBasicMaterial();

var particles = []
var color = new THREE.Color( 0xffffff );

for (let i = 0; i < initialConditions.particles; i++) {
    color.setHex( Math.random() * 0xffffff );
    // material.color = color;
    particles.push(new THREE.Mesh(
        new THREE.SphereGeometry(Math.floor(Math.random() * (100 - 40)) + 40, 32, 16),
        new THREE.MeshBasicMaterial({color})));
    particles[i].position.x = initialConditions.x0,
    particles[i].position.y = initialConditions.y0,
    particles[i].position.z = initialConditions.z0
}


export {
    particles,
}