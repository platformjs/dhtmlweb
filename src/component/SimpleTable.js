import Component from "./Component";

export default class SimpleTable extends Component {
    constructor() {
        super();
        this.template = `<table w-attr="id disabled:isDisabled()"></table>`;
    }
}