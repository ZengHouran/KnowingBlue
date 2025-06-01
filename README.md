# KnowingBlue Studio 官方网站

这是KnowingBlue工作室的官方网站源代码，采用简洁、优雅和艺术的设计风格，展示工作室的应用和理念。

## 特点

- 现代简约的设计风格
- 响应式布局，适配各种设备
- 流畅的动画和交互效果
- 优雅的蓝色主题

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, 动画)
- 原生JavaScript
- 响应式设计

## 网站结构

- **首页**: 工作室简介和视觉展示
- **应用**: 展示工作室开发的应用
- **理念**: 工作室的设计理念和价值观
- **联系**: 联系表单和联系信息

## 本地运行

由于这是一个纯静态网站，您可以直接在浏览器中打开`index.html`文件查看网站，或者使用任何静态文件服务器托管网站。

### 使用Python简易服务器

```bash
python -m http.server
```

然后在浏览器中访问 `http://localhost:8000`

### 使用Node.js服务器

首先安装http-server：

```bash
npm install -g http-server
```

然后运行：

```bash
http-server
```

访问 `http://localhost:8080`

## 自定义

### 修改颜色主题

网站的主色调定义在`styles.css`文件中，您可以修改以下CSS变量来更改网站的颜色方案：

```css
.blue {
    color: #1e3a8a; /* 修改这里的颜色代码 */
}
```

### 添加新应用

在`index.html`文件中的`.app-cards`部分添加新的应用卡片：

```html
<div class="app-card">
    <div class="app-icon"></div>
    <h3>新应用名称</h3>
    <p>新应用的描述文本。</p>
    <a href="#" class="btn-outline">了解更多</a>
</div>
```

## 贡献

欢迎提交问题和改进建议。如果您想为项目做出贡献，请遵循以下步骤：

1. Fork 这个仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可

[MIT](LICENSE)

## 联系

KnowingBlue Studio - info@knowingblue.com

项目链接: [https://github.com/yourusername/KnowingBlue](https://github.com/yourusername/KnowingBlue)