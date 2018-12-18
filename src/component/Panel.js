import Composite from "./Composite";

export default class Panel extends Composite{
    constructor() {
        super();
        this.set({
            title: "Untitled Panel"
        });
        this.template = `
        <div class="panel panel-default" w-attr="id disabled:isDisabled()">
            <div class="panel-heading">
                <h3 class="panel-title" 
                    w-html="title"></h3>
            </div>
            <div class="panel-body">
                <div></div>
            </div>
        </div>`;
    }
}