import Container from "./Container";
import Util from "../util/Util";

export default class Form extends Container {
    constructor() {
        super();
        this.template = `
            <form w-attr="id disabled:isDisabled()"><div></div></form>
        `;
    }
}