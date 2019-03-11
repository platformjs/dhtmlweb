import BasicView from "./BasicView";

const template = `
    <button type="button" class="btn btn-primary">Basic</button>
`;
export default class Button extends BasicView {
    constructor(props) {
        super(props);
        this.template = template;
        this.__allTypeStyleClass = "btn-default btn-primary btn-success";
        this.propertyChangedActions = {
            "text": () => {
                this.$el.html(this.get("text"));
            },
            "type": () => {
                if (this.get("type")) {
                    this.$el.removeClass(this.__allTypeStyleClass).addClass(`btn-${this.get("type")}`);
                }
            },
            "disabled": () => {
                if (this.get("disabled")) {
                    this.$el.addClass("disabled");
                } else {
                    this.$el.removeClass("disabled");
                }
            }
        };
    }
}