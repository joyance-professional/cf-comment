# Cloudflare 评论系统

一个基于 Cloudflare Workers 和 D1 数据库的简洁、美观的评论系统，适用于个人博客或静态网站。

## 特性

- 🔐 **密码保护**：管理面板受密码保护，基于 Cookie 的持久登录（30 天）。
- 💬 **评论功能**：支持嵌入静态网页，添加评论功能。
- 🛡️ **安全验证**：集成 Cloudflare Turnstile 验证，防止垃圾评论。
- 🎨 **简洁美观的 UI**：黑白灰红配色，响应式设计，带有动画效果。
- 📦 **轻量级嵌入**：通过最少的代码行数嵌入静态网站。
- 🚀 **Cloudflare Workers 驱动**：全球高速访问。

## 逻辑

```
管理员登录：
访问管理面板 → 输入密码 → 设置 Cookie（有效期 30 天） → 进入管理界面

站点管理：
创建新站点（代号 + URL）→ 获取嵌入代码 → 查看/删除现有站点

用户评论：
嵌入评论组件 → 验证域名 → 显示评论列表 → Turnstile 验证 → 提交评论 → 实时显示评论

未登录用户申请代号：
通过评论组件 → 完成 Turnstile 验证 → 申请代号（每个代号最多支持 1MB 评论内容）
```

## 部署指南

### 前置条件

- **Node.js**：确保已安装 Node.js 环境（建议版本 16.x 或更高）。
- **Cloudflare 账户**：需要有 Cloudflare 账户，并开通 Workers 和 D1 数据库。
- **Wrangler CLI**：用于管理和部署 Cloudflare Workers。

  ```bash
  npm install -g wrangler
  ```

### 第一步：克隆项目

```bash
git clone https://github.com/joyance-professional/cf-comment
cd comment-system
```

### 第二步：安装依赖

```bash
npm install
```

### 第三步：配置 Cloudflare

#### 1. 修改 `wrangler.toml` 文件

我们已经预设了 D1 数据库和 KV 命名空间的名称，您只需在 `wrangler.toml` 中填写您的 Cloudflare 账户 ID 和其他必要的密钥。

```toml
name = "comment-system-worker"
main = "src/worker/index.js"
compatibility_date = "2023-10-01"

[vars]
TURNSTILE_SECRET_KEY = "你的Turnstile Secret Key"
DEFAULT_TURNSTILE_SITE_KEY = "你的默认Turnstile Site Key"

[[kv_namespaces]]
binding = "SESSIONS"
id = "sessions_kv_namespace_id"

[[kv_namespaces]]
binding = "ASSETS"
id = "assets_kv_namespace_id"

[[d1_databases]]
binding = "DB"
database_name = "comment_system_db"
database_id = "d1_database_id"

[build]
command = "npm install && npm run build"

[env.production]
route = "your-domain.com/*"
account_id = "你的Cloudflare账号ID"
```

**注意：** 请将上述 `wrangler.toml` 文件中的 `你的Turnstile Secret Key`、`你的默认Turnstile Site Key` 和 `你的Cloudflare账号ID` 替换为您自己的信息。

#### 2. 登录 Cloudflare

```bash
wrangler login
```

#### 3. 创建 D1 数据库

```bash
wrangler d1 create comment_system_db
```

成功创建后，您会得到一个 `database_id`，请将其填入 `wrangler.toml` 中的 `d1_database_id`。

#### 4. 创建 KV 命名空间

用于存储会话令牌和静态资源。

```bash
wrangler kv:namespace create "SESSIONS"
```

```bash
wrangler kv:namespace create "ASSETS"
```

将生成的 `id` 分别填入 `wrangler.toml` 中 `SESSIONS` 和 `ASSETS` 的 `id` 字段，替换 `sessions_kv_namespace_id` 和 `assets_kv_namespace_id`。


### 第四步：初始化 D1 数据库

使用 `schema.sql` 文件初始化数据库结构。

```bash
wrangler d1 execute comment_system_db --file=src/worker/schema.sql --local
```

