import Data from "../data/Data";
import Util from "../util/Util";
import Log from "../util/Log";

export default class Component extends Data {
    constructor() {
        super();
        this.__bindHtmlEvents = {};
        this.__models = {};
    }

    isMonted() {
        return this.$el && this.$el.parents("body").length;
    }
    
    getModel(name) {
        return this.view.getModel(name);
    }

    /**
     * 
     * @param {string} name 
     * @param {function} call 
     * @param {object} context 
     * @returns string
     */
    bind(name, call, context) {
        const eventTag = super.bind(name, call, context);
        //make sure this event is defined for this component
        if (Util.startWith(name, "html.")) {
            this.__bindHtmlEvents[name] = true;
            if (this.$el) {
                this.$el.on(name.split(".")[1], (evt) => {
                    if (!this.isDisabled()) {
                        return this.trigger(name, this, evt);
                    }
                });
            }
        }
        return eventTag;
    }

    attachHtmlEvents() {
        const events = this.internalHtmlEvents || {};
        Util.each(events, (fn, target) => {
            target = target.split(" ");
            const eventName = target.shift();
            const styleSelector = target.join(" ");
            this.$el.on(eventName, styleSelector, (evt) => {
                if (!this.isDisabled()) {
                    (typeof fn === "function" ? fu : this[fn]).call(this, evt);
                }
            });
        });
        Util.each(this.__bindHtmlEvents, (bind, name) => {
            if (bind) {
                this.$el.on(name.split(".")[1], (evt) => {
                    return this.trigger(name, this, evt);
                });
            }
        });
    }

    isDisabled() {
        if (!this.get("disabled")) {
            const parent = this.getParent();
            if (parent) {
                return this.parent.isDisabled();
            } else {
                return false;
            }
        }
        return true;
    }

    render() {
        this.trigger("beforeComponentRender", this);
        this.$el = $(this.template);
        dwebCompiler.compile(this.$el[0], this, this.signal);
        this.attachHtmlEvents();
        return this;
    }
    getParent() {
        return this.parent;
    }
    setParent(parent) {
        this.parent = parent;
    }
    getModel(name) {
        const model = this.__models[name];
        if (!model) {
            const parent = this.getParent();
            if (parent) {
                return parent.getModel(name);
            }
        }
    }
    setModel(name, model) {
        this.__models[name] = model;
    }
}