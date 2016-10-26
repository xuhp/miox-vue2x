
import BootStrap from 'miox-core';
import Animate from 'miox-animate';
import { engine, webview } from './index';

class A extends webview {
    constructor(el){
        super(el);
    }

    render(h){
        return (
            <div>111</div>
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
