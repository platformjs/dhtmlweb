import Util from "../util/Util";

export default {
    create(parent, meta) {
        const Clazz = this.getClassFromPath(meta.attr.clazz);
        const obj = new Clazz();
        parent.addComponents(obj);
        $.extend(true, obj.props);
        Util.each(meta.attr, (value, key) => {
            if (Util.startWith(value, "{{") && Util.endWith(value, "}}")) {
                obj.setProperties({
                    [key]: value.substring(2, value.length - 2)
                });
            } else {
                obj.set({
                    [key]: value
                });
            }
        });
        //TODO what's this?
        obj.style = meta.style;
        
        if (meta.attr.extend) {
            const extendObj = this.getClassFromPath(meta.attr.extend);
            Util.each(extendObj.events || {}, (call, name) => {
                obj.bind(name, call);
            });
            Util.each(extendObj.functions || {}, (call, name) => {
                obj[name] = call;
            });
        }

        if (meta.layout) {
            const layoutClazz = meta.layout.clazz || "dweb.layout.FlowLayout";
            const Layout = this.getClassFromPath(layoutClazz);
            obj.setLayout(new Layout(meta.layout.attr || {}));
        }
        
        if (meta.components) {
            meta.components.forEach(componentMeta => {
                this.create(obj, componentMeta)
            });
        }
        return obj;
    },

    getClassFromPath(path) {
        const names = path.split(".");
        if (names.length === 0) {
            throw new Error(`Path is empty`);
        }
        let target = window;
        names.forEach(name => {
            target = target[name];
            if (!target) {
                throw new Error(`Can't find class by path [${path}]`)
            }
        });
        return target;
    }
}