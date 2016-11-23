
import BootStrap from 'miox-core';
import Animate from 'miox-animate';
import { Engine, Webview, Component } from './index';

@Component
class Button {
    render(h){
        return (
            <p>button</p>
        )
    }
}

@Component({
    components: {
        btn: Button
    }
})
class A extends Webview {
    a = 1;
    render(h){
        return (
            <span v-forward="/list">
                <btn></btn>
                dasf{this.a}
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
