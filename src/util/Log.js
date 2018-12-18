export default {
    debug: function() {
        if (window && window.console) {
           window.console.debug(...arguments);
        }
    },
    info: function() {
        if (window && window.console) {
            window.console.info(...arguments);
        }
    },
    warn: function() {
        if (window && window.console) {
            window.console.warn(...arguments);
        }
    },
    error: function() {
        if (window && window.console) {
            window.console.error(...arguments);
        }
    }
}