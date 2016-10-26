/**
 * Created by evio on 16/10/26.
 */

import { Promise } from 'es6-promise';
import isClass from 'is-class';
// import Vue from 'vue';

export default class Engine {
    constructor(ctx){
        this.ctx = ctx;
    }

    async create(webview){
        const ctx = this.ctx;

        if ( !isClass(webview) && typeof webview !== 'function' ){
            throw new Error('`webview` argument is not a class object.');
        }

        return ctx.set(ctx.req.nextKey, await new Promise((resolve, reject) => {
            const web = new webview(this.createWebviewRoot());

            web.ctx = ctx;
            web.on('mounted', () => resolve(web));
            web.on('error', reject);
            web.__defineCompile__();
        }));
    }

    install() {
        // const ctx = this.ctx;
        // Vue.prototype.$ctx = ctx;
        // ['createForward', 'createBackward', 'forward', 'backward'].forEach( which => {
        //     if ( ctx[which] ){
        //         Vue.prototype['$' + which] = url => ctx[which](url);
        //         Vue.directive(toLinkString(which), PatchURL(which, ctx));
        //     }
        // });
    }

    createWebviewRoot(){
        const element = document.createElement('div');
        const wrapElement = document.createElement('div');

        this.ctx.webviewsElement.appendChild(element);
        element.appendChild(wrapElement);
        element.classList.add('mx-webview');
        element.setAttribute('webview-key', this.ctx.req.nextKey);

        return wrapElement;
    }
}
