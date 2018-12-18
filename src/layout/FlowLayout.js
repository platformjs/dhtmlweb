import Util from "../util/Util";
import Layout from "./Layout";

export default class FlowLayout extends Layout{
    layout(container) {
        
    }
    renderComponents(container) {
        Util.each(container.components, component => {
            container.$contentEl.append(component.render().$el);
        });
    }
}