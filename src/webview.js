/**
 * Created by evio on 16/10/26.
 */

import Vue from 'vue';
import { Component, life } from 'miox-vue2x-classify';

@Component
export default class Webview extends Vue {
    get el(){
        return this.$el.parentNode;
    }

    @life('mounted') webviewDidMount(){
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
