export default class Calculus {
    constructor(mass, step) {
      this.mass     = mass;
      this.step     = step;
    }
    gravityForce(mass){
        return gravity*mass
    }

    f(axis, v, yAxis){
        if(yAxis){
            return this.gravityForce(this.mass)
        }
        return 0;
    }
    
    dv(axis, v, yAxis){
        return this.f(axis, v, yAxis)/this.mass
    }
    
    d(axis, v, yAxis){
        return v
    }

    euler (y, f, yAxis){
        return   y + f(null, y, yAxis) * this.step;
    }
  }