import Component from "./Component";

export default class Button extends Component {
    constructor() {
        super();
        this.set({
            title: "Untitled",
            width: "auto",
            height: "auto"
        });
        this.template = `<button type="button" class="dweb-component dweb-button" 
            w-style="width;height"
            w-attr="id disabled:isDisabled() title style class:styleClass"
            w-html="title"></button>`;
    }
}