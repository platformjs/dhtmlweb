import Component from "./Component";
import Util from "../util/Util";
import FlowLayout from "../layout/FlowLayout";
import GridLayout from "../layout/GridLayout";

export default class Container extends Component {
    constructor() {
        super();
        this.template = `<div class="panel panel-default" w-attr="id disabled:isDisabled()" w-style="width;height">
            <div class="panel-body"></div>
        </div>`;
        this.components = [];
    }
    addComponents(components, index) {
        Util.each(Array.isArray(components) ? components : [components], component => component.setParent(this));
        Util.insert(this.components, components, index);
        if (this.isMonted()) {
            this.getLayout().addComponents(this, components, index);
        }
    }
    removeComponent(component) {
        const index = this.indexOf(component);
        if (index != -1) {
            Util.remove(this.components, index);
            if (this.isMonted()) {
                this.getLayout().removeComponent(this, index);
            }
        }
    }
    clearComponents() {
        this.components.length = 0;
        if (this.isMonted()) {
            this.getLayout().clearComponents(this);
        }
    }
    getLayout() {
        return this.layoutor || new FlowLayout(this, {});
    }
    setLayout(layoutor) {
        this.layoutor = layoutor;
    }
    render() {
        this.$el = this.$containerEl = $(this.template);
        this.attachHtmlEvents();
        dwebCompiler.compile(this.$el[0], this, this.signal);
        this.$contentEl = this.$containerEl.children().eq(0);
        this.getLayout().renderComponents(this);
        return this;
    }
    indexOf(component) {
        let index = -1;
        Util.each(this.components, (c, i) => {
            if (c === component) {
                index = i;
                return false;
            }
        });
        return index;
    }
    getContentSize() {

    }
    getContainerSize() {
        
    }
}