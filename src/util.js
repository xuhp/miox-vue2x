/**
 * Created by evio on 16/10/26.
 */

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