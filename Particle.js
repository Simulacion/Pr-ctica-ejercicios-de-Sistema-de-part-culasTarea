import Calculus from './mathMethods.js';
 
export default class Particle{
    constructor(xn, yn, zn, vxn, vyn, vzn, kRest, mass){
        this.particle   = null;
        
        this.xn         = 0 || Math.floor(Math.random() * (10-1)+1);      //Random from 1 to 10
        this.yn         = 0 || Math.floor(Math.random() * (10-1)+1);      //Random from 1 to 10
        this.zn         = 0 || Math.floor(Math.random() * (10-1)+1);      //Random from 1 to 10
        
        this.vxn        = vxn || Math.floor(Math.random() * (10-1)+1);     //Random from 1 to 10
        this.vyn        = vyn || Math.floor(Math.random() * (10-1)+1);     //Random from 1 to 10
        this.vzn        = vzn || Math.floor(Math.random() * (10-1)+1);     //Random from 1 to 10
        
        this.kRest      = 0.8;                           //Random from 0 to 1

        this.calculus   = new Calculus();
    }

    setParticle(particle){
        this.particle = particle;
        this.updatePosition();
    }

    getParticle(){
        return this.particle;
    }

    updatePosition(){
        this.particle.position.x = this.xn;
        this.particle.position.y = this.yn;
        this.particle.position.z = this.zn;
        // console.log(this.xn, this.yn, this.zn);
    }

    detectCollision(){
        if(this.yn <= 0){
            this.yn     =   0;
            this.vxn    =   this.kRest * this.vxn;
            this.vyn    =   this.kRest * this.vyn * -1;
            this.vzn    =   this.kRest * this.vzn;
        }
        this.updatePosition();
    }

    euler(){
        this.vxn = this.calculus.euler(this.vxn, 'dv', false);
        this.vyn = this.calculus.euler(this.vyn, 'dv', true);
        this.vzn = this.calculus.euler(this.vzn, 'dv', false);

        this.xn = this.calculus.euler(this.vxn, 'd', false);
        this.yn = this.calculus.euler(this.vyn, 'd', true);
        this.zn = this.calculus.euler(this.vzn, 'd', false);
        
        this.detectCollision();
    }
}