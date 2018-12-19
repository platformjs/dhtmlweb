import Component from "./Component";

export default class Button extends Component {
    constructor() {
        super();
        this.set({
            title: "Untitled",
            width: "auto",
            height: "auto"
        });
        this.template = `<button type="button" class="btn btn-default" 
            w-style="width;height"
            w-attr="id disabled:isDisabled()"
            w-html="title"></button>`;
    }
}