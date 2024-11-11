# 评论系统 cf-comment

一个基于 Cloudflare Workers 和 D1 数据库的简洁、美观的评论系统，适用于个人博客或静态网站。

## 功能特性

- **简洁美观的 UI**：黑白灰红配色，响应式设计，带有动画效果。
- **安全验证**：集成 Cloudflare Turnstile 验证，防止垃圾评论。
- **易于集成**：通过简单的嵌入代码，将评论功能添加到任何静态网页。
- **管理面板**：通过管理员面板创建、管理站点和评论，无需修改后端代码。

## 文件结构

```
comment-system/
├── src/
│   ├── admin/             # 管理面板前端
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── worker/            # Cloudflare Worker
│   │   ├── index.js
│   │   └── schema.sql
│   └── comment.js         # 评论组件脚本
├── wrangler.toml          # Cloudflare 配置
├── package.json
└── README.md              # 项目说明文件
```

## 安装与部署

### 先决条件

- **Node.js**：确保已安装 Node.js 环境。
- **Cloudflare 账号**：需要有 Cloudflare 账号，并开通 Workers 和 D1 数据库。
- **Wrangler CLI**：用于管理和部署 Cloudflare Workers。可以通过以下命令安装：

  ```bash
  npm install -g wrangler
  ```

### 克隆项目

```bash
git clone https://github.com/your_username/comment-system.git
cd comment-system
```

### 安装依赖

```bash
npm install
```

### 配置 Cloudflare

1. **修改 `wrangler.toml` 文件：**

   - 设置 `name` 为你的 Worker 名称。
   - 更新 `account_id` 为你的 Cloudflare 账号 ID。
   - 在 `vars` 中设置以下环境变量：
     - `ADMIN_PASSWORD`：管理面板的登录密码。
     - `TURNSTILE_SECRET_KEY`：Cloudflare Turnstile 的 Secret Key。

   ```toml
   name = "comment-system-worker"
   main = "src/worker/index.js"
   compatibility_date = "2023-10-01"

   [vars]
   ADMIN_PASSWORD = "你的管理密码"
   TURNSTILE_SECRET_KEY = "你的Turnstile Secret Key"

   [[kv_namespaces]]
   binding = "SESSIONS"
   id = "你的KV命名空间ID"

   [[d1_databases]]
   binding = "DB"
   database_name = "你的D1数据库名称"
   database_id = "你的D1数据库ID"

   [env.production]
   route = "your-domain.com/*"
   account_id = "你的Cloudflare账号ID"
   ```

2. **初始化 D1 数据库：**

   使用 `wrangler` 命令将 `schema.sql` 文件中的数据库结构导入到 D1 数据库中。

   ```bash
   wrangler d1 execute your-d1-database-name --file=src/worker/schema.sql --remote
   ```

### 构建与部署

#### 构建项目

由于我们的 Worker 使用纯 JavaScript，无需额外的构建步骤。如果你有自定义的构建需求，可以修改 `package.json` 中的 `build` 脚本。

#### 本地开发

```bash
wrangler dev
```

#### 部署到 Cloudflare

```bash
wrangler publish
```

## 使用方法

### 1. 访问管理面板

在浏览器中打开你的 Worker URL，加上 `/src/admin/index.html`，例如：

```
https://your-worker.your-domain.workers.dev/src/admin/index.html
```

### 2. 登录管理面板

使用你在 `wrangler.toml` 中设置的 `ADMIN_PASSWORD` 登录。

### 3. 创建新站点

在管理面板中：

- 输入 **代号**（`Site ID`）：用于标识你的站点，例如 `my-blog`.
- 输入 **URL**：你的站点的域名或 URL，例如 `https://myblog.com`.
- 输入 **Turnstile Site Key**：从 Cloudflare Turnstile 获取，对应你站点的 Site Key。

点击 **创建** 按钮。

### 4. 获取嵌入代码

在现有站点列表中，点击 **获取嵌入代码** 按钮，会弹出包含嵌入代码的对话框。

示例嵌入代码：

```html
<div id="comment-component" data-site-id="my-blog" data-turnstile-sitekey="你的Turnstile Site Key"></div>
<script src="https://your-worker.your-domain.workers.dev/comment.js" defer></script>
```

### 5. 在你的站点中添加评论功能

将获取的嵌入代码复制到你的网站 HTML 中，放置在你希望显示评论的位置。

### 6. 测试评论功能

打开你的网站，应该能够看到评论区，完成 Turnstile 验证后即可提交评论。

## 自定义与扩展

### 修改样式

评论组件的样式已经内嵌在 `comment.js` 中，如需修改，可在 `src/comment.js` 中的样式部分进行更改，然后重新部署。

### 安全与限制

- **跨域请求**：默认允许所有来源的跨域请求，如需限制，可在 `worker/index.js` 中的 `getCorsHeaders` 函数中修改。
- **评论内容过滤**：目前未实现内容审核功能，可在 `handleSubmitComment` 函数中添加过滤逻辑。

## 常见问题

### 1. Turnstile 验证失败

- 确保你在管理面板中输入了正确的 Turnstile Site Key 和 Secret Key。
- 检查你的 Cloudflare Turnstile 设置，确保域名匹配。

### 2. 评论无法加载或提交

- 检查浏览器的控制台，查看是否有错误信息。
- 确认你的 Worker 正常运行，且 D1 数据库已正确初始化。

### 3. 管理面板无法登录

- 确保 `wrangler.toml` 中的 `ADMIN_PASSWORD` 与登录时输入的密码一致。
- 检查是否正确配置了 KV 命名空间 `SESSIONS`。

## 贡献指南

欢迎提出问题、建议或提交 Pull Request。

## 反馈

如果您发现任何问题或有改进建议，请创建 [issue](https://github.com/joyance-professional/cf-files-sharing/issues)。
希望这个 README 文件能够帮助你在 GitHub 上展示和分享你的项目。如有其他需求，请随时告知。

```
