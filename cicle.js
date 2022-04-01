import * as initialConditions from './initial_conditions.js'
import * as calculus from './calculus.js'
import {animate} from './scene.js'

var collision;


var vxn = initialConditions.vx0;
var vyn = initialConditions.vy0;
var vzn = initialConditions.vz0;

var xn  = initialConditions.x0
var yn  = initialConditions.y0
var zn  = initialConditions.z0

var paso = initialConditions.paso;
var krest = initialConditions.krest;

var tn = initialConditions.tn;


for (let i = 0; i < initialConditions.frames; i+=paso){
    vxn = vxn + calculus.dv(tn, xn, vxn)*paso
    vyn = vyn + calculus.dv(tn, yn, vyn)*paso
    vzn = vzn + calculus.dv(tn, zn, vzn)*paso
      
    xn  = xn + calculus.d(tn, xn, vxn)*paso
    yn  = yn + calculus.d(tn, yn, vyn)*paso
    zn  = zn + calculus.d(tn, zn, vzn)*paso
      
    tn  = tn + paso
      
    if(yn<=0){
        yn        = -yn
        vxn = krest * vxn 
        vyn = -krest * vyn 
        vzn = krest * vzn 
    }
}

export{
    xn, 
    yn, 
    zn
}