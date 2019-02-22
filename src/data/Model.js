export default class Model {
    constructor(data) {
        this.set(data, {silent: true});
    }
    set() {
        this.attributes = this.attributes || {};
    }
    get(path) {

    }
}