import Component from "./Component";
import Util from "../util/Util";
import GridLayout from "../layout/GridLayout";

export default class Container extends Component {
    constructor() {
        super();
        this.template = `<div class="dweb-component dweb-container" 
            w-attr="id disabled:isDisabled() style class:styleClass" 
            w-style="width;height">
            <div class="dweb-content"></div>
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
        return this.layoutor || new GridLayout({
            numberOfColumn: 1
        });
    }
    setLayout(layoutor) {
        this.layoutor = layoutor;
    }
    render() {
        this.$el = this.$containerEl = $(this.template);
        this.attachHtmlEvents();
        dwebCompiler.compile(this.$el[0], this, this.signal);
        this.$contentEl = this.$containerEl.children(".dweb-content");
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
    getComponentByName(name) {
        return Util.find(this.components, component => name === component.get("name"));
    }
    dispose() {
        Util.each(this.components, component => component.dispose());
        this.trigger("onDisposed", this);
        this.disposed = true;
    }
}