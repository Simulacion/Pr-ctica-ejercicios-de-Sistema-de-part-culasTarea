export default class Calculus {
    constructor() {
      this.mass     = 2;
      this.step     = 0.5;
      this.gravity  = -9.8;
    }

    gravityForce(mass){
        // console.log(mass*this.gravity);
        return mass*this.gravity
    }

    f(axis, v, yAxis){
        if(yAxis){
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
            console.log( y, '+',this.dv(null, y, yAxis),'*', this.step,'=', (y + this.dv(null, y, yAxis)) * this.step);
            return   (y + this.dv(null, y, yAxis)) * this.step; 
        }
        else{
            return   (y + this.d(null, y, yAxis) )* this.step;
        }
    }
  }