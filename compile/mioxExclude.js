/**
 * Created by evio on 16/9/28.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const node_modules = path.resolve(__dirname, '..', 'node_modules');
const mioxPackages = getAllModulesByMiox();

module.exports = exclude;

function getAllModulesByMiox(){
    const mioxs = [];
    const dirs = fs.readdirSync(node_modules);
    dirs.forEach(function(dir){
        if ( /^miox\-/i.test(dir) ){
            mioxs.push(dir.toLowerCase());
        }
    });
    return mioxs;
}

function exclude(pather){
    const dir = path.relative(node_modules, pather);
    const folder = dir.split('/')[0];
    const index = mioxPackages.indexOf(folder.toLowerCase());
    if ( /^\.\.\/src\//.test(dir) || index > -1 ){
        return false;
    }else{
        return true;
    }
}