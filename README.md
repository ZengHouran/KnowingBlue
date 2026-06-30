# KnowingBlue

KnowingBlue 官网已经迁移为 Vue 3 + Vite 项目，适合部署到 GitHub Pages，并保留自定义域名 `www.knowingblue.com`。

## 技术栈

- Vue 3
- Vite
- 原生 CSS

## 本地开发

```bash
npm install
npm run dev
```

启动后访问终端里显示的本地地址。

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/`。Vite 会自动把 `public/` 中的静态资源复制到 `dist/`，包括：

- `CNAME`
- `404.html`
- 图片、音乐、favicon 等资源

## GitHub Pages 部署

如果仓库使用 GitHub Actions 部署，推荐发布 `dist/` 目录。当前项目中的 Pages workflow 已经按这个方式配置：

1. 安装依赖：`npm ci`
2. 构建项目：`npm run build`
3. 上传并发布：`dist/`

如果使用 GitHub Pages 的 branch/root 方式，则需要先本地构建，再将 `dist/` 的内容发布到 Pages 对应分支。

## 路由说明

项目使用 Vue 应用内的 history 路由：

- `/` 首页
- `/vision` 愿景页

`public/404.html` 用于 GitHub Pages 刷新深层路由时回跳到 Vue 应用。`public/vision.html` 会在构建后输出为 `/vision.html`，自动跳转到 `/vision`，用于兼容旧链接。

## 内容修改

- 页面、导航、多语言和音乐播放器：`src/App.vue`
- 全局样式：`src/styles.css`
- 静态资源：`public/`
