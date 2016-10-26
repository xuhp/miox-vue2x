/**
 * Created by evio on 16/10/26.
 */

import isClass from 'is-class';

const toString = Object.prototype.toString;

export const each = function each(objects, cb){
    const keys = Object.keys(objects);
    let count = keys.length;

    while ( count-- ) {
        cb(objects[keys[count]], keys[count]);
    }
};

export const compile = function compile(Value){
    if ( isComponent(Value) ){
        const result = new Value();

        if ( result.toJSON ){
            return result.toJSON();
        }
    }
    return Value;
};

export const isFunction = function(fn){
    return typeof fn === 'function';
};

export const isComponent = function(Value){
    return isClass(Value) || isFunction(Value);
};

export const isVueObject = function(Value){
    return toString.call(Value) === '[object Object]';
};

export const isObject = isVueObject;
