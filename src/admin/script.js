// script.js

document.addEventListener('DOMContentLoaded', function () {

    // 检查登录状态
    if (getCookie('authToken')) {
        showAdminPanel();
    } else {
        showLoginForm();
    }

    // 登录按钮事件
    document.getElementById('login-button').addEventListener('click', function () {
        const password = document.getElementById('password').value;
        login(password);
    });

    // 创建站点按钮事件
    document.getElementById('create-site-button').addEventListener('click', function () {
        const code = document.getElementById('site-code').value;
        const url = document.getElementById('site-url').value;
        const turnstileSiteKey = document.getElementById('turnstile-site-key').value;
        createSite(code, url, turnstileSiteKey);
    });

    // 通知栏关闭按钮
    document.getElementById('notification-close').addEventListener('click', function () {
        hideNotification();
    });

});

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
}

function showAdminPanel() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadSites();
}

function login(password) {
    fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('密码错误');
        }
    })
    .then(data => {
        setCookie('authToken', data.token, 30); // 保存30天
        showAdminPanel();
    })
    .catch(error => {
        showNotification(error.message);
    });
}

function createSite(code, url, turnstileSiteKey) {
    const token = getCookie('authToken');
    fetch('/api/sites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: code, url: url, turnstile_site_key: turnstileSiteKey })
    })
    .then(response => {
        if (response.ok) {
            showNotification('站点创建成功');
            loadSites();
        } else {
            return response.json().then(data => { throw new Error(data.message || '创建失败'); });
        }
    })
    .catch(error => {
        showNotification(error.message);
    });
}

function loadSites() {
    const token = getCookie('authToken');
    fetch('/api/sites', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('site-table-body');
        tbody.innerHTML = '';
        data.forEach(site => {
            const tr = document.createElement('tr');

            const codeTd = document.createElement('td');
            codeTd.textContent = site.id;
            tr.appendChild(codeTd);

            const urlTd = document.createElement('td');
            urlTd.textContent = site.url;
            tr.appendChild(urlTd);

            const actionTd = document.createElement('td');

            // 获取嵌入代码按钮
            const embedButton = document.createElement('button');
            embedButton.textContent = '获取嵌入代码';
            embedButton.addEventListener('click', function () {
                getEmbedCode(site);
            });
            actionTd.appendChild(embedButton);

            // 删除按钮
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', function () {
                confirmDeleteSite(site.id, deleteButton);
            });
            actionTd.appendChild(deleteButton);

            tr.appendChild(actionTd);
            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        showNotification('加载站点失败');
    });
}

function confirmDeleteSite(siteId, button) {
    if (!button.classList.contains('confirm')) {
        button.classList.add('confirm');
        button.textContent = '确认删除';
        setTimeout(() => {
            button.classList.remove('confirm');
            button.textContent = '删除';
        }, 3000); // 3秒后恢复
    } else {
        deleteSite(siteId);
    }
}

function deleteSite(siteId) {
    const token = getCookie('authToken');
    fetch(`/api/sites/${siteId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('站点已删除');
            loadSites();
        } else {
            throw new Error('删除失败');
        }
    })
    .catch(error => {
        showNotification(error.message);
    });
}

function getEmbedCode(site) {
    const embedCode = `<div id="comment-component" data-site-id="${site.id}" data-turnstile-sitekey="${site.turnstile_site_key}"></div>
<script src="${window.location.origin}/comment.js" defer></script>`;
    // 显示嵌入代码
    prompt('嵌入代码：', embedCode);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    document.getElementById('notification-message').textContent = message;
    notification.style.display = 'flex';
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.animation = 'slideOut 0.5s forwards';
    setTimeout(() => {
        notification.style.display = 'none';
        notification.style.animation = '';
    }, 500);
}

// Cookie 操作
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days*864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '');
}