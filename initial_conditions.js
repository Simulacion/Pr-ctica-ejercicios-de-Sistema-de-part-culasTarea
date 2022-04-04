var btnSituacion1 =  document.getElementById('btnSituacion1');

var particles = 1000;

// input range
var t0      = 0;
var tf      = 10;

// input range
var paso    = 0.5;
//input number
var tam     = 50;

// Input number
var frames = Math.round((tf-t0/paso)+1);
// Input number

var x0  = Math.floor(Math.random() * 30);
var y0  = 100
var z0  = Math.floor(Math.random() * 30);
// Input number

var vx0 = Math.floor(Math.random() * 30); 
var vy0 = Math.floor(Math.random() * 100);
var vz0 = Math.floor(Math.random() * 30);

// Input number
var masa      = 1
var gravity   = -9.8
var krest     = 0.8

var tn  = t0

btnSituacion1.addEventListener('click', ()=>{
    t0      = 0;
    tf      = 10;
    paso    = 0.5;
    tam     = 5;
    frames = Math.round((tf-t0/paso)+1);
    x0  = Math.floor(Math.random() * 30);
    y0  = 50
    z0  = Math.floor(Math.random() * 30);
    vx0 = Math.floor(Math.random() * 30);
    vy0 = Math.floor(Math.random() * 100);
    vz0 = Math.floor(Math.random() * 30);
    masa      = 1
    gravity   = -9.8
    krest     = 0.8
    tn  = t0
})

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
    tn,
    particles
}