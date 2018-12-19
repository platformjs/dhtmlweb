import Util from "./Util";

const watcherStore = {};
if (window) {
    window.dhtmlwebWatcherStore = watcherStore;
}

class Watcher {
    constructor(obj, objName, target, targetName, equal) {
        this.obj = obj;
        this.target = target;
        this.objName = objName;
        this.targetName = targetName || objName;
        this.equal = equal || function(left, right) {
            return left === right;
        };
        obj.set(this.objName, target.get(this.targetName));
        this.objBindTag = this.obj.bind("changed", obj => this.onObjChanged(obj));
        this.targetBindTag = this.target.bind("changed", target => this.onTargetChanged(target));
    }

    onObjChanged(obj) {
        const value = obj.get(this.objName);
        if (!this.isEqual(value, this.target.get(this.targetName))) {
            this.target.set(this.targetName, value);
        }
    }
    onTargetChanged(target) {
        const value = target.get(this.targetName);
        if (!this.isEqual(value, this.obj.get(this.objName))) {
            this.obj.set(this.objName, value);
        }
    }

    isEqual(left, right) {
        return this.equal(left, right);
    }

    destroy() {
        this.obj.unbind(this.objBindTag);
        this.target.unbind(this.targetBindTag);
        delete watcherStore[this.__id];
    }
}

export default {
    createWatcher(obj, objName, target, targetName, equal) {
        const watcher = new Watcher(...arguments);
        watcher.__id = `${objName}:${targetName || objName}:${Util.guid()}`;
        watcherStore[watcher.__id] = watcher;
        return watcher;
    }
}