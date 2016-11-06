
import BootStrap from 'miox-core';
import Animate from 'miox-animate';
import { Engine, Webview, Component, Regist } from './index';

console.log(Regist)

class Button extends Component {
    constructor(options){
        super(options);
    }

    render(h){
        return (
            <p>button</p>
        )
    }
}

class A extends Webview {
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
    app.engine(Engine);
    app.use(async ctx => {
        await ctx.render(A);
    })
});
