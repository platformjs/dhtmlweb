import Component from "./Component";

export default class TextField extends Component {
    constructor() {
        super();
        this.set({
            width: "100%"
        });
        this.template = `<input
            w-attr="id disabled:isDisabled() readonly"
            w-value="value:value:displayFormat:inputParser:acceptValidator changedBy" w-style="width">`;
    }
}