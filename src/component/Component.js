import Data from "../data/Data";
import Util from "../util/Util";
import Log from "../util/Log";
import Watcher from "../util/Watcher";

export default class Component extends Data {
    constructor() {
        super();
        this.__bindHtmlEvents = {};
        this.__models = {};
        this.__properties = {};
    }

    isMonted() {
        return this.$el && this.$el.parents("body").length;
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
        let disabled = this.get("disabled");
        if (disabled === "true" || disabled === true) {
            return true;
        }
        const parent = this.getParent();
        if (parent) {
            return this.parent.isDisabled();
        } else {
            return false;
        }
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
        return model;
    }
    setModel(name, model) {
        this.__models[name] = model;
    }
    setProperties(properties) {
        Util.each(properties, (prop, propName) => {
            if (this.__properties[propName]) {
                this.__properties[propName].destroy();
            }
            const propSplit = prop.split(".");
            this.__properties[propName] = Watcher.createWatcher(this, propName, this.getModel(propSplit[0]), propSplit[1]);
        });
    }
    removeProperties(propNames) {
        Util.each(propNames, name => {
            if (this.__properties[name]) {
                this.__properties[name].destroy();
                delete this.__properties[name];
            }
        });
    }
}