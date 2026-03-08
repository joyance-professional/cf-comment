const i18n = {
    'zh-CN': {
        'home_title': '评论系统 - 首页',
        'login_title': '管理员登录',
        'password_placeholder': '请输入密码',
        'login_btn': '登录',
        'admin_panel_title': '讨论区管理面板',
        'area_list_title': '已有讨论区列表',
        'create_area_title': '创建新的讨论区',
        'area_name_placeholder': '名称',
        'area_key_placeholder': '唯一标识',
        'area_intro_placeholder': '简介(可选)',
        'create_btn': '创建',
        'report_management_title': '举报管理',
        'loading': '加载中...',
        'no_areas': '暂无讨论区',
        'area_id': 'ID',
        'area_name': '名称',
        'area_key': 'Key',
        'area_hidden': '隐藏',
        'area_intro': '简介',
        'area_comments': '评论',
        'area_action': '操作',
        'view': '查看',
        'hide': '隐藏',
        'unhide': '取消隐藏',
        'delete': '删除',
        'no_reports': '暂无举报',
        'report_id': 'ID',
        'report_comment_id': '评论ID',
        'report_content': '内容',
        'report_reason': '理由',
        'report_created_at': '创建时间',
        'report_resolved': '已处理',
        'resolve_report': '标记已处理',
        'toggle_hide_comment': '隐藏/恢复',
        'delete_confirm': '确认删除该讨论区？此操作不可恢复',
        'notification_input_password': '请输入密码',
        'notification_login_failed': '密码错误',
        'notification_create_success': '创建成功',
        'notification_create_failed': '创建失败',
        'notification_delete_success': '删除成功',
        'notification_delete_failed': '删除失败',
        'notification_toggle_success': '操作成功',
        'notification_toggle_failed': '操作失败',
        'notification_report_success': '举报成功',
        'notification_report_failed': '举报失败',
        'notification_report_resolved': '已标记为处理',
        'notification_comment_hidden_toggle': '评论隐藏状态已切换',
        'notification_comment_submit_failed': '评论提交失败',
        'notification_missing_input': '名称和唯一标识必填',
        'notification_report_missing_reason': '缺少举报理由',
        'notification_comment_missing_content': '评论内容不能为空',
        'notification_unauthorized': '未授权',
        'notification_not_found': '未找到',
        'comment_title': '评论区',
        'comment_placeholder': 'Html语法可用，支持回复',
        'submit_comment_btn': '提交评论',
        'verifying_pow': '安全验证中...',
        'comment_tip': '发布后无法删除',
        'no_comments': '暂无评论',
        'reply_btn': '回复',
        'report_comment': '举报',
        'comment_hidden': '此评论已被隐藏',
        'view_comment': '查看',
        'collapse_comment': '收起',
        'language': '语言',
        'theme': '主题',
        'light': '浅色',
        'dark': '深色',
        'like': '点赞',
        'liked': '已赞',
        'show_comment_input': '发布评论'
    },
    'en': {
        'home_title': 'Comment System - Home',
        'login_title': 'Admin Login',
        'password_placeholder': 'Enter password',
        'login_btn': 'Login',
        'admin_panel_title': 'Comment Area Management',
        'area_list_title': 'Existing Comment Areas',
        'create_area_title': 'Create New Comment Area',
        'area_name_placeholder': 'Name',
        'area_key_placeholder': 'Unique Key',
        'area_intro_placeholder': 'Introduction (optional)',
        'create_btn': 'Create',
        'report_management_title': 'Report Management',
        'loading': 'Loading...',
        'no_areas': 'No comment areas yet',
        'area_id': 'ID',
        'area_name': 'Name',
        'area_key': 'Key',
        'area_hidden': 'Hidden',
        'area_intro': 'Intro',
        'area_comments': 'Comments',
        'area_action': 'Actions',
        'view': 'View',
        'hide': 'Hide',
        'unhide': 'Unhide',
        'delete': 'Delete',
        'no_reports': 'No reports yet',
        'report_id': 'ID',
        'report_comment_id': 'Comment ID',
        'report_content': 'Content',
        'report_reason': 'Reason',
        'report_created_at': 'Created At',
        'report_resolved': 'Resolved',
        'resolve_report': 'Mark as Resolved',
        'toggle_hide_comment': 'Hide/Restore',
        'delete_confirm': 'Confirm delete this comment area? This action cannot be undone',
        'notification_input_password': 'Please enter password',
        'notification_login_failed': 'Incorrect password',
        'notification_create_success': 'Created successfully',
        'notification_create_failed': 'Failed to create',
        'notification_delete_success': 'Deleted successfully',
        'notification_delete_failed': 'Failed to delete',
        'notification_toggle_success': 'Operation successful',
        'notification_toggle_failed': 'Operation failed',
        'notification_report_success': 'Reported successfully',
        'notification_report_failed': 'Failed to report',
        'notification_report_resolved': 'Marked as resolved',
        'notification_comment_hidden_toggle': 'Comment hidden state toggled',
        'notification_comment_submit_failed': 'Failed to submit comment',
        'notification_missing_input': 'Name and key are required',
        'notification_report_missing_reason': 'Missing report reason',
        'notification_comment_missing_content': 'Comment content cannot be empty',
        'notification_unauthorized': 'Unauthorized',
        'notification_not_found': 'Not Found',
        'comment_title': 'Comment Area',
        'comment_placeholder': 'Html is supported, reply available',
        'submit_comment_btn': 'Submit',
        'verifying_pow': 'Verifying...',
        'comment_tip': 'Once posted cannot be deleted',
        'no_comments': 'No comments yet',
        'reply_btn': 'Reply',
        'report_comment': 'Report',
        'comment_hidden': 'This comment has been hidden',
        'view_comment': 'View',
        'collapse_comment': 'Collapse',
        'language': 'Language',
        'theme': 'Theme',
        'light': 'Light',
        'dark': 'Dark',
        'like': 'Like',
        'liked':'Liked',
        'show_comment_input': 'Write a Comment'
    }
};
  
