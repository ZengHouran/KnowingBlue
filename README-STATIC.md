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

### React 开发版本结构
```
├── src/
│   ├── components/          # React 组件文件夹
│   │   ├── Hero.tsx        # 首页横幅组件
│   │   ├── About.tsx       # 关于我们组件
│   │   ├── Manifesto.tsx   # 投资理念组件
│   │   ├── InvestmentApproach.tsx  # 投资方式组件
│   │   ├── FoundersInSearch.tsx    # 目标创始人组件
│   │   ├── Community.tsx   # 社区媒体组件
│   │   ├── Header.tsx      # 导航栏组件
│   │   ├── Footer.tsx      # 页脚组件
│   │   └── animations/     # 动画组件
│   ├── pages/
│   │   └── Index.tsx       # 主页面
│   └── App.tsx             # 应用入口
├── public/                 # 静态资源文件夹
│   ├── og-image.png       # Open Graph 图片
│   └── lovable-uploads/   # 网站图片资源
├── index.html             # 静态版本主页面
├── package.json           # 项目依赖配置
└── README-STATIC.md       # 本说明文件
```

### 静态版本结构
```
├── index.html          # 主页面文件（包含所有内容）
├── public/             # 静态资源文件夹
│   ├── og-image.png    # Open Graph 图片
│   └── lovable-uploads/ # 网站图片资源
└── README-STATIC.md    # 本说明文件
```

## 自定义修改

### 📝 修改网站文字内容（小白指南）

如果你想修改网站上显示的文字内容，需要编辑以下文件：

#### 1. React 组件文件（推荐方式）
网站的文字内容主要分布在 `src/components/` 文件夹下的各个组件文件中：

- **`src/components/Hero.tsx`** - 首页标题和副标题
  - 修改 "Orangery Ventures" 主标题
  - 修改 "We believe founders with unfair advantages..." 等描述文字

- **`src/components/About.tsx`** - 关于我们部分
  - 修改 "We got started 2025 with a single mission" 标题
  - 修改公司介绍文字

- **`src/components/Manifesto.tsx`** - 投资理念部分
  - 修改 "Thesis" 标题
  - 修改投资理念描述

- **`src/components/InvestmentApproach.tsx`** - 投资方式
  - 修改投资金额、投资阶段等信息
  - 修改加速器项目描述

- **`src/components/FoundersInSearch.tsx`** - 目标创始人类型
  - 修改四种创始人类型的标题和描述

- **`src/components/Community.tsx`** - 社区和媒体部分
  - 修改社区建设相关内容

#### 2. 静态 HTML 文件（备选方式）
如果你使用的是静态版本，直接编辑 `index.html` 文件中的文本内容即可。

#### 📋 修改步骤：
1. 找到对应的 `.tsx` 文件
2. 找到要修改的文字（通常在双引号内）
3. 直接修改文字内容
4. 保存文件
5. 重新运行项目查看效果

#### ⚠️ 注意事项：
- 修改时保持双引号完整
- 不要删除 HTML 标签（如 `<h1>`, `<p>` 等）
- 保持代码格式整齐
- 修改后测试网站是否正常显示

### 🎨 修改样式
- 主要样式通过 Tailwind CSS 类名控制
- 自定义样式在 `<style>` 标签中定义
- 颜色主题在 `tailwind.config` 中配置

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

## 🚀 开发环境设置

### 前置要求
- Node.js (版本 16 或更高)
- npm 或 yarn 包管理器
- 代码编辑器（推荐 VS Code）

### 本地开发步骤
1. **克隆项目**
   ```bash
   git clone [项目地址]
   cd KnowingBlue
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或者
   yarn install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   # 或者
   yarn dev
   ```

4. **打开浏览器**
   访问 `http://localhost:5173` 查看网站

### 构建静态版本
```bash
npm run build
# 构建文件会生成在 dist/ 文件夹中
```

## ❓ 常见问题解答

### Q: 我是完全的编程小白，应该如何开始？
A: 建议先学习基础的 HTML 和 CSS 知识，然后：
1. 下载并安装 VS Code 编辑器
2. 学习如何使用 Git 和 GitHub
3. 从修改简单的文字内容开始
4. 逐步学习 React 和 TypeScript

### Q: 修改文字后网站没有变化怎么办？
A: 检查以下几点：
1. 确保保存了文件（Ctrl+S 或 Cmd+S）
2. 刷新浏览器页面（F5 或 Ctrl+R）
3. 检查开发服务器是否正在运行
4. 查看浏览器控制台是否有错误信息

### Q: 如何修改网站的颜色主题？
A: 颜色主题在 `tailwind.config.ts` 文件中定义，找到 `colors` 部分进行修改。

### Q: 如何添加新的页面？
A: 
1. 在 `src/pages/` 文件夹中创建新的 `.tsx` 文件
2. 在 `src/App.tsx` 中添加新的路由
3. 更新导航菜单链接

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

- [React 官方文档](https://react.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 入门教程](https://www.typescriptlang.org/docs/)
- [VS Code 使用指南](https://code.visualstudio.com/docs)
- [Git 基础教程](https://git-scm.com/book/zh/v2)

## 📞 联系方式

如有问题或需要技术支持，请联系：hello@orangeryventures.com

---

**提示**: 如果你是编程新手，建议先从修改简单的文字内容开始，逐步学习更复杂的功能。记住，每次修改前都要备份文件！