
import BootStrap from 'miox-core';
import Animate from 'miox-animate';
import { engine, webview, component } from './index';

class Button extends component {
    constructor(){
        super();
    }

    render(h){
        return (
            <p>button</p>
        )
    }
}

class A extends webview {
    constructor(el){
        super(el);
    }

    components(components){
        components.cutton = Button;
    }

    render(h){
        return (
            <span v-forward="/list">
                <cutton />
                dasf
            </span>
        )
    }
    
}

BootStrap(async app => {
    app.animate(Animate());
    app.engine(engine);
    app.use(async ctx => {
        await ctx.render(A);
    })
});
