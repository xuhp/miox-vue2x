/**
 * Created by evio on 16/10/26.
 */

import component from './component';
import Vue from 'vue';

export default class Webview extends component {
    constructor(el){
        super();
        this.element = el;
        Object.defineProperty(this, 'el', {
            get(){
                return this.$vm
                    ? this.$vm.$el.parentNode
                    : null;
            }
        });
    }

    __defineCompile__(){
        const options = this.toJSON();

        options.el = this.element;
        this.vm = new Vue(options);
        this.vm.$webview = this;
    }

    __defineDestroy__(){
        this.vm && this.vm.$destroy();
    }

    destroy(){
        this.__defineDestroy__();
    }
}
