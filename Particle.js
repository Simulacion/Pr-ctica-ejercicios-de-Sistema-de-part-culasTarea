import Calculus from './mathMethods.js';
 
export default class Particle{
    constructor(xn, yn, zn, vxn, vyn, vzn, kRest, mass){
        this.particle   = null;
        
        this.xn         = xn || Math.floor(Math.random() * (100-1)+1);      //Random from 1 to 100
        this.yn         = yn || Math.floor(Math.random() * (100-1)+1);      //Random from 1 to 100
        this.zn         = zn || Math.floor(Math.random() * (100-1)+1);      //Random from 1 to 100
        
        this.vxn        = vxn || Math.floor(Math.random() * (100-1)+1);     //Random from 1 to 100
        this.vyn        = vyn || Math.floor(Math.random() * (100-1)+1);     //Random from 1 to 100
        this.vzn        = vzn || Math.floor(Math.random() * (100-1)+1);     //Random from 1 to 100
        
        this.mass       = mass  || Math.floor(Math.random() * (100-1)+1);   //Random from 1 to 100
        this.kRest      = kRest || Math.random();                           //Random from 0 to 1

        this.calculus   = new Calculus(this.kRest, this.mass);
    }

    set particle(particle){
        this.particle = particle;
    }

    get particle(){
        return this.particle;
    }

    updatePosition(){
        this.particle.position.x = this.xn;
        this.particle.position.y = this.yn;
        this.particle.position.z = this.zn;
    }

    detectCollision(){
        if(this.yn <= 0){
            this.yn     =  0;
            this.vxn    =  this.krest * this.vxn;
            this.vyn    =  this.krest * this.vyn * -1;
            this.vzn    =  this.krest * this.vzn;
        }
        this.updatePosition();
    }

    euler(){
        this.vxn = this.vxn + this.calculus.euler(this.vxn, this.calculus.dv, false);
        this.vyn = this.vyn + this.calculus.euler(this.vyn, this.calculus.dv, true);
        this.vzn = this.vzn + this.calculus.euler(this.vzn, this.calculus.dv, false);

        this.xn = this.xn + this.calculus.euler(this.xn, this.calculus.d, false);
        this.yn = this.yn + this.calculus.euler(this.yn, this.calculus.d, true);
        this.zn = this.zn + this.calculus.euler(this.zn, this.calculus.d, false);

        this.detectCollision();
    }
}