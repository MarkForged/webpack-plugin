"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = exports.IncludeDependency = void 0;
const PreserveExportsPlugin_1 = require("./PreserveExportsPlugin");
const PreserveModuleNamePlugin_1 = require("./PreserveModuleNamePlugin");
const webpack = require("webpack");
const path_1 = require("path");
class IncludeDependency extends webpack.dependencies.ModuleDependency {
    constructor(request, options) {
        let chunk = options && options.chunk;
        super(chunk ? `async?lazy&name=${chunk}!${request}` : request);
        this.options = options;
    }
    // @ts-expect-error
    get type() {
        return IncludeDependency.name;
    }
    getReferencedExports(moduleGraph) {
        var _a, _b;
        // when there's no specific exports are targetted,
        // passing an empty array means preserving all
        return [{ name: (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.exports) !== null && _b !== void 0 ? _b : [], canMangle: false }];
    }
    serialize() {
        throw webpack.util.serialization.NOT_SERIALIZABLE;
    }
    deserialize() {
        throw webpack.util.serialization.NOT_SERIALIZABLE;
    }
    get [PreserveModuleNamePlugin_1.preserveModuleName]() {
        return true;
    }
    get [PreserveExportsPlugin_1.dependencyImports]() {
        var _a;
        return (_a = this.options) === null || _a === void 0 ? void 0 : _a.exports;
    }
}
exports.IncludeDependency = IncludeDependency;
;
exports.Template = webpack.dependencies.NullDependency.Template;
webpack.util.serialization.register(IncludeDependency, (0, path_1.resolve)(__dirname, 'IncludeDependency'), null, {
    serialize() {
        throw webpack.util.serialization.NOT_SERIALIZABLE;
    },
    deserialize() {
        throw webpack.util.serialization.NOT_SERIALIZABLE;
    },
});
