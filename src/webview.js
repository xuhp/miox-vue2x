/**
 * Created by evio on 16/10/26.
 */

import Vue from 'vue';

export default class Webview extends Vue {
    constructor(el){
        super(el);
    }

    get el(){
        return this.$el.parentNode;
    }

    beforeCreate(){
        if ( typeof this.webviewWillCreate === 'function' ){
            this.webviewWillCreate();
        }
    }

    created(){
        if ( typeof this.webviewDidCreate === 'function' ){
            this.webviewDidCreate();
        }
    }

    beforeMount(){
        if ( typeof this.webviewWillMount === 'function' ){
            this.webviewWillMount();
        }
    }

    mounted(){
        if ( typeof this.webviewDidMount === 'function' ){
            this.webviewDidMount();
        }
        setTimeout(() => {
            this.$emit('webview:ready');
        });
    }

    beforeUpdate(){
        if ( typeof this.webviewWillUpdate === 'function' ){
            this.webviewWillUpdate();
        }
    }

    updated(){
        if ( typeof this.webviewDidUpdate === 'function' ){
            this.webviewDidUpdate();
        }
    }

    activated(){
        if ( typeof this.webviewDidActive === 'function' ){
            this.webviewDidActive();
        }
    }

    deactivated(){
        if ( typeof this.webviewDidDeActive === 'function' ){
            this.webviewDidDeActive();
        }
    }

    beforeDestroy(){
        this.currentNode = this.el;
        if ( typeof this.webviewWillDestroy === 'function' ){
            this.webviewWillDestroy();
        }
    }

    destroyed(){
        if ( this.currentNode ){
            this.currentNode.parentNode.removeChild(this.currentNode);
        }
        if ( typeof this.webviewDidDestroy === 'function' ){
            this.webviewDidDestroy();
        }
    }

    destroy(){
        this.$destroy();
    }
}
