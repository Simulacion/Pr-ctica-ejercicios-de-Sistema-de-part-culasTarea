import {masa as m, gravity} from './initial_conditions.js'

function gravityForce(m_){
    return gravity*m_
}

function f(time, axis, v, yAxis){
    if(yAxis){
        return gravityForce(m)
    }
    return 0;
}

function dv(time, axis, v, yAxis){
    return f(time, axis, v, yAxis)/m
}

function d(time, axis, v, yAxis){
    return v
}
export{
    f,
    d,
    dv
}