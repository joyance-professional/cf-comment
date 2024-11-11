// comment.js

(function() {
    // 获取评论组件元素
    const commentComponent = document.getElementById('comment-component');

    if (!commentComponent) {
        console.error('Comment component not found');
        return;
    }

    const siteId = commentComponent.dataset.siteId;
    const turnstileSiteKey = commentComponent.dataset.turnstileSitekey;

    if (!siteId || !turnstileSiteKey) {
        console.error('Site ID or Turnstile Site Key not provided');
        return;
    }

    // 注入样式
    const style = document.createElement('style');
    style.textContent = `
    /* 在这里添加 comment/style.css 的内容 */
    `;
    document.head.appendChild(style);

    // 构建评论组件的 HTML
    commentComponent.innerHTML = `
        <h2>评论区</h2>
        <!-- 评论列表 -->
        <div id="comments-list">
            <!-- 动态加载评论 -->
        </div>
        <!-- 评论表单 -->
        <div id="comment-form">
            <input type="text" id="username" placeholder="用户名（可选）">
            <textarea id="comment-content" placeholder="请输入您的评论"></textarea>
            <!-- Turnstile 验证 -->
            <div class="cf-turnstile" data-sitekey="${turnstileSiteKey}"></div>
            <button id="submit-comment">提交评论</button>
        </div>
        <!-- 通知栏 -->
        <div id="notification" class="notification" style="display: none;">
            <span id="notification-message"></span>
            <span id="notification-close" class="close-btn">&times;</span>
        </div>
    `;

    // 加载 Turnstile 脚本
    const turnstileScript = document.createElement('script');
    turnstileScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    turnstileScript.async = true;
    document.head.appendChild(turnstileScript);

    // 处理评论逻辑
    function initCommentComponent() {
        const commentsList = commentComponent.querySelector('#comments-list');
        const usernameInput = commentComponent.querySelector('#username');
        const contentInput = commentComponent.querySelector('#comment-content');
        const submitButton = commentComponent.querySelector('#submit-comment');
        const notification = commentComponent.querySelector('#notification');
        const notificationMessage = commentComponent.querySelector('#notification-message');
        const notificationClose = commentComponent.querySelector('#notification-close');

        // 加载评论列表
        function loadComments() {
            fetch(`/api/comments/${siteId}`)
                .then(response => response.json())
                .then(data => {
                    commentsList.innerHTML = '';
                    data.forEach(comment => {
                        const commentItem = document.createElement('div');
                        commentItem.classList.add('comment-item');

                        const username = document.createElement('div');
                        username.classList.add('comment-username');
                        username.textContent = comment.username;

                        const content = document.createElement('div');
                        content.classList.add('comment-content');
                        content.textContent = comment.content;

                        commentItem.appendChild(username);
                        commentItem.appendChild(content);

                        commentsList.appendChild(commentItem);
                    });
                })
                .catch(error => {
                    showNotification('加载评论失败');
                });
        }

        // 提交评论
        function submitComment() {
            const usernameValue = usernameInput.value.trim();
            const contentValue = contentInput.value.trim();
            const turnstileTokenElement = commentComponent.querySelector('[name="cf-turnstile-response"]');

            if (!contentValue) {
                showNotification('评论内容不能为空');
                return;
            }

            if (!turnstileTokenElement || !turnstileTokenElement.value) {
                showNotification('请完成验证');
                return;
            }

            const turnstileToken = turnstileTokenElement.value;

            const data = {
                site_id: siteId,
                username: usernameValue,
                content: contentValue,
                turnstile_token: turnstileToken
            };

            fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    // 清空输入框
                    contentInput.value = '';
                    // 重置 Turnstile
                    turnstile.reset();
                    // 重新加载评论
                    loadComments();
                } else {
                    return response.json().then(data => { throw new Error(data.message || '提交评论失败'); });
                }
            })
            .catch(error => {
                showNotification(error.message);
            });
        }

        // 显示通知
        function showNotification(message) {
            notificationMessage.textContent = message;
            notification.style.display = 'flex';
        }

        // 隐藏通知
        function hideNotification() {
            notification.style.animation = 'slideOut 0.5s forwards';
            setTimeout(() => {
                notification.style.display = 'none';
                notification.style.animation = '';
            }, 500);
        }

        // 事件绑定
        submitButton.addEventListener('click', submitComment);
        notificationClose.addEventListener('click', hideNotification);

        // 初始化加载评论
        loadComments();
    }

    // 等待 Turnstile 脚本加载完成后初始化
    window.onload = function() {
        initCommentComponent();
    };

})();