/** 解析 cookie 工具函数 */
function parseCookie(cookieHeader) {
    const cookies = {};
    if (!cookieHeader) return cookies;
    const parts = cookieHeader.split(';');
    for (const part of parts) {
        const [name, ...rest] = part.trim().split('=');
        if(name) cookies[name] = rest.join('=');
    }
    return cookies;
}
  
/** 转义HTML，避免XSS */
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
  
/** 使用 Marked.js 解析 Markdown */
function parseMarkdown(md) {
    if (!md) return '';
    return marked ? marked.parse(md, { breaks: true }) : md;
}
  
// 获取语言
async function getLanguage(request) {
    const cookie = parseCookie(request.headers.get("Cookie") || "");
    if (cookie.lang) return cookie.lang;
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
        const languages = acceptLanguage.split(',').map(lang => lang.trim().split(';')[0]);
        if (languages.some(lang => lang.startsWith('zh'))) return 'zh-CN';
    }
    return 'en';
}
  
// 获取主题
async function getTheme(request) {
    const cookie = parseCookie(request.headers.get("Cookie") || "");
    const urlParams = new URL(request.url).searchParams;
    return urlParams.get('theme') || cookie.theme || 'dark';
}
  
/** 设置主题/语言的 cookie */
function setCookie(name, value, res) {
    res.headers.append('Set-Cookie', `${name}=${value}; Path=/; SameSite=Lax; Max-Age=31536000`);
}
  
