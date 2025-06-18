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

## 📁 项目文件结构

```
├── index.html          # 主页面文件（包含所有内容）
├── public/             # 静态资源文件夹
│   ├── og-image.png    # Open Graph 图片
│   └── lovable-uploads/ # 网站图片资源
├── CNAME              # GitHub Pages 域名配置
└── README.md          # 本说明文件
```

## 自定义修改

### 📝 修改网站文字内容（小白指南）

如果你想修改网站上显示的文字内容，直接编辑 `index.html` 文件中的文本内容即可。

#### 📋 修改步骤：
1. 打开 `index.html` 文件
2. 找到要修改的文字内容
3. 直接修改文字内容
4. 保存文件
5. 在浏览器中打开查看效果

#### ⚠️ 注意事项：
- 不要删除 HTML 标签（如 `<h1>`, `<p>` 等）
- 保持代码格式整齐
- 修改后测试网站是否正常显示

### 🎨 修改样式
- 主要样式通过 Tailwind CSS 类名控制
- 自定义样式在 `<style>` 标签中定义
- 颜色主题在 `index.html` 文件的 `tailwind.config` 部分配置

### 🖼️ 修改图片
将新图片放入 `public/lovable-uploads/` 文件夹，并更新组件文件中的图片路径。

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

## 🚀 快速开始

### 本地运行
1. **下载项目**
   - 直接下载 ZIP 文件并解压
   - 或者使用 Git 克隆：`git clone [项目地址]`

2. **打开网站**
   - 双击 `index.html` 文件
   - 或者在浏览器中打开 `index.html` 文件

## ❓ 常见问题解答

### Q: 我是完全的编程小白，应该如何开始？
A: 建议先学习基础的 HTML 和 CSS 知识，然后：
1. 下载并安装 VS Code 编辑器
2. 学习如何使用 Git 和 GitHub
3. 从修改简单的文字内容开始
4. 逐步学习更多 Web 开发知识

### Q: 修改文字后网站没有变化怎么办？
A: 检查以下几点：
1. 确保保存了文件（Ctrl+S 或 Cmd+S）
2. 刷新浏览器页面（F5 或 Ctrl+R）
3. 查看浏览器控制台是否有错误信息

### Q: 如何修改网站的颜色主题？
A: 颜色主题在 `index.html` 文件的 `tailwind.config` 部分定义，找到 `colors` 部分进行修改。

### Q: 如何添加新的页面？
A: 由于这是单页面应用，建议在 `index.html` 中添加新的章节，并更新导航菜单链接。

### Q: 图片不显示怎么办？
A: 
1. 确保图片文件在 `public/lovable-uploads/` 文件夹中
2. 检查图片路径是否正确
3. 确保图片文件名没有特殊字符或空格

### Q: 如何备份我的修改？
A: 
1. 使用 Git 进行版本控制：`git add .` → `git commit -m "描述修改内容"`
2. 推送到 GitHub：`git push`
3. 定期下载项目文件作为备份

## 📚 学习资源

- [HTML 基础教程](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [CSS 基础教程](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [VS Code 使用指南](https://code.visualstudio.com/docs)
- [Git 基础教程](https://git-scm.com/book/zh/v2)

## 📞 联系方式

如有问题或需要技术支持，请联系：hello@orangeryventures.com

---

**提示**: 如果你是编程新手，建议先从修改简单的文字内容开始，逐步学习更复杂的功能。记住，每次修改前都要备份文件！