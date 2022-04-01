import * as initialConditions from './initial_conditions.js'; 
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';

const geometry = new THREE.SphereGeometry( 
    initialConditions.tam, 
    32, 
    16 
    );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const sphere = new THREE.Mesh(geometry, material);

sphere.position.x =initialConditions.x0,
sphere.position.y =initialConditions.y0,
sphere.position.z =initialConditions.z0



export {
    sphere,
}