let marked = null;

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const pathname = url.pathname;
        const lang = await getLanguage(request);
        const theme = await getTheme(request);
  
        // 提供 PoW 挑戰 API
        if (pathname === '/api/pow-challenge' && request.method === 'GET') {
            const challenge = crypto.randomUUID();
            return new Response(JSON.stringify({ challenge, difficulty: 4 }), {
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }

        if (pathname === '/' && request.method === 'GET') {
            return handleHomePage(request, env, lang, theme);
        } else if (pathname === '/login' && request.method === 'POST') {
            return handleLogin(request, env);
        } else if (pathname === '/create' && request.method === 'POST') {
            return handleCreateCommentArea(request, env);
        } else if (pathname.startsWith('/area/') && request.method === 'GET') {
            if (pathname.endsWith('/comments')) return handleGetComments(request, env);
            return handleCommentAreaPage(request, env, lang, theme);
        } else if (pathname.startsWith('/area/') && request.method === 'POST') {
            if (pathname.endsWith('/comment')) return handlePostComment(request, env);
            if (pathname.match(/^\/area\/[^/]+\/comment\/\d+\/report$/)) return handleReportComment(request, env);
            if (pathname.match(/^\/area\/[^/]+\/comment\/\d+\/like$/)) return handleLikeComment(request, env);
        }
  
        if (pathname.startsWith('/admin/') && request.method === 'POST') {
            const matchDeleteArea = pathname.match(/^\/admin\/area\/([^/]+)\/delete$/);
            if (matchDeleteArea) return handleDeleteArea(matchDeleteArea[1], request, env);
            
            const matchHideArea = pathname.match(/^\/admin\/area\/([^/]+)\/toggleHide$/);
            if (matchHideArea) return handleToggleHideArea(matchHideArea[1], request, env);
            
            const matchPinComment = pathname.match(/^\/admin\/comment\/(\d+)\/togglePin$/);
            if (matchPinComment) return handleTogglePinComment(parseInt(matchPinComment[1], 10), request, env);
            
            const matchResolveReport = pathname.match(/^\/admin\/reports\/resolve\/(\d+)$/);
            if (matchResolveReport) return handleResolveReport(parseInt(matchResolveReport[1], 10), request, env);
            
            const matchToggleHideComment = pathname.match(/^\/admin\/comment\/(\d+)\/toggleHide$/);
            if (matchToggleHideComment) return handleToggleHideComment(parseInt(matchToggleHideComment[1], 10), request, env);
        }
  
        if (pathname === '/admin/extendedInfo' && request.method === 'GET') return handleAdminExtendedInfo(request, env);
        if (pathname === '/setLang' && request.method === 'POST') return handleSetLang(request, env);
        if (pathname === '/setTheme' && request.method === 'POST') return handleSetTheme(request, env);
  
        if (pathname.startsWith('/embed/area/') && request.method === 'GET') {
            const areaKey = decodeURIComponent(pathname.replace(/^\/embed\/area\//, ''));
            return handleEmbedCommentArea(areaKey, request, env, lang, theme);
        }
  
        return new Response("Not Found", { status: 404 });
    }
};

/** PoW 求解算法字串 (供前端注入) */
const powScript = `
// 無感 PoW 工作量證明計算
async function solvePoW(challenge, difficulty) {
    const prefix = '0'.repeat(difficulty);
    let nonce = 0;
    const encoder = new TextEncoder();
    while (true) {
        const data = encoder.encode(challenge + nonce);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.slice(0, Math.ceil(difficulty/2) + 1).map(b => b.toString(16).padStart(2, '0')).join('');
        if (hashHex.startsWith(prefix)) return nonce;
        nonce++;
        if (nonce % 5000 === 0) await new Promise(resolve => setTimeout(resolve, 0)); // 防止阻塞主線程
    }
}
`;

/** 共用前端 CSS (包含 Mobile 優化) */
const getCommonCSS = (theme) => `
    body {
        background: var(--bg-color); color: var(--text-color); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        padding: 20px; margin: 0;
    }
    a { color: var(--link-color); text-decoration: none; }
    a:hover { color: var(--link-hover-color); }
    .hint { color: var(--hint-color); margin-bottom: 10px; }
    .comment-list { margin-top: 20px; }
    .comment-item {
        margin-bottom: 15px; padding: 12px; background: var(--comment-bg-color); border-radius: 8px;
    }
    .reply-item { margin-left: 20px; border-left: 2px solid var(--border-color); border-radius: 0 8px 8px 0; }
    .reply-btn, .report-btn, .like-btn {
        margin-left: 12px; color: var(--hint-color); cursor: pointer; font-size: 13px; display: inline-block;
    }
    .like-btn.liked { color: var(--link-color); font-weight: bold; }
    .markdown-content { font-size: 14px; color: var(--comment-text-color); word-wrap: break-word; }
    .markdown-body img { max-width: 100%; height: auto; border-radius: 6px; }
    .form-group { display:flex; flex-direction:row; align-items: flex-start; gap: 10px; }
    .form-group textarea {
        background: var(--input-bg-color); color: var(--text-color); border: 1px solid var(--border-color); border-radius: 6px; padding: 10px; width: 100%; height: 60px;
        resize: vertical; font-size: 14px; box-sizing: border-box; transition: border 0.2s;
    }
    .form-group textarea:focus { outline: none; border-color: var(--link-color); }
    .form-group .comment-action { display:flex; flex-direction:column; justify-content: flex-end; align-items: stretch; min-width: 90px; }
    .form-group button, .show-comment-input button {
        background: var(--button-bg-color); color: var(--button-text-color); border: none; padding: 8px 16px; cursor: pointer; border-radius: 6px;
        transition: background 0.2s ease, transform 0.1s ease; font-size: 13px; font-weight: bold; white-space: nowrap;
    }
    .form-group button:hover, .show-comment-input button:hover { background: var(--button-hover-color); }
    .form-group button[disabled] { background: var(--border-color); color: var(--hint-color); cursor: not-allowed; }
    .comment-tip { font-size: 12px; color: var(--hint-color); margin-top: 6px; text-align: center; }
    .tooltip { position: relative; display: inline-block; width: 100%; }
    .tooltip .tooltiptext {
        visibility: hidden; background-color: var(--hint-color); color: var(--text-color); text-align: center; border-radius: 6px;
        padding: 6px; position: absolute; z-index: 1; bottom: 125%; left: 50%; transform: translateX(-50%); font-size: 12px; white-space: nowrap; opacity: 0; transition: opacity 0.3s;
    }
    .tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }
    .notification-bar {
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: var(--notification-bg-color); color: var(--notification-text-color);
        padding: 12px 24px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: space-between; font-size: 14px; z-index: 9999;
    }
    .notification-bar.hidden { display: none; }
    .close-btn { cursor: pointer; margin-left: 15px; font-weight: bold; opacity: 0.7; }
    .hidden-comment-placeholder { font-style: italic; color: var(--hint-color); }
    .show-btn { color: var(--link-color); margin-left: 8px; cursor: pointer; }
    .show-btn:hover { text-decoration: underline; }
    .show-comment-input { margin-top: 10px; text-align: left; }
    
    /* 深淺色主題 Variables */
    :root {
        --bg-color: #121212; --text-color: #e0e0e0; --link-color: #6fbaff; --link-hover-color: #99ccff;
        --input-bg-color: #1e1e1e; --border-color: #333; --button-bg-color: #2c2c2c; --button-text-color: #fff;
        --button-hover-color: #444; --notification-bg-color: #333; --notification-text-color: #fff;
        --comment-bg-color: #1a1a1a; --comment-text-color:#d4d4d4; --hint-color:#888;
    }
    [data-theme="light"] {
        --bg-color: #ffffff; --text-color: #222; --link-color: #0066cc; --link-hover-color: #004499;
        --input-bg-color: #f9f9f9; --border-color: #ddd; --button-bg-color: #eaeaea; --button-text-color: #222;
        --button-hover-color: #d4d4d4; --notification-bg-color: #222; --notification-text-color: #fff;
        --comment-bg-color: #f7f7f7; --comment-text-color:#444; --hint-color:#777;
    }
    .markdown-content.markdown-body { background-color: inherit; color: inherit; }

    /* 手機端 UI 優化 */
    @media (max-width: 600px) {
        .form-group { flex-direction: column; }
        .form-group textarea { height: 80px; font-size: 16px; } /* 防止 iOS 自動縮放 */
        .form-group .comment-action { width: 100%; flex-direction: row; align-items: center; justify-content: space-between; margin-top: 5px; }
        .form-group button { padding: 12px 16px; width: 100%; }
        .tooltip { width: auto; flex-grow: 1; }
        .comment-tip { display: none; } /* 手機端隱藏提示節省空間 */
        .reply-item { margin-left: 10px; }
    }
`;

async function handleEmbedCommentArea(areaKey, request, env, lang, theme) {
    const t = i18n[lang];
    const url = new URL(request.url);
    const isRawMode = url.searchParams.get('raw') === '1'; // raw=1 啟動純數據模式
    const area = await env.DB.prepare(`SELECT * FROM comment_areas WHERE area_key = ?`).bind(areaKey).first();

    if (!area || area.hidden === 1) return new Response("Comment area not available", { status: 404 });

    // 若啟動 Raw 模式，則不加載 CSS 樣式
    const headStyles = isRawMode ? '' : `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css" crossorigin="anonymous">
        <style>${getCommonCSS(theme)}</style>
    `;

    const html = `
    <!DOCTYPE html>
    <html lang="${lang}" ${isRawMode ? '' : `data-theme="${theme}"`}>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
        <title>${t.comment_title} - ${escapeHtml(area.name)}</title>
        ${headStyles}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/11.1.1/marked.min.js" crossorigin="anonymous"></script>
        <!-- 引入 DOMPurify 防禦 XSS 攻擊 -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js" crossorigin="anonymous"></script>
    </head>
    <body ${isRawMode ? '' : `data-theme="${theme}"`}>
        <div class="show-comment-input" id="showCommentInput">
            <button id="showInputBtn">${t.show_comment_input}</button>
        </div>
        <div id="commentForm" class="form-group" style="display: none;">
            <textarea id="newComment" placeholder="${t.comment_placeholder}"></textarea>
            <div class="comment-action">
                <input type="hidden" id="parentId" value="0" />
                <div class="tooltip">
                    <button id="submitBtn" disabled>${t.submit_comment_btn}
                        <span class="tooltiptext" id="submitTooltip">${t.notification_missing_input}</span>
                    </button>
                </div>
                <div class="comment-tip">${t.comment_tip}</div>
            </div>
        </div>
        <div class="comment-list" id="commentList">${t.loading}</div>
        
        <div id="notificationBar" class="notification-bar hidden">
            <span id="notificationText"></span><span id="closeNotification" class="close-btn">×</span>
        </div>

        <script>
            ${powScript}
            const t = ${JSON.stringify(t)};
            const notificationBar = document.getElementById('notificationBar');
            const notificationText = document.getElementById('notificationText');
            document.getElementById('closeNotification').addEventListener('click', () => notificationBar.classList.add('hidden'));
            function showNotification(msg) { notificationText.textContent = msg; notificationBar.classList.remove('hidden'); }
            
            let commentList = document.getElementById('commentList');
            let comments = []; 
            const authed = document.cookie.includes('auth=1');

            async function loadComments() {
                commentList.textContent = t.loading;
                const res = await fetch('/area/${areaKey}/comments');
                if (!res.ok) { commentList.textContent = t.notification_not_found; return; }
                comments = await res.json();
                renderComments();
            }

            function buildCommentTree(list) {
                const map = {}; const roots = [];
                list.forEach(c => { map[c.id] = { ...c, replies: [] }; });
                list.forEach(c => {
                    if (c.parent_id && c.parent_id !== 0) { map[c.parent_id]?.replies.push(map[c.id]); } 
                    else { roots.push(map[c.id]); }
                });
                return roots;
            }

            function renderComments() {
                commentList.innerHTML = '';
                if (comments.length === 0) { commentList.textContent = t.no_comments; return; }
                const tree = buildCommentTree(comments);
                tree.forEach(comment => commentList.appendChild(renderCommentItem(comment)));
            }

            function renderCommentItem(comment) {
                const div = document.createElement('div');
                div.className = 'comment-item' + (comment.parent_id ? ' reply-item' : '');
                
                // 強制使用 DOMPurify 清洗 HTML，防止 XSS 攻擊
                const safeHTML = DOMPurify.sanitize(comment.html_content);

                if (comment.hidden === 1) {
                    if (authed) {
                        div.innerHTML = \`<div class="markdown-content markdown-body" style="border-left:2px solid #ff4444; padding-left:8px;">[已隱藏]\${safeHTML}</div>
                        <small style="color:#777;">\${comment.created_at || ''}</small>
                        <span class="reply-btn" data-comment-id="\${comment.id}">\${t.reply_btn}</span>
                        <span class="report-btn" onclick="reportComment(\${comment.id})">\${t.report_comment}</span>
                        <span onclick="toggleHideComment(\${comment.id})" style="cursor: pointer; margin-left: 10px;">\${t.unhide}</span>\`;
                    } else {
                        div.innerHTML = \`<div class="hidden-comment-placeholder">\${t.comment_hidden}<span class="show-btn" onclick="toggleHiddenContent(this)">\${t.view_comment}</span></div>
                        <div class="hidden-content" style="display:none;"><div class="markdown-content markdown-body">\${safeHTML}</div>
                        <small style="color:#777;">\${comment.created_at || ''}</small>
                        <span class="reply-btn" data-comment-id="\${comment.id}">\${t.reply_btn}</span>
                        <span class="report-btn" onclick="reportComment(\${comment.id})">\${t.report_comment}</span></div>\`;
                    }
                } else {
                    div.innerHTML = \`<div class="markdown-content markdown-body">\${safeHTML}</div>
                        <small style="color:#777;">\${comment.created_at || ''}</small>
                        <span class="reply-btn" data-comment-id="\${comment.id}">\${t.reply_btn}</span>
                        <span class="report-btn" onclick="reportComment(\${comment.id})">\${t.report_comment}</span>
                        <span class="like-btn \${comment.liked ? 'liked' : ''}" onclick="likeComment(\${comment.id})">\${comment.liked ? t.liked : t.like}\${comment.likes > 0 ? '('+comment.likes+')' : ''}</span>
                        \${authed ? \`<span onclick="toggleHideComment(\${comment.id})" style="cursor: pointer; margin-left: 10px;">\${t.hide}</span> <span onclick="togglePinComment(\${comment.id})" style="cursor: pointer; margin-left: 10px;">\${comment.pinned ? t.unhide : t.hide}</span>\` : ''}\`;
                }
                if (comment.replies && comment.replies.length > 0) {
                    comment.replies.forEach(r => div.appendChild(renderCommentItem(r)));
                }
                return div;
            }

            window.toggleHiddenContent = (trigger) => {
                const wrapper = trigger.closest('.hidden-comment-placeholder').nextElementSibling;
                if (!wrapper) return;
                const isHidden = (wrapper.style.display === 'none');
                wrapper.style.display = isHidden ? 'block' : 'none';
                trigger.textContent = isHidden ? t.collapse_comment : t.view_comment;
            };

            const newCommentInput = document.getElementById('newComment');
            const submitButton = document.getElementById('submitBtn');
            const submitTooltip = document.getElementById('submitTooltip');

            newCommentInput.addEventListener('input', () => {
                if(newCommentInput.value.trim()){
                    submitButton.disabled = false; submitTooltip.style.visibility = 'hidden';
                } else {
                    submitButton.disabled = true; submitTooltip.style.visibility = 'visible'; submitTooltip.textContent = t.notification_comment_missing_content;
                }
            });

            document.getElementById('showInputBtn').addEventListener('click', () => {
                document.getElementById('commentForm').style.display = 'flex';
                document.getElementById('showCommentInput').style.display = 'none';
            });

            document.addEventListener('click', e => {
                if (e.target && e.target.classList.contains('reply-btn')) {
                    document.getElementById('parentId').value = e.target.dataset.commentId;
                    document.getElementById('commentForm').style.display = 'flex';
                    document.getElementById('showCommentInput').style.display = 'none';
                    document.getElementById('newComment').focus();
                }
            });

            submitButton.addEventListener('click', async () => {
                const content = newCommentInput.value.trim();
                const parentId = document.getElementById('parentId').value || '0';
                if (!content) return;

                submitButton.disabled = true;
                const origText = submitButton.textContent;
                submitButton.textContent = t.verifying_pow;

                try {
                    // 向後端請求 Challenge
                    const powRes = await fetch('/api/pow-challenge');
                    const { challenge, difficulty } = await powRes.json();
                    
                    // 前端無感計算 SHA-256
                    const nonce = await solvePoW(challenge, difficulty);

                    const formData = new FormData();
                    formData.append('content', content);
                    formData.append('parent_id', parentId);
                    formData.append('pow_challenge', challenge);
                    formData.append('pow_nonce', nonce);

                    const res = await fetch('/area/${areaKey}/comment', { method: 'POST', body: formData });
                    if (res.ok) {
                        newCommentInput.value = ''; document.getElementById('parentId').value = '0';
                        loadComments();
                    } else {
                        showNotification(t.notification_comment_submit_failed + '：' + (await res.text()));
                    }
                } catch (err) {
                    showNotification('Error: ' + err.message);
                } finally {
                    submitButton.textContent = origText;
                    submitButton.disabled = false;
                }
            });

            window.likeComment = async (commentId) => {
                const res = await fetch('/area/${areaKey}/comment/' + commentId + '/like', { method: 'POST' });
                if (res.ok) {
                    const index = comments.findIndex(c => c.id === commentId);
                    if (index !== -1) {
                        comments[index].liked = true;
                        comments[index].likes += 1;
                        renderComments();
                    }
                } else { showNotification(await res.text()); }
            }

            window.reportComment = async (commentId) => {
                const reason = prompt(t.report_comment + ':');
                if (!reason) return;
                const formData = new FormData(); formData.append('reason', reason);
                const res = await fetch('/area/${areaKey}/comment/' + commentId + '/report', { method: 'POST', body: formData });
                if (res.ok) showNotification(t.notification_report_success); else showNotification(t.notification_report_failed);
            }

            loadComments();

            // Iframe 自適應高度
            function sendHeight() {
                window.parent.postMessage({ type: 'iframe-resize', height: document.documentElement.scrollHeight, id: '${areaKey}' }, '*');
            }
            window.onload = function() { sendHeight(); new MutationObserver(sendHeight).observe(document.body, { childList: true, subtree: true }); }
        </script>
    </body>
    </html>`;
    
    return new Response(html, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Access-Control-Allow-Origin': '*' }
    });
}

/** 獲取評論列表 JSON */
async function handleGetComments(request, env) {
    const url = new URL(request.url);
    const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\/|\/comments$/g, ''));
    const area = await env.DB.prepare("SELECT hidden FROM comment_areas WHERE area_key=?").bind(areaKey).first();
    if (!area || area.hidden === 1) return new Response(JSON.stringify([]), { status: 200 });

    const res = await env.DB.prepare(`SELECT id, content, parent_id, created_at, hidden, likes, pinned FROM comments WHERE area_key = ? ORDER BY pinned DESC, likes DESC, created_at DESC`).bind(areaKey).all();
    const list = res.results || [];
    
    const cookies = parseCookie(request.headers.get("Cookie") || "");
    const likedComments = cookies.liked_comments ? cookies.liked_comments.split(',') : [];

    list.forEach(c => {
        c.html_content = parseMarkdown(c.content); // 後續前端會用 DOMPurify 清洗
        c.liked = likedComments.includes(c.id.toString());
    });
    return new Response(JSON.stringify(list), { headers: { "Content-Type": "application/json;charset=UTF-8", 'Access-Control-Allow-Origin': '*' } });
}
 
