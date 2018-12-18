import Component from "./Component";
import Util from "../util/Util";
import Log from "../util/Log";

export default class Select extends Component {
    constructor() {
        super();
        this.set({
            text: "null",
            value: "null"
        });
        this.template = `
        <div class="dweb-select" w-attr="id disabled:isDisabled()">
            <div class="dweb-select-current" w-text="text"></div>
            <div class="dweb-select-options">
                Loading...
            </div>
        </div>
        `;
        this.internalHtmlEvents = {
            "click .dweb-select-current": "__openSelect",
            "click .dweb-select-options .option": "__clickOption"
        };
    }

    setData(data) {
        this.data = data || [];
    }

    render() {
        super.render();
        this.trigger("afterSelectRendered", this);
        return this;
    }

    hideOptions() {
        this.__getOptionsEl().hide();
    }

    __openSelect() {
        if (this.__getOptionsEl().css("display") !== "none") {
            return;
        }
        setTimeout(() => {
            $("body").one("click", (evt) => {
                this.hideOptions();
            });
        }, 100);
        this.trigger("beforeSelectOpen", this);
        if (!this.data) {
            throw new Error(`The select data is undefined. it can set data by calling setData in events [beforeSelectOpen] or [beforeComponentRender].
                the data can be an array of object or a promise which resolves an array.`);
        } else if (typeof this.data === "function") {
            this.__showLoading();
            this.data().then((data) => {
                this.data = this.__transform(data);
                this.__showData(this.data);
            }, () => {
                Log.warn("Failed to get data for select dropdown!");
                this.__showError();
            });
        } else {
            this.data = this.__transform(this.data);
            this.__showData(this.data);
        }
    }

    __transform(data) {
        Util.each(data, (item, index) => {
            if (typeof item === "string") {
                data[index] = {
                    text: item,
                    value: item
                };
            }
        });
        return data;
    }

    __showLoading() {
        this.__getOptionsEl().html("Loading...").show();
        this.__adjustPositionAndSize();
    }
    __showError() {
        this.__getOptionsEl().html("Failed to get data...");
        this.__adjustPositionAndSize();
    }
    __showData(data) {
        const options = [];
        Util.each(data, item => {
            options.push(`<div class="option ${item.value === this.get("value") ? "selected" : ""}">${item.text || item.value}</div>`);
        });
        this.__getOptionsEl().html(options.join("")).show();
        this.__adjustPositionAndSize();
    }
    __getOptionsEl() {
        return this.$el.find(".dweb-select-options");
    }

    __clickOption(evt) {
        const $option = $(evt.target);
        this.hideOptions();
        const index = $option.index();
        const item = this.data[index];
        if (item.value == this.get("value")) {
            return;
        }
        this.set({
            value: item.value,
            text: item.text
        });
        this.trigger("afterOptionSelected", this);
    }

    __adjustPositionAndSize() {
        this.__getOptionsEl().width(this.$el.width() - 2);
    }

    destroy() {

    }
}