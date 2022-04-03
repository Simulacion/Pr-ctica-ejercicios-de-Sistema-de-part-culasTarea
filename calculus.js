import {masa as m, gravity} from './initial_conditions.js'

export default class Calculus{
    constructor(){
        this.mass = m;
        this.gravity = gravity;
        this.paso = 0.5;

    }
        
    gravityForce(mass){
        return this.gravity*mass
    }
    f( v, yAxis){
        if(yAxis){
            return this.gravityForce(this.mass)
        }
        return 0;
    }
    
    dv( v, yAxis){
        return this.f( v, yAxis)/this.mass
    }
    
    d( v, yAxis){
        return v
    }

    euler(p, v, f, yAxis){
        if(f=='dv'){
            return v + this.dv(v, yAxis)*this.paso;
        }else if(f=='d'){
            return p + this.d(v, yAxis)*this.paso;
        }
    }
}

