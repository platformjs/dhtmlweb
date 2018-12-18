export default class Watcher {
    constructor(obj, objName, target, targetName, equal) {
        this.obj = obj;
        this.target = target;
        this.objName = objName;
        this.targetName = targetName || objName;
        this.equal = equal || function(left, right) {
            return left === right;
        };

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
    }
}