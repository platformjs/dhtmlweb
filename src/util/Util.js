
import ErrorMessage from "./ErrorMessage";
import Log from "./Log";

export default {
    reduce(str, leftCount, rightCount) {
        if (typeof str !== "string") {
            throw new Error("Not supported to be reduced");
        }
        leftCount = leftCount || 0;
        rightCount = rightCount || 0;
        return str.substring(leftCount, str.length - rightCount);
    },
    startWith(str, prefix) {
        Log.debug("startWith", str, prefix);
        if (typeof str === "string") {
            return str.indexOf(prefix) === 0;
        }
        return false;
    },
    endWith(str, suffix) {
        Log.debug("endWith", str, suffix);
        if (typeof str === "string") {
            return str.split("").reverse().join("").indexOf(suffix.split("").reverse().join("")) === 0;
        }
        return false;
    },
    each(collection, callback) {
        Log.debug("each", ...arguments);
        callback = callback || function() {};
        if (Array.isArray(collection)) {
            for (let i = 0, n = collection.length; i < n; i++) {
                const continuing = callback(collection[i], i, collection);
                if (continuing === false) {
                    break;
                }
            }
        } else {
            const hash = collection;
            for (let p in hash) {
                const continuing = callback(hash[p], p, hash);
                if (continuing === false) {
                    break;
                }
            }
        }
    },
    eachRight(collection, callback) {
        Log.debug("eachRight", ...arguments);
        callback = callback || function() {};
        const n = collection.length;
        for (let i = n - 1; i >= 0; i--) {
            const continuing = callback(collection[i], i, collection);
            if (continuing === false) {
                break;
            }
        }
    },
    toHash(collection, id) {
        Log.debug("toHash", ...arguments);
        const hash = {};
        for (let i = 0, n = collection.length; i < n; i++) {
            const item = collection[i];
            if (typeof id === "function") {
                hash[id(item)] = item;
            } else {
                hash[item[id]] = item;
            }
        }
        return hash;
    },
    insert(collection, items, index) {
        Log.debug("insert", ...arguments);
        if (!Array.isArray(items)) {
            items = [items];
        }
        if (isNaN(index) || index === null || index === undefined || index === collection.length) {
            this.each(items, item => {
                collection.push(item);
            });
        } else if (index === 0) {
            this.eachRight(items, item => {
                collection.unshift(item);
            });
        } else if (index > collection.length) {
            throw new Error(ErrorMessage.OUT_OF_BOUND);
        } else {
            collection.splice(index, 0, ...items);
        }
    },
    equal(left, right, operator) {
        operator = operator || "==";
        if (operator == "===") {
            return left === right;
        } else {
            if (left === null || right === null) {
                return left == right;
            } 
            if (left === undefined || right === undefined) {
                return left == right;
            }
            if (typeof left === "object") {
                if (typeof right === "object") {
                    return JSON.stringify(left) == JSON.stringify(right);
                } else {
                    return false;
                }
            } else if (typeof right === "object") {
                if (typeof left === "object") {
                    return JSON.stringify(left) == JSON.stringify(right);
                } else {
                    return false;
                }
            } else {
                return left == right;
            }
        }
    },
    guid() {
        let d = new Date().getTime();
        const id = "aaaaaaaa-aaaa-aaaa-baaa-aaaaaaaaaaaa".replace(/[ab]/g, function(c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "a" ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return id;
    },
    remove(collection, index) {
        if (index === null || index === undefined || isNaN(index) || index < 0 || index >= collection.length) {
            throw new Error("incorrect index for remove: ", index, collection);
        } else {
            collection.splice(index, 1);
        }
    },
    find(collection, call) {
        let foundObject;
        this.each(collection, item => {
            if (call(item)) {
                foundObject = item;
                //break the loop
                return false;
            }
        });
        return foundObject;
    },
    isArray(value) {
        return Array.isArray(value);
    },
    isPlainObject(value) {
        return value && typeof value === "string";
    },
    isString(value) {
        return typeof vlaue === "string";
    },
    isUndefined(value) {
        return typeof value === "undefined";
    },
    isNull(value) {
        return !value && typeof null === "object";
    }
}