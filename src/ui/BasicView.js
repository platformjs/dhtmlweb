export default class BasicView {
    constructor(props) {
        this.__attributes = {};
        for (let p in props) {
            this.__attributes[p] = props[p];
        }
        this.__propertyChangedActions = [];
        this.__propertyChangedActions.props = {};
        this.propertyChangedActions = {};
    }
    set(name, value) {
        const obj = typeof name === "string" ? {[name]: value} : name;
        for (let p in obj) {
            this.__attributes[p] = obj[p];
        }
        this.executeActions();
    }
    get(name) {
        return this.__attributes[name];
    }
    executeActions() {
        clearTimeout(this.__executeActionsTimeoutHandler);
        this.__executeActionsTimeoutHandler = setTimeout(() => {
            let actions = [];
            for (let i = 0, n = this.__propertyChangedActions.length; i < n; i++) {
                actions.push(this.__propertyChangedActions[i]);
            }
            this.__getSubActions(actions);
            actions = this.__uniq(actions);
            for (let i = 0, n = actions.length; i < n; i++) {
                actions[i]();
            }
        }, 1);
    }
    render() {
        this.__preProcessPropertyChangedActions();
        this.$el = $(this.template);
        this.executeActions();
        return this;
    }
    __register(actions, propNames) {
        actions = typeof actions === "function" ? [actions] : actions;
        const names = propNames ? propNames.split(",") : [];
        if (names.length) {
            for (let i = 0, n = names.length; i < n; i++) {
                const name = names[i];
                this.__propertyChangedActions.props[name] = this.__propertyChangedActions.props[name] || [];
                this.__addActions(this.__propertyChangedActions.props[name], actions);
            }
        } else {
            this.__addActions(this.__propertyChangedActions, actions);
        }
    }
    __addActions(bucket, actions) {
        for (let i = 0, n = actions.length; i < n; i++) {
            bucket.push(actions[i]);
        }
    }
    __uniq(actions) {
        return actions;
    }
    __getSubActions(actions) {
        for (let name in this.__propertyChangedActions.props) {
            actions.splice(actions.length, 0, ...this.__propertyChangedActions.props[name]);
        }
    }
    __preProcessPropertyChangedActions() {
        for (let p in this.propertyChangedActions) {
            this.__register(this.propertyChangedActions[p], p);
        }
    }
}