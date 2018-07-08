import {Container, Text, Sprite} from "pixi.js"

export class View {

    constructor({ key, node = "PIXI.Container", resources, ...props } = {}) {
        let target;
        if (node === "PIXI.Text") {
            const style = resources.find(({type}) => type === "font");
            target = new Text(props.text, style && style.font);
        }
        else if (node === "PIXI.Container") {
            target = new Container();
        }
        else if (node === "PIXI.Sprite") {
            target = new Sprite(resources.find(({type}) => type === "texture").texture);
        }
        target.name = key;
        Object.keys(props).map(key => target[key] = props[key]);
        this.target = target;
    }

    add(...args) {
        this.target.addChild(...args.map( ({ target }) => target ));
    }

    remove() {
        this.target.parent.removeChild( this.target );
    }

}