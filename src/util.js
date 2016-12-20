/**
 * Created by evio on 16/10/26.
 */
export const methods = ['forward', 'backward'];

export const makeDirectiveUrlParams = function(method, ctx){
    return {
        bind(el, binding){
            el.addEventListener('click', binding.__patchURLCallback__ = () => {
                let methodName = method;
                let modifiers = binding.modifiers || {};

                if ( modifiers.create ){
                    methodName = exchange('create-' + method);
                }

                ctx[methodName](binding.value || undefined);
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

export const exchange = s1 => {
    return s1.replace(/\-(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
};