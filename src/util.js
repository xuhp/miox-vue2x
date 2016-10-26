/**
 * Created by evio on 16/10/26.
 */

import isClass from 'is-class';
import Vue from 'vue';

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

export const makeDirectiveUrlParams = function(method, ctx){
    return {
        bind(el, binding, vnode){
            el.addEventListener('click', binding.__patchURLCallback__ = () => {
                if ( method === 'forward' && !binding.value ){
                    return ctx.forward();
                }
                if ( method === 'backward' && !binding.value ){
                    return ctx.backward();
                }
                if ( !binding.value ) return;
                if ( vnode.context.$root['$' + method] ){
                    vnode.context.$root['$' + method](binding.value);
                }else{
                    throw new Error('miss method: $' + method);
                }
            });
        },
        unbind(el, binding){
            el.removeEventListener('click', binding.__patchURLCallback__);
            delete binding.__patchURLCallback__;
        }
    }
};

export const toLinkString = function(s){
    return s.replace(/([A-Z])/g,"-$1").toLowerCase()
};