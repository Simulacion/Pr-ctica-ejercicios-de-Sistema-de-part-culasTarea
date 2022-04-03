import Calculus from './Calculus.js'

var calculus = new Calculus();

export default class Particle{
    constructor(xn, yn, zn, vxn, vyn, vzn, mass, krest){
        this.particle = null;
        this.xn = xn  || Math.floor(Math.random() * (80-10)+10); 
        this.yn = yn  || Math.floor(Math.random() * (80-10)+10); 
        this.zn = zn  || Math.floor(Math.random() * (80-10)+10); 
        this.vxn= vxn || Math.floor(Math.random() * (80-10)+10); 
        this.vyn= vyn || Math.floor(Math.random() * (160-10)+10); 
        this.vzn= vzn || Math.floor(Math.random() * (80-10)+10); 

        this.mass  = mass  || Math.random();
        this.krest = krest || 0.8;
    }

    setParticle(particle){
        this.particle = particle;
        updatePosition()
    }

    getParticle(){
        return this.particle;
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
    euler(){
        this.vxn = calculus.euler(this.xn, this.vxn, 'dv', false);
        this.vyn = calculus.euler(this.yn, this.vyn, 'dv', true);
        this.vzn = calculus.euler(this.zn, this.vzn, 'dv', false);
        this.xn  = calculus.euler(this.xn, this.vxn, 'd', false);
        this.yn  = calculus.euler(this.yn, this.vyn, 'd', true);
        this.zn  = calculus.euler(this.zn, this.vzn, 'd', false);

        this.detectCollision();
    }
    test(){
        console.log('hello');
    }
}