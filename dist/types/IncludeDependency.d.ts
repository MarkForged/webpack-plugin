import { dependencyImports } from "./PreserveExportsPlugin";
import { preserveModuleName } from "./PreserveModuleNamePlugin";
import * as webpack from 'webpack';
import { DependencyOptions, ReferencedExport } from "./interfaces";
export declare class IncludeDependency extends webpack.dependencies.ModuleDependency {
    protected options?: DependencyOptions;
    constructor(request: string, options?: DependencyOptions);
    get type(): string;
    getReferencedExports(moduleGraph: webpack.ModuleGraph): (string[] | ReferencedExport)[];
    serialize(): void;
    deserialize(): void;
    get [preserveModuleName](): boolean;
    get [dependencyImports](): string[] | undefined;
}
export declare type NullDependencyTemplate = typeof webpack.dependencies.NullDependency.Template;
export declare const Template: NullDependencyTemplate;
