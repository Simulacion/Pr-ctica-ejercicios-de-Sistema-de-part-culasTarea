export default class Calculus{
    constructor(mass, gravity, step){
        this.mass       = mass      || 1;
        this.gravity    = gravity   || -9.8;
        this.step       = step      || 0.5;

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
            return v + this.dv(v, yAxis)*this.step;
        }else if(f=='d'){
            return p + this.d(v, yAxis)*this.step;
        }
    }
}

