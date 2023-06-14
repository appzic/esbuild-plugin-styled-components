import { readFile } from "node:fs/promises";

import styled from "babel-plugin-styled-components";
import { transformAsync } from "@babel/core";
import { type ParserPlugin } from "@babel/parser";
import { type Plugin } from "esbuild";

// https://styled-components.com/docs/tooling#usage
interface Options {
    filter?: string | RegExp;
    ssr?: boolean,
    displayName?: boolean,
    fileName?: boolean,
    meaninglessFileNames?: string[],
    minify?: boolean,
    transpileTemplateLiterals?: boolean,
    pure?: boolean,
    topLevelImportPaths?: string[];
}

const esbuildPluginStyledComponents = ({
    filter = "\\.[tj]sx$",
    ssr = false,
    displayName = false,
    fileName = false,
    meaninglessFileNames = [],
    minify = true,
    transpileTemplateLiterals = false,
    pure = false,
    topLevelImportPaths = [],
}: Options): Plugin => {

    return {
        name: "styled-components",
        setup({ onLoad, initialOptions }) {
            const root = process.cwd();
            onLoad({ filter: new RegExp(filter) }, async (args) => {
                // Read in the file
                const code = await readFile(args.path, "utf8");

                // Determine plugins to use
                const plugins = [
                    "importMeta",
                    "topLevelAwait",
                    "classProperties",
                    "classPrivateProperties",
                    "classPrivateMethods",
                ] as ParserPlugin[];
                const isJsx = /\.[tj]sx$/.test(args.path);
                if (isJsx) plugins.push("jsx");
                const isTs = /\.tsx?$/.test(args.path);
                if (isTs) plugins.push("typescript");

                // Run the code through babel
                const map = initialOptions.sourcemap !== false;
                const result = await transformAsync(code, {
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
                        topLevelImportPaths,
                    }]],
                    sourceMaps: map,
                });

                // If babel fails to return, throw an error
                if (!result)
                    throw new Error(`Babel transformation failed for ${args.path}`);

                // Return the transformed code to esbuild
                return {
                    contents: result.code + (result.map && map
                        ? `//# sourceMappingURL=data:application/json;base64,${Buffer.from(JSON.stringify(result.map)).toString("base64")}`
                        : ""),
                    loader: `${isTs ? "ts" : "js"}${isJsx ? "x" : ""}`,
                };
            });
        },
    };
}

export default esbuildPluginStyledComponents;

