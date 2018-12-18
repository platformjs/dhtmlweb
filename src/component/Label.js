import Component from "./Component";

export default class Label extends Component {
    constructor() {
        super();
        this.set({
            title: "Unlabeled"
        });
        this.template = `<label w-html="title" w-attr="id disabled:isDisabled()"></label>`;
    }
}