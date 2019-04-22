import BasicView from "./BasicView";

const template = `
    <input type="text" class="form-control">
`;
export default class TextField extends BasicView {
    constructor(props) {
        super(props);
        this.template = template;
        this.propertyChangedActions = {
            
        }
    }
}