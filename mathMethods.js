export default class Calculus {
    constructor() {
      this.mass     = 1;
      this.step     = 0.5;
      this.gravity  = -9.8;
    }

    gravityForce(mass){
        // console.log(mass*this.gravity);
        return mass*this.gravity
    }

    f(axis, v, yAxis){
        if(yAxis){
            // console.log(v, yAxis);
            return this.gravityForce(this.mass)
        }
        return 0;
    }
    
    dv(axis, v, yAxis){
        return this.f(axis, v, yAxis)/this.mass;
    }
    
    d(axis, v, yAxis){
        return v
    }

    euler (y, f, yAxis){
        if(f=='dv'){
            this.aux = y + this.dv(null, y, yAxis) * this.step
            if(!yAxis){
                console.log(`${y} + ${this.dv(null, y, yAxis)} * ${this.step} = ${this.aux}`);
            }
            return  this.aux ; 
        }
        else{
            return   y + this.d(null, y, yAxis) * this.step;
        }
    }
  }