export default class Layout {
    constructor(options) {
        this.options = options || {};
    }

    /**
     * render all the components of the container
     * @abstract
     * @return
     */
    renderComponents(container) {
        throw new Error('must be implemented by subclass!');
    }

    /**
     * clear all the components of the container
     * @abstract
     * @return
     */
    clearComponents(container) {
        throw new Error('must be implemented by subclass!');
    }

    /**
     * render new added component
     * @abstract
     * @return
     */
    addComponents(container, components, index) {
        throw new Error('must be implemented by subclass!');
    }

    /**
     * remove component
     * @abstract
     * @return
     */
    removeComponent(container, index) {
        throw new Error('must be implemented by subclass!');
    }

    /**
     * move component
     * @abstract
     * @return
     */
    moveComponent(container, component, fromIndex, toIndex) {
        throw new Error('must be implemented by subclass!');
    }
}