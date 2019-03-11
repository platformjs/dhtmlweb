import BasicView from "./BasicView";

const template = `
    <div class="tree"></div>
`;
export default class Tree extends BasicView {
    constructor(props) {
        super(props);
        this.template = template;
    }
}