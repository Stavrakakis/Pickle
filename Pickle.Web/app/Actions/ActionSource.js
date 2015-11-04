var Action = (function () {
    function Action(source) {
        this._source = source;
    }
    Object.defineProperty(Action.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    return Action;
})();
var Action;
(function (Action) {
    (function (Source) {
        Source[Source["View"] = 0] = "View";
        Source[Source["Server"] = 1] = "Server";
    })(Action.Source || (Action.Source = {}));
    var Source = Action.Source;
})(Action || (Action = {}));
module.exports = Action;
//# sourceMappingURL=Action.js.map