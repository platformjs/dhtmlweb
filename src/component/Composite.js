import Util from "../util/Util";
import FlowLayout from "../layout/FlowLayout";
import Container from "./Container";

export default class Composite extends Container {
    constructor() {
        super();
        this.template = null;
    }
    render() {
        this.$el = $(this.template);
        this.attachHtmlEvents();
        dwebCompiler.compile(this.$el[0], this, this.signal);
        this.$customEl = this.$el.children().eq(0);
        this.$containerEl = this.$el.children().eq(1);
        this.$contentEl = this.$containerEl.children().eq(0);
        this.getLayout().renderComponents(this);
        return this;
    }
    getContentSize() {
        throw new Error('must be implemented by subclass!');
    }
    getContainerSize() {
        throw new Error('must be implemented by subclass!');
    }
}