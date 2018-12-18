import Util from "../util/Util";

export default {
    create(meta) {
        const Clazz = this.getClassFromPath(meta.attr.clazz);
        const obj = new Clazz();
        $.extend(true, obj.props, meta.attr);
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
                obj.addComponents(this.create(componentMeta));
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