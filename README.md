![esbuild-plugin-styled-components-cover](https://github.com/appzic/esbuild-plugin-styled-components/assets/64678612/235d077d-cf05-4e84-8924-28ca5ba2075c)

<h1 align=center>esbuild plugin for styled components</h1>

<p align="center" style="align: center;">
    <a href="https://www.npmjs.com/package/esbuild-plugin-styled-components">
        <img alt="npm" src="https://img.shields.io/npm/v/esbuild-plugin-styled-components">
    </a>
    <a href="https://www.npmjs.com/package/esbuild-plugin-styled-components">
        <img alt="npm" src="https://img.shields.io/npm/dw/esbuild-plugin-styled-components">
    </a>
    <a href="https://github.com/appzic/esbuild-plugin-styled-components/blob/main/LICENSE">
        <img alt="GitHub" src="https://img.shields.io/github/license/appzic/esbuild-plugin-styled-components">
    </a>
</p>


## How to Install
```bash
npm install -D esbuild-plugin-styled-components
```

## How to Use
`esbuild.config.js`
```js
import * as esbuild from 'esbuild';
import styledComponentsPlugin from "esbuild-plugin-styled-components";

await esbuild.build({
    ...
    plugins: [
        styledComponentsPlugin({
            // filter: "\\.[tj]sx?$";              <-- Optional, type = string | RegExp
            // ssr: true;                          <-- Optional, type = boolean
            // displayName: false;                 <-- Optional, type = boolean
            // fileName: false;                    <-- Optional, type = boolean
            // meaninglessFileNames: [];           <-- Optional, type = string[]
            // minify: true;                       <-- Optional, type = boolean
            // transpileTemplateLiterals: false;   <-- Optional, type = boolean
            // pure: false;                        <-- Optional, type = boolean
            // topLevelImportPaths: [];            <-- Optional, type = string[]
            // namespace: undefined;               <-- Optional, type = string
        })
    ],
    ...
})
```

More details about options https://styled-components.com/docs/tooling

## Contributing

We welcome contributions from the community! Please take a look at our [CONTRIBUTING.md](CONTRIBUTING.md) file for more information on how to get started. We appreciate all kinds of contributions, from bug reports and feature requests to code contributions and documentation improvements. Thank you for considering contributing to our project!

## Contributors

<a href="https://github.com/appzic/esbuild-plugin-styled-components/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=appzic/esbuild-plugin-styled-components" />
</a>

## License

Licensed under the [MIT](LICENSE) License.
