import { dependencyImports } from "./PreserveExportsPlugin";
import { preserveModuleName } from "./PreserveModuleNamePlugin";
import * as webpack from 'webpack';
import { resolve } from 'path';
import { DependencyOptions, ReferencedExport } from "./interfaces";

export class IncludeDependency extends webpack.dependencies.ModuleDependency {
  protected options?: DependencyOptions;

  constructor(request: string, options?: DependencyOptions) {
    let chunk = options && options.chunk;
    super(chunk ? `async?lazy&name=${chunk}!${request}` : request);
    this.options = options;
  }

  // @ts-expect-error
  get type() {
    return IncludeDependency.name;
  }

  getReferencedExports(moduleGraph: webpack.ModuleGraph): (string[] | ReferencedExport)[] {
    // when there's no specific exports are targetted,
    // passing an empty array means preserving all
    return [{ name: this.options?.exports ?? [], canMangle: false }]
  }

  serialize() {
    throw webpack.util.serialization.NOT_SERIALIZABLE;
  }

  deserialize() {
    throw webpack.util.serialization.NOT_SERIALIZABLE;
  }

  get [preserveModuleName]() {
    return true;
  }

  get [dependencyImports]() {
    return this.options?.exports;
  }
};

export type NullDependencyTemplate = typeof webpack.dependencies.NullDependency.Template;
export const Template: NullDependencyTemplate = webpack.dependencies.NullDependency.Template;

webpack.util.serialization.register(
  IncludeDependency,
  resolve(__dirname, 'IncludeDependency'),
  null as unknown as string,
  {
    serialize() {
      throw webpack.util.serialization.NOT_SERIALIZABLE;
    },
    deserialize() {
      throw webpack.util.serialization.NOT_SERIALIZABLE;
    },
  }
);
