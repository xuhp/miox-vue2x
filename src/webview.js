/**
 * Created by evio on 16/10/26.
 */

import Vue from 'vue';
import { Component, life } from 'miox-vue2x-classify';
const events = [
    'abort',
    'blur',
    'change',
    'click',
    'dblclick',
    'error',
    'focus',
    'keypress',
    'keydown',
    'keyup',
    'load',
    'mousedown',
    'mouseover',
    'mouseout',
    'mousemove',
    'mouseup',
    'resize',
    'reset',
    'select',
    'submit',
    'unload',
    'input',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel'
];

@Component
export default class Webview extends Vue {

    get el(){
        return this.$el.parentNode;
    }

    @life('mounted') webviewDidMount(){
        events.forEach(event => {
            this.$el && this.$el.addEventListener(event, e => {
                this.$emit(event, e);
            });
        });
        setImmediate(() => this.$emit('webview:ready'));
    }

    @life('beforeDestroy') webviewBeforeDestroy(){
        this.currentNode = this.el;
    }

    @life('destroyed') webviewDidDestroy(){
        if ( this.currentNode ){
            this.currentNode.parentNode.removeChild(this.currentNode);
        }
    }

    destroy(){
        this.$destroy();
    }
}