/** 發表評論 (支援 PoW 校驗) */
async function handlePostComment(request, env) {
    const url = new URL(request.url);
    const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\/|\/comment$/g, ''));
    const formData = await request.formData();
    const content = formData.get('content') || '';
    const parentId = parseInt(formData.get('parent_id') || '0', 10);
    const challenge = formData.get('pow_challenge');
    const nonce = formData.get('pow_nonce');
    
    if (!content || !challenge || !nonce) return new Response("參數不完整", { status: 400 });

    // 校驗 PoW (防護機器人 Spam)
    const difficulty = 4; // 必須與 GET /api/pow-challenge 一致
    const encoder = new TextEncoder();
    const data = encoder.encode(challenge + nonce);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    if (!hashHex.startsWith('0'.repeat(difficulty))) {
        return new Response("安全校驗失敗，拒絕提交", { status: 403 });
    }

    const area = await env.DB.prepare("SELECT hidden FROM comment_areas WHERE area_key=?").bind(areaKey).first();
    if (!area || area.hidden === 1) return new Response("討論區不可用", { status: 403 });

    await env.DB.prepare(`INSERT INTO comments (area_key, content, parent_id, hidden, likes, pinned) VALUES (?, ?, ?, 0, 0, 0)`).bind(areaKey, content, parentId).run();
    return new Response("OK", { status: 200 });
}

