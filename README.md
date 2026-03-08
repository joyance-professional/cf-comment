# Cloudflare Worker Comment System (PoW Enhanced Version)

一个基于 [Cloudflare Workers](https://workers.cloudflare.com/) 运行的强大评论系统。
本次更新彻底移除了 Turnstile，引入了 **无感 PoW (工作量验证)** 机制，完美解决了 iOS/微信/WebView 中 iframe 跨域 Cookie 被拦截的问题，并接入 **DOMPurify** 修复 XSS 漏洞，同时进行了移动端 UI 重构与功能增强。

A robust comment system running on [Cloudflare Workers](https://workers.cloudflare.com/).
This update removes Turnstile in favor of **Invisible PoW (Proof of Work)**, solving cross-domain iframe cookie issues on iOS/WeChat/WebViews. It integrates **DOMPurify** to fix XSS vulnerabilities and features a completely redesigned Mobile UI.

![alt text](./img/1-en.png)
![alt text](./img/2-cn.png)

---

## 目录 (Table of Contents)

1. [特性 | Features](#特性--features)
2. [部署指南 | Deployment Guide](#部署指南--deployment-guide)
    - [前提条件 | Prerequisites](#前提条件--prerequisites)
    - [程序步骤 | Program Steps](#程序步骤--program-steps)
    - [环境变量 | Environment Variables](#环境变量--environment-variables)
    - [D1 配置 | D1 Setup](#d1-配置--d1-setup)
3. [使用指南 | Usage Guide](#使用指南--usage-guide)
    - [管理员访问 | Admin Access](#管理员访问--admin-access)
    - [创建讨论区 | Creating a Discussion Area](#创建讨论区--creating-a-discussion-area)
    - [嵌入式使用 | Embedding the Comment System](#嵌入式使用--embedding-the-comment-system)
    - [高级嵌入 (Raw 模式) | Advanced Embed (Raw Mode)](#高级嵌入-raw-模式--advanced-embed-raw-mode)
    - [评论与互动 | Commenting & Interaction](#评论与互动--commenting--interaction)
    - [管理 | Management](#管理--management)
4. [技术细节 | Technical Details](#技术细节--technical-details)
5. [贡献指南 | Contributing](#贡献指南--contributing)
6. [致谢 | Acknowledgments](#致谢--acknowledgments)

---

## 特性 | Features

### 🛡️ 核心安全与架构 / Core Security & Architecture

- **🔄 无感 PoW 验证 / Invisible PoW Verification**  
  **NEW!** 废弃 Turnstile。发布评论时，浏览器在后台计算 SHA-256 数学题（约 0.5-1.5秒）。  
  **优势**：彻底解决 iOS Safari / 微信 / App WebView 中 iframe 跨域 Cookie 被拦截导致的“按钮永远灰色”问题。用户零感知，且有效防御机器人。  
  **NEW!** Replaces Turnstile. The browser calculates a SHA-256 problem in the background (0.5-1.5s) when posting. Solves cross-domain cookie issues on iOS/WeChat and prevents bot spam without user interaction.

- **⚔️ DOMPurify 防御 XSS / DOMPurify XSS Protection**  
  **NEW!** 前端渲染全面接入 DOMPurify，强制清洗所有恶意脚本与危险标签。  
  **优势**：彻底封堵 `<script>` 等注入攻击，达到最高安全级别。  
  **NEW!** Fully integrated DOMPurify cleanses all malicious scripts and tags, effectively blocking XSS attacks.

### 📱 界面与体验 / UI & UX

- **📱 行动端极致优化 / Mobile UX Optimization**  
  **NEW!** 针对手机屏幕重构布局：输入框增高、字体固定 16px (防止 iOS 自动放大)、100% 宽度大按钮、图片自适应。  
  **NEW!** Re-layout for mobile: larger inputs, fixed 16px font (prevents iOS zoom), full-width buttons, and responsive images.

- **🔌 Raw 纯净模式 / Raw Mode**  
  **NEW!** 支持 `?raw=1` 参数。仅输出语义化 HTML 和 JS 功能，不加载任何自带 CSS。方便宿主网站高度客制化样式。  
  **NEW!** Support `?raw=1`. Outputs only semantic HTML and JS without default CSS, allowing full style customization by the host site.

### 💬 基础功能 / Basic Functions

- **💬 回复与讨论 / Reply & Discussion**  
  支持嵌套回复，形成有层次的讨论串。  
  Supports nested replies creating discussion threads.

- **👍 智能防刷点赞 / Anti-Spam Likes**  
  **UPDATE!** 基于 Cookie 的点赞记录，防止同一设备无限次刷赞。  
  **UPDATE!** Cookie-based tracking prevents infinite like spamming from the same device.

- **🚩 举报功能 / Report Functionality**  
  用户可以举报不当内容，管理员后台可处理。  
  Users can report inappropriate comments for admin review.

- **🔒 管理后台 / Admin Panel**  
  密码保护的后台，可删除/隐藏评论、管理讨论区。  
  Password-protected panel to delete/hide comments and manage areas.

- **🌐 双语与主题 / Bilingual & Themes**  
  支持中/英切换，支持深色/浅色模式。  
  Supports Chinese/English switching and Dark/Light modes.

---

## 部署指南 | Deployment Guide

由于移除了 Turnstile，部署变得更加简单。
Since Turnstile has been removed, deployment is now much simpler.

### 前提条件 | Prerequisites

- 拥有 [Cloudflare 账号](https://dash.cloudflare.com/)  
  Have a [Cloudflare account](https://dash.cloudflare.com/)

### 程序步骤 | Program Steps

1. **登录 Cloudflare**: 访问 [Cloudflare 官方网站](https://dash.cloudflare.com/)。  
   **Log in to Cloudflare**: Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/).

2. **创建 Worker**: 在侧边栏找到 “Workers and Pages” -> “Create Worker”。  
   **Create a Worker**: Go to **Workers and Pages** -> **Create Worker**.

3. **命名**: 随意命名，点击部署。  
   **Name**: Name it as you like and deploy.

4. **编辑代码**: 点击 “Edit Code” (编辑代码)。  
   **Edit Code**: Click **Edit Code**.

5. **拷贝代码**: 从本项目中复制 `worker.js` 的全部内容，覆盖默认代码。  
   **Copy Code**: Copy all contents of `worker.js` and replace the default code.

6. **初步部署**: 点击右上角 “Deploy”。  
   **Deploy**: Click **Deploy**.

---

### 环境变量 | Environment Variables

1. **打开 Worker 设置**: 回到 Cloudflare 控制台，进入你的 Worker 页面。  
   **Open Worker Settings**: Go back to your Worker's dashboard page.

2. **设置变量**: 点击 “Settings” -> “Variables and Secrets”。  
   **Set Variables**: Click **Settings** -> **Variables and Secrets**.

3. **添加管理员密码 (必需)**:  
   **Add Admin Password (Required)**:  
   点击 **Add**：
   - **Name**: `ADMIN_PASS`
   - **Value**: 你想要的管理员密码 (用于登录后台)  
     (Your desired admin password)

4. **部署**: 点击 **Deploy** 使配置生效。  
   **Deploy**: Click **Deploy** to apply changes.

*(注意：不再需要配置 TURNSTILE_SITEKEY)*
*(Note: TURNSTILE_SITEKEY is no longer required)*

---

### D1 配置 | D1 Setup

1. **创建数据库**: 在侧边栏 “Storage and Databases” -> “D1 SQL 数据库” -> **Create**。  
   **Create Database**: Sidebar **Storage and Databases** -> **D1 SQL Databases** -> **Create**.

2. **执行 SQL**: 进入数据库详情，点击 **Console**，粘贴并执行以下语句：  
   **Run SQL**: In database details, click **Console**, paste and run:

   ```sql
   CREATE TABLE comment_areas (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     area_key TEXT NOT NULL UNIQUE,
     intro TEXT NULL,
     hidden INTEGER DEFAULT 0
   );

   CREATE TABLE comments (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     area_key TEXT NOT NULL,
     content TEXT NOT NULL,
     parent_id INTEGER DEFAULT 0,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     hidden INTEGER DEFAULT 0,
     likes INTEGER DEFAULT 0,
     pinned INTEGER DEFAULT 0
   );

   CREATE TABLE reports (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     comment_id INTEGER NOT NULL,
     reason TEXT NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     resolved INTEGER DEFAULT 0
   );
   ```

3. **绑定数据库**:  
   **Bind Database**:  
   - 回到你的 Worker -> **Settings** -> **Bindings**。
   - 点击 **Add Binding** -> **D1 Database**。
   - Variable name (变量名) 填写: `DB`
   - Database 选择你刚才创建的数据库。
   - 点击 **Deploy**。

---

## 使用指南 | Usage Guide

### 管理员访问 | Admin Access

1. 浏览器访问 `https://your-worker.workers.dev`。
2. 输入在环境变量 `ADMIN_PASS` 中设置的密码。
3. 登录有效期为 1 小时。

### 创建讨论区 | Creating a Discussion Area

1. 登录管理员后台。
2. 填写讨论区名称和 **唯一标识 (Area Key)**。
3. 点击创建。`area_key` 将用于嵌入代码中。

### 嵌入式使用 | Embedding the Comment System

在网页中插入 `iframe`。
Insert an `iframe` into your webpage.

**URL 格式 / URL Format**:
```
https://your-worker.workers.dev/embed/area/[area_key]?theme=[light|dark]&lang=[zh-CN|en]
```

**示例 / Example**:
```html
<iframe 
  src="https://my-blog-comments.workers.dev/embed/area/post-101?theme=light&lang=zh-CN"
  style="width: 100%; height: 600px; border: none;">
</iframe>
```

### 高级嵌入 (Raw 模式) | Advanced Embed (Raw Mode)

如果你希望完全使用自己的 CSS 样式，可以使用 Raw 模式。
If you want to use your own CSS entirely, use Raw mode.

**URL**: 
在链接末尾加上 `&raw=1`。
Add `&raw=1` to the end of the URL.

```
https://your-worker.workers.dev/embed/area/my-key?raw=1
```

**效果**:
后端的 CSS、GitHub Markdown 样式将不会加载。只保留 HTML 结构和必要的 JS 交互逻辑（如 PoW 验证、提交、点赞）。

### 评论与互动 | Commenting & Interaction

1.  **发布评论**: 支持 Markdown。点击发布时，系统会自动进行 PoW 计算（无需点击验证码）。
2.  **点赞**: 点击点赞图标。系统会记录 Cookie 防止恶意刷赞。
3.  **举报**: 遇到违规内容可点击举报。

### 管理 | Management

在后台你可以：
- 查看所有讨论区。
- 隐藏或删除特定评论。
- 查看并处理举报信息。

---

## 技术细节 | Technical Details

- **PoW 机制 (Proof of Work)**: 
  前端使用 Web Crypto API 计算 SHA-256 哈希值，后端验证哈希难度。此过程不依赖 Cookie，因此不受 iOS/Safari 跨域限制影响。
- **安全性 (Security)**:
  - **DOMPurify**: 在渲染 HTML 前清洗数据，防止 XSS。
  - **HttpOnly Cookie**: 用于管理员鉴权。
- **数据库 (Database)**: Cloudflare D1 (SQLite)。
- **技术栈 (Stack)**: Cloudflare Workers (ES Modules), Raw HTML/JS (无前端框架依赖，极速加载)。

---

## 贡献指南 | Contributing

1. **Fork** 本仓库。
2. 创建特性分支 (`git checkout -b feature/NewFeature`)。
3. 提交更改。
4. 推送分支并提交 **Pull Request**。

---

## 致谢 | Acknowledgments

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- Gemini & ChatGPT (Assistants)

---

如果您发现问题，请提交 **Issue**。
If you encounter any issues, please open an **Issue**.
