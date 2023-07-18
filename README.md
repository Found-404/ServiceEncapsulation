# 介绍

这里主要用于放置业务中自己封装的组件

## 开始
```base
npm i

npm run start
```

### 清除node_modules
```bash
npm run clear
```


## 问题

### 1. 页面报错 `不支持src/之外的相对导入`

```bash
Module not found: Error: You attempted to import ../utils/http.js which fall

```
解除限制

如果项目中不存在 webpack.config.js 那么这个限制文件就存在于
`node_modules\react-scripts\config\webpack.config.js`

```js

...
   plugins: [
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(paths.appSrc, [
          paths.appPackageJson,
          reactRefreshRuntimeEntry,
          reactRefreshWebpackPluginRuntimeEntry,
          babelRuntimeEntry,
          babelRuntimeEntryHelpers,
          babelRuntimeRegenerator,
        ]),
      ],
...

```


>ModuleScopePlugin 这个插件功能是为了防止用户引入src目录之外的文件导致不可预期的结果。因此,如果不需要此类限制，可以将整个 ModuleScopePlugin 注释掉


```js

...
   plugins: [
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        // new ModuleScopePlugin(paths.appSrc, [
        //   paths.appPackageJson,
        //   reactRefreshRuntimeEntry,
        //   reactRefreshWebpackPluginRuntimeEntry,
        //   babelRuntimeEntry,
        //   babelRuntimeEntryHelpers,
        //   babelRuntimeRegenerator,
        // ]),
      ],
...

```



