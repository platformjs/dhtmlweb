import Event from "../Event";
import Util from "../util/Util";
import Log from "../util/Log";

export default class Data extends Event {
    constructor(data) {
        super();
        this.props = {
            id: Util.guid()
        };
        this.set(data, true);
        this.signal = new dwebCompiler.Signal();
    }

    set(obj, silent) {
        Log.debug("set", this, obj);
        if (typeof obj === "string") {
            obj = {
                [obj]: silent
            };
            silent = arguments[2];
        }
        let changed = false;
        Util.each(obj, (value, key) => {
            if (!Util.equal(this.props[key], value)) {
                this.props[key] = value;
                changed = true;
            }
        });
        if (!silent && changed) {
            this.signal.beep();
            this.trigger("changed", this);
        }
    }

    //only support below parameter style
    /**
     * 
     * @param {string} name 
     * @example "user.address.apt" only support this format
     */
    get(name) {
        const names = name.split(".");
        let value = this.props;
        while(names.length && value) {
            name = names.shift();
            value = value[name];
        }
        return value;
    }
}