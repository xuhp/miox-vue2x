/**
 * Created by evio on 16/10/26.
 */

import { EventEmitter } from 'events';
import { Params, Events } from './params';
import { each, compile, isFunction, isComponent, isVueObject, isObject } from './util';

export default class Component extends EventEmitter {
    constructor(){
        super();

        this.__isMioxComponent = true;
        this.__objects__ = Params;
        this.__methods__ = Events;
        this.__dataBase__ = {};
        this.__initData__();
    }

    /**
     * 初始化数据
     * @private
     */
    __initData__(){
        const ctx = this;
        let i = this.__methods__.length;

        while ( i-- ) {
            this.__dataBase__[this.__methods__[i]] = (function(method){
                return function(){
                    if ( method === 'beforeCreate' ){
                        this.$factory = ctx;
                        ctx.$vm = this;
                    }

                    if ( EventEmitter.listenerCount(ctx, method) > 0 ){
                        ctx.emit(method, this);
                    }
                }
            })(this.__methods__[i]);
        }
    }

    /**
     * 转换class对象到JSON数据
     * @private
     */
    __defineBuildComponent__(){
        this.__dataBase__.name = this.name || this.constructor.name || 'miox-vue2x-component-factory';

        this.__objects__.forEach(object => {
            if ( isFunction(this[object]) ){
                const TMP = {};
                const result = this[object](TMP);

                if ( result ){
                    this.__dataBase__[object] = result;
                } else {
                    this.__dataBase__[object] = TMP;
                }

                if ( 'components' === object ){
                    this.__defineComponentCompile__(this.__dataBase__);
                }
            }
        });

        this.__defineMixinCompile__();
        this.__defineExtendCompile__();
        this.__defineDelimitersCompile__();
        this.__defineParentCompile__();
        this.__defineTemplateCompile__();
        this.__defineFunctionalCompile__();
        this.__defineRenderCompile__();
    }

    /**
     * 组件自编译
     * @param target
     * @param puts
     * @private
     */
    __defineComponentCompile__(target, puts){
        each(
            target['components'],
            (component, key) => {
                (puts || target)['components'][key] = compile(component);
            }
        );
    }

    /**
     * 处理mixins的情况
     * @private
     */
    __defineMixinCompile__(){
        if ( isFunction(this.mixins) ){
            const mixins = [];
            const result = this.mixins(mixins);

            if ( result && Array.isArray(result) ){
                this.__dataBase__.mixins = result.slice(0);
            } else {
                this.__dataBase__.mixins = mixins;
            }
        } else if ( Array.isArray(this.mixins) ) {
            this.__dataBase__.mixins = this.mixins.slice(0);
        } else {
            return;
        }

        this.__dataBase__.mixins = this.__dataBase__.mixins.map(Mixin => {
            if ( isComponent(Mixin) ){
                return new Mixin().toJSON();
            } else if ( isVueObject(Mixin) ) {
                return Mixin;
            } else {
                return null;
            }
        });
    }

    /**
     * 处理extends情况
     * @private
     */
    __defineExtendCompile__(){
        if ( isFunction(this['extends']) ){
            const result = this['extends']();

            if ( result ){
                this.__dataBase__.extends = result;
            }
        } else if ( isVueObject(this['extends']) ) {
            this.__dataBase__.extends = this['extends'];
        } else {
            return;
        }

        if ( isComponent(this.__dataBase__.extends) ){
            const CMP = this.__dataBase__.extends;

            this.__dataBase__.extends = new CMP().toJSON();
        }
    }

    /**
     * 处理delimiters属性
     * @private
     */
    __defineDelimitersCompile__(){
        if ( this.delimiters ){
            this.__dataBase__.delimiters = this.delimiters;
        }
    }

    /**
     * 处理parent属性
     * @private
     */
    __defineParentCompile__(){
        if ( this.parent ){
            if ( this.parent.__isMioxComponent ){
                this.__dataBase__.parent = this.parent.$vm;
            } else {
                this.__dataBase__.parent = this.parent;
            }
        }
    }

    __defineTemplateCompile__(){
        if ( this.template ){
            if ( isFunction(this.template) ){
                const result = this.template();

                if ( result ){
                    this.__dataBase__.template = result;
                }
            } else {
                this.__dataBase__.template = this.template;
            }
        }
    }

    __defineFunctionalCompile__(){
        if ( this.functional ){
            this.__dataBase__.functional = true;
        }
    }

    __defineRenderCompile__(){
        if ( isFunction(this.render) ){
            const ctx = this;

            this.__dataBase__.render = function render(...args){
                const vm = this;

                args.push(ctx);
                return ctx.render.apply(vm, args);
            };
        }
    }

    toJSON(){
        const fields = [];

        this.__defineBuildComponent__();

        const keys = Object.keys(this.__dataBase__);
        let count = keys.length;

        while (count--) {
            const key = keys[count];
            
            if ( isObject(this.__dataBase__[key]) ){
                const objectKeysCount = Object.keys(this.__dataBase__[key]).length;

                if ( objectKeysCount === 0 ){
                    fields.push(key);
                }
            }

            if ( Array.isArray(this.__dataBase__[key]) ){
                const arrayKeysCount = this.__dataBase__[key].length;

                if ( arrayKeysCount === 0 ){
                    fields.push(key);
                }
            }
        }

        fields.forEach(field => {
            delete this.__dataBase__[field];
        });

        if ( this.__dataBase__.name ){
            this.__dataBase__.name = this.__dataBase__.name.toLowerCase();
        }

        return this.__dataBase__;
    }
}
