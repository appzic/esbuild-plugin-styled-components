import babel from "@babel/core";
import styled from "babel-plugin-styled-components";
import fs from "node:fs";
import { ParserPlugin } from "@babel/parser/typings/babel-parser"

// https://styled-components.com/docs/tooling#usage
interface Options {
    ssr?: boolean,
    displayName?: boolean,
    fileName?: boolean,
    meaninglessFileNames?: Array<string>,
    minify?: boolean,
    transpileTemplateLiterals?: boolean,
    pure?: boolean,
}

const esbuildPluginStyledComponents = ({
    ssr = false,
    displayName = false,
    fileName = false,
    meaninglessFileNames = [],
    minify = true,
    transpileTemplateLiterals = false,
    pure = false,
}: Options) => {

    return {
        name: "styled-components",
        setup({ onLoad }) {
            const root = process.cwd();
            onLoad({ filter: /\.[tj]sx$/ }, async (args) => {
                let code = await fs.promises.readFile(args.path, "utf8");
                let plugins = [
                    "importMeta",
                    "topLevelAwait",
                    "classProperties",
                    "classPrivateProperties",
                    "classPrivateMethods",
                    "jsx",
                ] as Array<ParserPlugin>;
                let loader = "jsx";
                if (args.path.endsWith(".tsx")) {
                    plugins.push("typescript");
                    loader = "tsx";
                }
                const result = await babel.transformAsync(code, {
                    babelrc: false,
                    configFile: false,
                    ast: false,
                    root,
                    filename: args.path,
                    parserOpts: {
                        sourceType: "module",
                        allowAwaitOutsideFunction: true,
                        plugins,
                    },
                    generatorOpts: {
                        decoratorsBeforeExport: true,
                    },
                    plugins: [[styled, {
                        ssr,
                        displayName,
                        fileName,
                        meaninglessFileNames,
                        minify,
                        transpileTemplateLiterals,
                        pure,
                    }]],
                    sourceMaps: false,
                });
                return {
                    contents:
                        result.code +
                        `//# sourceMappingURL=data:application/json;base64,` +
                        Buffer.from(JSON.stringify(result.map)).toString("base64"),
                    loader,
                };
            });
        },
    };
}

export default esbuildPluginStyledComponents;

