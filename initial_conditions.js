var t0      = 0;
var tf      = 10;
var paso    = 0.5;
var tam     = 5;

var frames = Math.round((tf-t0/paso)+1);

var x0  = 0 
var y0  = 0 
var z0  = 0

var vx0 = 10
var vy0 = 15
var vz0 = 10

var masa      = 1
var gravity  = -9.8
var krest     = 0.8




var tn  = t0


export {
    t0,
    tf,
    paso,
    tam,
    frames,
    x0, y0,  z0,
    vx0,  vy0, vz0,
    masa,
    gravity,
    krest,
    tn
}