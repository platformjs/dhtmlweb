import BasicView from "./BasicView";

const template = `
    <span class="label label-default">Unlabeled</span>
`;
export default class Label extends BasicView {
    constructor(props) {
        super(props);
        this.template = template;
        this.propertyChangedActions = {
            "text": () => {
                this.$el.html(this.get("text"));
            }
        }
    }
}