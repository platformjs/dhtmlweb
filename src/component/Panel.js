import Container from "./Container";

export default class Panel extends Container{
    constructor() {
        super();
        this.set({
            title: "Untitled Panel"
        });
        this.template = `
        <div class="dweb-component dweb-container dweb-panel panel panel-default" w-attr="id disabled:isDisabled() style class:styleClass">
            <div class="panel-heading">
                <h3 class="panel-title" 
                    w-html="title"></h3>
            </div>
            <div class="dweb-content panel-body">
            </div>
        </div>`;
    }
}