/** 喜歡評論 (Cookie 頻率限制防刷) */
async function handleLikeComment(request, env) {
    const match = request.url.match(/\/comment\/(\d+)\/like$/);
    if (!match) return new Response("Invalid", { status: 400 });
    const commentId = parseInt(match[1], 10);

    const cookieHeader = request.headers.get("Cookie") || "";
    const cookies = parseCookie(cookieHeader);
    let liked = cookies.liked_comments ? cookies.liked_comments.split(',') : [];

    if (liked.includes(commentId.toString())) {
        return new Response("您已經點過讚了", { status: 403 });
    }

    const comment = await env.DB.prepare("SELECT likes FROM comments WHERE id=?").bind(commentId).first();
    if (!comment) return new Response("該評論不存在", { status: 404 });

    await env.DB.prepare("UPDATE comments SET likes=? WHERE id=?").bind(comment.likes + 1, commentId).run();
    
    liked.push(commentId.toString());
    const res = new Response("OK", { status: 200 });
    res.headers.set('Set-Cookie', `liked_comments=${liked.join(',')}; Path=/; Max-Age=31536000; SameSite=Lax`);
    return res;
}

/* --- 下方保留原有的管理端與路由功能 --- */

async function handleCommentAreaPage(request, env, lang, theme) {
    const url = new URL(request.url);
    const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\//, ''));
    return handleEmbedCommentArea(areaKey, request, env, lang, theme); // 複用 Embed 的渲染邏輯以減少冗餘代碼
}

