import * as initialConditions from './initial_conditions.js'; 
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';

const geometry = new THREE.SphereGeometry( 
    initialConditions.tam, 
    32, 
    16 
    );
const material = new THREE.MeshBasicMaterial( { color: 0xC680D0 } );

var particles = []

for (let i = 0; i < initialConditions.particles; i++) {
    particles.push(new THREE.Mesh(geometry, material));
    particles[i].position.x = initialConditions.x0,
    particles[i].position.y = initialConditions.y0,
    particles[i].position.z = initialConditions.z0
}

// const sphere = new THREE.Mesh(geometry, material);

export {
    particles,
}