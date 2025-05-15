import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    // 配置入口文件，指定需要打包的模块
    entries: ["src/app",],
    rollup: {
        // 启用 CommonJS 格式输出
        emitCJS: true,
        // esbuild: {
        //     minify: true, // 开启代码压缩
        // },
    },
    // 生成 TypeScript 类型声明文件
    declaration: true,
    // 在构建前清理输出目录
    clean: true,
    // 构建过程中忽略警告，不因警告导致构建失败
    failOnWarn: false,
});