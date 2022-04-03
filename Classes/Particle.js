import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import Calculus from './Calculus.js'


export default class Particle{
    constructor(xn, yn, zn, vxn, vyn, vzn, mass, tam, color, krest){
        this.particle = null;
        this.xn = xn  || Math.floor(Math.random() * (80-10)+10); 
        this.yn = yn  || Math.floor(Math.random() * (80-10)+10); 
        this.zn = zn  || Math.floor(Math.random() * (80-10)+10); 
        this.vxn= vxn || Math.floor(Math.random() * (80-10)+10); 
        this.vyn= vyn || Math.floor(Math.random() * (160-10)+10); 
        this.vzn= vzn || Math.floor(Math.random() * (80-10)+10); 

        this.mass  = mass  || Math.floor(Math.random() * (100-1)+1);
        this.krest = krest || 0.8;

        this.color = color  || new THREE.Color( 0xffffff ).setHex( Math.random() * 0xffffff );
        this.tam   = tam    || Math.floor(Math.random() * (500-10)+10);

        this.calculus = new Calculus(this.mass, this.gravity, null);

        this.newParticle();
        // this.logger();
    }

    logger(){
        console.log(this.xn, this.yn, this.zn);
        console.log(this.vxn, this.vyn, this.vzn);
    }

    setParticle(particle){
        this.particle = particle;
        this.updatePosition()
    }

    getParticle(){
        return this.particle;
    }
    
    newParticle(){
        this.geometry = new THREE.SphereGeometry(this.tam,32,16);
        this.material = new THREE.MeshBasicMaterial({color : this.color});
        this.setParticle(new THREE.Mesh(this.geometry, this.material))
    }

    updatePosition(){
        this.particle.position.x = this.xn;
        this.particle.position.y = this.yn;
        this.particle.position.z = this.zn;
    }

    detectCollision(){
        if(this.yn <= 0){
            this.yn    = 0
            this.vxn   =  this.krest * this.vxn 
            this.vyn   = -this.krest * this.vyn 
            this.vzn   =  this.krest * this.vzn 
        }
        this.updatePosition()
    }

    parabolicShot_Euler(){
        this.vxn = this.calculus.euler(this.xn, this.vxn, 'dv', false);
        this.vyn = this.calculus.euler(this.yn, this.vyn, 'dv', true);
        this.vzn = this.calculus.euler(this.zn, this.vzn, 'dv', false);
        this.xn  = this.calculus.euler(this.xn, this.vxn, 'd', false);
        this.yn  = this.calculus.euler(this.yn, this.vyn, 'd', true);
        this.zn  = this.calculus.euler(this.zn, this.vzn, 'd', false);

        this.detectCollision();
    }
    
    parabolicShot_RK(){
        this.vxn = this.calculus.RungeKutta(this.xn, this.vxn, 'dv', false);
        this.vyn = this.calculus.RungeKutta(this.yn, this.vyn, 'dv', true);
        this.vzn = this.calculus.RungeKutta(this.zn, this.vzn, 'dv', false);
        this.xn  = this.calculus.RungeKutta(this.xn, this.vxn, 'd', false);
        this.yn  = this.calculus.RungeKutta(this.yn, this.vyn, 'd', true);
        this.zn  = this.calculus.RungeKutta(this.zn, this.vzn, 'd', false);

        this.detectCollision();
    }
}