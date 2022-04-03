import {masa as m, gravity} from './initial_conditions.js'

function gravityForce(m_){
    return gravity*m_
}

function f(v, yAxis){
    if(yAxis){
        return gravityForce(m)
    }
    return 0;
}

function dv(v, yAxis){
    return f(v, yAxis)/m
}

function d(v, yAxis){
    return v
}
export{
    f,
    d,
    dv
}