### 第五步：部署到 Cloudflare

```bash
wrangler deploy
```
## 使用指南

### 管理员访问

1. 在浏览器中访问你的 Worker URL，路径为 `/admin/index.html`。

   ```
   https://comment-system-worker.your-domain.workers.dev/admin/index.html
   ```

2. 设置并输入您想要的管理密码。

3. 登录后，可以：

   - 创建新站点（代号 + URL + Turnstile Site Key）。
   - 获取嵌入代码。
   - 查看或删除现有站点。

### 嵌入评论组件

1. 在管理面板中获取嵌入代码。

2. 将嵌入代码复制到你的静态网页中，放置在希望显示评论的位置。

   ```html
   <div id="comment-component" data-turnstile-sitekey="你的Turnstile Site Key"></div>
   <script src="https://comment-system-worker.your-domain.workers.dev/comment.js" defer></script>
   ```

3. 部署你的静态网页。

### 用户评论

- 访问嵌入了评论组件的网页。
- 完成 Turnstile 验证后，可以提交评论。
- 评论将实时显示，无需刷新页面。

### 未登录用户申请代号

- 在没有提供 `data-site-id` 的情况下，评论组件将显示“申请代号”按钮。
- 用户完成 Turnstile 验证后，可以申请一个代号，最大支持 1MB 的评论内容。

## 技术细节

### 存储机制

- **D1 数据库**：用于存储站点信息和评论内容。

### 数据库结构

```sql
-- 站点表
CREATE TABLE sites (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    turnstile_site_key TEXT NOT NULL,
    max_size INTEGER DEFAULT 0,
    created_by_user INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 评论表
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(site_id) REFERENCES sites(id)
);
```

### 安全特性

- **密码保护的管理面板**：管理员登录受密码保护，基于 Cookie 的持久登录（30 天）。
- **Turnstile 验证**：防止垃圾评论和机器人。
- **唯一用户名生成**：根据用户 IP 生成唯一用户名，防止重复。

## 配置选项

### 环境变量

| 变量名称                   | 描述                                           | 是否必需 |
|----------------------------|------------------------------------------------|----------|
| `TURNSTILE_SECRET_KEY`       | Cloudflare Turnstile 的 Secret Key             | 是       |
| `DEFAULT_TURNSTILE_SITE_KEY` | 默认的 Turnstile Site Key，用于未登录用户申请代号 | 是       |

### `wrangler.toml` 配置

```toml
name = "comment-system-worker"
main = "src/worker/index.js"
compatibility_date = "2023-10-01"

[vars]
TURNSTILE_SECRET_KEY = "你的Turnstile Secret Key"
DEFAULT_TURNSTILE_SITE_KEY = "你的默认Turnstile Site Key"

[[kv_namespaces]]
binding = "SESSIONS"
id = "sessions_kv_namespace_id"

[[kv_namespaces]]
binding = "ASSETS"
id = "assets_kv_namespace_id"

[[d1_databases]]
binding = "DB"
database_name = "comment_system_db"
database_id = "d1_database_id"

[build]
command = "npm install && npm run build"

[env.production]
route = "your-domain.com/*"
account_id = "你的Cloudflare账号ID"
```

**注意：** 请确保将所有占位符（如 `你的Turnstile Secret Key`、`sessions_kv_namespace_id` 等）替换为您的实际信息。

## 开发指南

### 本地开发

1. 克隆仓库后运行：

   ```bash
   wrangler dev
   ```

2. 访问 `http://localhost:8787` 进行测试。

### 代码结构

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

## 贡献指南

1. Fork 本仓库。
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)。
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)。
4. 推送到分支 (`git push origin feature/AmazingFeature`)。
5. 创建 Pull Request。

## 致谢

- Cloudflare Workers 平台
- OpenAI GPT-4

## 反馈

如果您发现任何问题或有改进建议，请创建 [issue](https://github.com/joyance-professional/cf-comment/issues)。


这样，您可以直接按照上述步骤运行命令，快速部署评论系统。
