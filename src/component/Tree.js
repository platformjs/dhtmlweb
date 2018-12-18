import Component from "./Component";
import Util from "../util/Util";

export default class Tree extends Component {
    constructor() {
        super();
        this.collapsedClass = "collapsed glyphicon-expand";
        this.expandedClass = "expanded glyphicon-collapse-down";
        this.template = `<div class="dweb-tree tree-item" w-attr="id disabled:isDisabled()"><div class="tree-block"></div></div>`;
        this.bind("html.click", (tree, evt) => {
            const $target = $(evt.target);
            const $row = this.getTreeRowEl(evt);
            const rowId = $row.parent().attr("id");
            if ($target.hasClass("arrow")) {
                if ($target.hasClass("expanded")) {
                    this.collapse(rowId);
                } else {
                    this.expand(rowId);
                }
                return;
            }
            
            if (!$row.hasClass("selected")) {
                this.select(rowId);
            }
        });
    }

    setData(data) {
        this.data = data || {
            items: []
        }
    }

    render() {
        super.render();
        Util.each(this.data.items, item => {
            this.renderItem(this.$el, item, 0);
        });
        this.trigger("afterTreeRendered", this);
        return this;
    }

    renderItem($parent, item, level) {
        const $block = $parent.children(".tree-block");
        const $item = $(`<div class="tree-item" id="${item.id}">
            <div class="tree-row ${item.selected ? "selected" : ""}" style="padding-left:${level * 20}px">
                <span class="arrow glyphicon ${item.collapsed ? this.collapsedClass : this.expandedClass}" style="visibility:${item.items ? "visible" : "hidden"}"></span>
                <span class="tree-item-name">${item.name || item.id}</span>
            </div>
            <div class="tree-block" style="disaply:${item.collapsed ? "none" : "block"}"></div>
        </div>`);
        $block.append($item);
        if (item.items) {
            Util.each(item.items, subItem => {
                this.renderItem($item, subItem, level + 1);
            });
        }
    }
    select(id) {
        const row = this.getRowById(id);
        if (row.selected) {
            return;
        }
        this.__unselectOther();
        row.selected = true;
        if (this.isMonted()) {
            this.$el.find(".tree-row.selected").removeClass("selected");
            const $row = this.$el.find(`#${id}`).children(".tree-row");
            $row.addClass("selected");
        }
        this.trigger("afterSelected", this, id);
    }
    collapse(id) {
        const row = this.getRowById(id);
        if (row.collapsed) {
            return;
        }
        row.collapsed = true;
        if (this.isMonted()) {
            const $row = this.$el.find(`#${id}`).children(".tree-row");
            $row.children(".arrow").removeClass(this.expandedClass).addClass(this.collapsedClass);
            $row.next(".tree-block").first().hide();
        }
        this.trigger("afterCollapsed", this, id);
    }
    expand(id) {
        const row = this.getRowById(id);
        if (!row.collapsed) {
            return;
        }
        row.collapsed = false;
        if (this.isMonted()) {
            const $row = this.$el.find(`#${id}`).children(".tree-row");
            $row.children(".arrow").removeClass(this.collapsedClass).addClass(this.expandedClass);
            $row.next(".tree-block").first().show();
        }
        this.trigger("afterExpanded", this, id);
    }
    getTreeRowEl(evt) {
        let $target = $(evt.target);
        while($target.length) {
            if ($target.hasClass("tree-row")) {
                return $target;
            }
            $target = $target.parent();
        }
    }
    getRowById(id) {
        let items = [].concat(this.data.items);
        while(items.length) {
            const item = items.shift();
            if (item.id === id) {
                return item;
            }
            if (item.items) {
                items = items.concat(item.items);
            }
        }
    }
    addItem(parentId, data) {
        const row = this.getRowById(parentId);
        row.items.push(data);
        if (this.isMonted()) {
            const $parent = this.$el.find(`#${parentId}`);
            this.renderItem($parent, data, $parent.parents(".tree-item").length);
        }
    }
    __unselectOther() {
        let items = [].concat(this.data.items);
        while(items.length) {
            const item = items.shift();
            item.selected = false;
            if (item.items) {
                items = items.concat(item.items);
            }
        }
    }
}