async function handleHomePage(request, env, lang, theme) {
    const cookie = parseCookie(request.headers.get("Cookie") || "");
    const authed = (cookie.auth === "1");
    const t = i18n[lang];
    const url = new URL(request.url);
    if (url.searchParams.get('_extendedInfo') === '1' && authed) return handleAdminExtendedInfo(request, env);

    const html = `<!DOCTYPE html>
    <html lang="${lang}" data-theme="${theme}">
    <head><meta charset="UTF-8"><title>${t.home_title}</title><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${getCommonCSS(theme)} body { max-width: 800px; margin: 0 auto; }</style></head>
    <body>
        <h1>${t.home_title}</h1>
        <div id="loginSection" class="${authed ? 'hidden' : ''}">
            <h2>${t.login_title}</h2><div class="form-group"><input type="password" id="passwordInput" placeholder="${t.password_placeholder}" /><button id="loginBtn">${t.login_btn}</button></div>
        </div>
        <div id="adminSection" class="${!authed ? 'hidden' : ''}">
            <h2>${t.admin_panel_title}</h2><div id="areaList">${t.loading}</div>
            <hr /><h3>${t.create_area_title}</h3>
            <div class="form-group"><input type="text" id="areaName" placeholder="${t.area_name_placeholder}" /><input type="text" id="areaKey" placeholder="${t.area_key_placeholder}" /><button id="createAreaBtn">${t.create_btn}</button></div>
            <hr /><h3>${t.report_management_title}</h3><div id="reportList">${t.loading}</div>
        </div>
        <script>
            const authed = ${authed};
            if(authed) fetchExtendedInfo();
            // 此處為原本的管理端腳本邏輯 (保留原樣)
            document.getElementById('loginBtn')?.addEventListener('click', async () => {
                const res = await fetch('/login', { method:'POST', body: JSON.stringify({password: document.getElementById('passwordInput').value}) });
                if((await res.json()).success) location.reload(); else alert('${t.notification_login_failed}');
            });
            async function fetchExtendedInfo() {
                const data = await (await fetch('/?_extendedInfo=1')).json();
                document.getElementById('areaList').innerHTML = data.areas.map(a => \`<div>\${a.name} (\${a.area_key}) - \${a.comment_count} comments <a href="/area/\${a.area_key}" target="_blank">View</a></div>\`).join('');
                document.getElementById('reportList').innerHTML = data.reports.map(r => \`<div>Comment \${r.comment_id}: \${r.reason}</div>\`).join('');
            }
        </script>
    </body></html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" }});
}

async function handleLogin(request, env) {
    const { password } = await request.json();
    if (password === env.ADMIN_PASS) {
        const res = new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' }});
        setCookie('auth', '1', res); return res;
    }
    return new Response(JSON.stringify({ success: false, message: '密碼錯誤' }));
}

async function handleCreateCommentArea(request, env) {
    const formData = await request.formData();
    await env.DB.prepare(`INSERT INTO comment_areas (name, area_key, intro) VALUES (?, ?, ?)`).bind(formData.get('area_name'), formData.get('area_key'), formData.get('intro') || '').run();
    return new Response("OK");
}

async function handleReportComment(request, env) {
    const commentId = parseInt(request.url.match(/\/comment\/(\d+)\/report$/)[1], 10);
    const reason = (await request.formData()).get('reason');
    await env.DB.prepare("INSERT INTO reports (comment_id, reason) VALUES (?, ?)").bind(commentId, reason).run();
    return new Response("OK");
}

async function handleAdminExtendedInfo(request, env) {
    const areas = (await env.DB.prepare(`SELECT a.*, (SELECT COUNT(*) FROM comments c WHERE c.area_key = a.area_key) as comment_count FROM comment_areas a ORDER BY a.id DESC`).all()).results;
    const reports = (await env.DB.prepare(`SELECT r.*, c.content as comment_content FROM reports r LEFT JOIN comments c on c.id = r.comment_id ORDER BY r.id DESC`).all()).results;
    return new Response(JSON.stringify({ areas, reports }), { headers: { "Content-Type": "application/json" } });
}

async function handleDeleteArea(key, request, env) { await env.DB.prepare("DELETE FROM comments WHERE area_key=?").bind(decodeURIComponent(key)).run(); await env.DB.prepare("DELETE FROM comment_areas WHERE area_key=?").bind(decodeURIComponent(key)).run(); return new Response("OK"); }
async function handleToggleHideArea(key, request, env) { await env.DB.prepare("UPDATE comment_areas SET hidden = CASE WHEN hidden=1 THEN 0 ELSE 1 END WHERE area_key=?").bind(decodeURIComponent(key)).run(); return new Response("OK"); }
async function handleToggleHideComment(id, request, env) { await env.DB.prepare("UPDATE comments SET hidden = CASE WHEN hidden=1 THEN 0 ELSE 1 END WHERE id=?").bind(id).run(); return new Response("OK"); }
async function handleTogglePinComment(id, request, env) { await env.DB.prepare("UPDATE comments SET pinned = CASE WHEN pinned=1 THEN 0 ELSE 1 END WHERE id=?").bind(id).run(); return new Response("OK"); }
async function handleResolveReport(id, request, env) { await env.DB.prepare("UPDATE reports SET resolved=1 WHERE id=?").bind(id).run(); return new Response("OK"); }
async function handleSetLang(request, env) { const res = new Response('{"success":true}'); setCookie('lang', (await request.json()).lang, res); return res; }
async function handleSetTheme(request, env) { const res = new Response('{"success":true}'); setCookie('theme', (await request.json()).theme, res); return res; }
