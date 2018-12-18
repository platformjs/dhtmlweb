import Util from "../util/Util";
import Layout from "./Layout";

export default class GridLayout extends Layout{
    layout(container) {
        
    }
    renderComponents(container) {
        const $table = $(`<table width="100%"></table>`);
        let $tr;
        Util.each(container.components, (component, index) => {
            if (index % this.options.numberOfColumn === 0) {
                $tr = $(`<tr></tr>`);
                $table.append($tr);
            }
            const $td = $('<td style="vertical-align:top"></td>');
            $td.append(component.render().$el);
            $tr.append($td);
        });
        container.$contentEl.html($table);
    }
    addComponents(container, components, index) {
        this.clearComponents(container);
        this.renderComponents(container);
    }
    removeComponent(container, index) {
        this.clearComponents(container);
        this.renderComponents(container);
    }
    clearComponents(container) {
        container.$contentEl.empty();
    }
}