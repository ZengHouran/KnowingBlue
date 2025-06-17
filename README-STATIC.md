# Orangery Ventures - 静态网站版本

这是 Orangery Ventures 网站的静态版本，已经转换为可以直接在浏览器中运行的单页面应用，适合 GitHub Pages 托管。

## 特性

- ✅ 无需服务器端处理
- ✅ 双击 `index.html` 即可在浏览器中运行
- ✅ 适合 GitHub Pages 托管
- ✅ 保持原有的视觉效果和交互功能
- ✅ 响应式设计，支持移动端
- ✅ 平滑滚动导航
- ✅ 滚动动画效果
- ✅ 移动端菜单

## 使用方法

### 本地运行
1. 直接双击 `index.html` 文件
2. 或者在浏览器中打开 `index.html` 文件

### GitHub Pages 部署

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 文件夹
5. 保存设置，GitHub Pages 会自动部署网站

## 技术栈

- **HTML5**: 语义化标记
- **Tailwind CSS**: 通过 CDN 引入，提供现代化样式
- **Vanilla JavaScript**: 原生 JavaScript 实现交互功能
- **CSS3**: 自定义动画和过渡效果

## 主要功能

### 导航
- 固定顶部导航栏
- 滚动时导航栏样式变化
- 平滑滚动到页面各个部分
- 移动端响应式菜单

### 动画
- 滚动触发的淡入动画
- 延迟动画效果
- 平滑的过渡效果

### 响应式设计
- 桌面端和移动端适配
- 灵活的网格布局
- 适应不同屏幕尺寸

## 文件结构

```
├── index.html          # 主页面文件（包含所有内容）
├── public/             # 静态资源文件夹
│   ├── og-image.png    # Open Graph 图片
│   └── lovable-uploads/ # 网站图片资源
└── README-STATIC.md    # 本说明文件
```

## 自定义修改

### 修改内容
直接编辑 `index.html` 文件中的文本内容即可。

### 修改样式
- 主要样式通过 Tailwind CSS 类名控制
- 自定义样式在 `<style>` 标签中定义
- 颜色主题在 `tailwind.config` 中配置

### 修改图片
将新图片放入 `public/` 文件夹，并更新 HTML 中的图片路径。

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 注意事项

1. 确保所有图片资源都在 `public/` 文件夹中
2. 图片路径使用相对路径（如 `./public/image.png`）
3. 如果需要修改样式，建议了解 Tailwind CSS 的使用方法
4. 部署到 GitHub Pages 时，确保仓库是公开的（除非使用 GitHub Pro）

## 性能优化

- 使用 CDN 加载 Tailwind CSS
- 图片采用适当的格式和大小
- 最小化 JavaScript 代码
- 利用浏览器缓存

## 联系方式

如有问题或需要技术支持，请联系：hello@orangeryventures.com