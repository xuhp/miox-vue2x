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
        this.$emit('webview:beforeCreate');
    }

    created(){
        this.$emit('webview:created');
    }

    beforeMount(){
        this.$emit('webview:beforeMount');
    }

    mounted(){
        this.$emit('webview:mounted');
        setTimeout(() => {
            this.$emit('webview:ready');
        });
    }

    beforeUpdate(){
        this.$emit('webview:beforeUpdate');
    }

    updated(){
        this.$emit('webview:updated');
    }

    activated(){
        this.$emit('webview:activated');
    }

    deactivated(){
        this.$emit('webview:deactivated');
    }

    beforeDestroy(){
        this.currentNode = this.el;
        this.$emit('webview:beforeDestroy');
    }

    destroyed(){
        if ( this.currentNode ){
            this.currentNode.parentNode.removeChild(this.currentNode);
        }
        this.$emit('webview:destroyed');
    }

    destroy(){
        this.$destroy();
    }
}
