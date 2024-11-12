// comment.js

(function () {
  const commentComponent = document.getElementById('comment-component');

  if (!commentComponent) {
    console.error('Comment component not found');
    return;
  }

  let siteId = commentComponent.dataset.siteId;
  const turnstileSiteKey = commentComponent.dataset.turnstileSitekey;

  if (!turnstileSiteKey) {
    console.error('Turnstile Site Key not provided');
    return;
  }

  const style = document.createElement('style');
  style.textContent = `
/* 评论组件样式 */
#comment-component {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

#comment-component h2 {
  text-align: center;
  color: #000;
}

#comments-list .comment-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.comment-username {
  font-weight: bold;
  color: #000;
}

.comment-content {
  margin-top: 5px;
  color: #333;
}

#comment-form {
  margin-top: 20px;
}

#comment-form input,
#comment-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}

#comment-form button {
  background-color: #808080;
  color: #fff;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
}

#comment-form button:hover {
  background-color: #FF0000;
}

.notification {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #FF0000;
  color: #FFFFFF;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideIn 0.5s;
}

.notification .close-btn {
  position: absolute;
  right: 20px;
  cursor: pointer;
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}

@keyframes slideOut {
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(100%);
  }
}
  `;
  document.head.appendChild(style);

  commentComponent.innerHTML = `
    <h2>评论区</h2>
    <div id="comments-list"></div>
    <div id="comment-form">
      <input type="text" id="username" placeholder="用户名（可选）">
      <textarea id="comment-content" placeholder="请输入您的评论"></textarea>
      <div class="cf-turnstile" data-sitekey="${turnstileSiteKey}"></div>
      <button id="submit-comment">提交评论</button>
    </div>
    <div id="apply-code" style="display: none;">
      <button id="apply-code-button">申请代号</button>
    </div>
    <div id="notification" class="notification" style="display: none;">
      <span id="notification-message"></span>
      <span id="notification-close" class="close-btn">&times;</span>
    </div>
  `;

  const turnstileScript = document.createElement('script');
  turnstileScript.src =
    'https://challenges.cloudflare.com/turnstile/v0/api.js';
  turnstileScript.async = true;
  document.head.appendChild(turnstileScript);

  function initCommentComponent() {
    const commentsList = commentComponent.querySelector('#comments-list');
    const usernameInput = commentComponent.querySelector('#username');
    const contentInput = commentComponent.querySelector('#comment-content');
    const submitButton = commentComponent.querySelector('#submit-comment');
    const notification = commentComponent.querySelector('#notification');
    const notificationMessage = commentComponent.querySelector('#notification-message');
    const notificationClose = commentComponent.querySelector('#notification-close');
    const applyCodeButton = commentComponent.querySelector('#apply-code-button');
    const applyCodeSection = commentComponent.querySelector('#apply-code');

    function loadComments() {
      if (!siteId) return;
      fetch(`/api/comments/${siteId}`)
        .then((response) => response.json())
        .then((data) => {
          commentsList.innerHTML = '';
          data.forEach((comment) => {
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
        .catch((error) => {
          showNotification('加载评论失败');
        });
    }

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
        turnstile_token: turnstileToken,
      };

      fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            contentInput.value = '';
            turnstile.reset();
            loadComments();
          } else {
            return response.json().then((data) => {
              throw new Error(data.message || '提交评论失败');
            });
          }
        })
        .catch((error) => {
          showNotification(error.message);
        });
    }

    function showNotification(message) {
      notificationMessage.textContent = message;
      notification.style.display = 'flex';
    }

    function hideNotification() {
      notification.style.animation = 'slideOut 0.5s forwards';
      setTimeout(() => {
        notification.style.display = 'none';
        notification.style.animation = '';
      }, 500);
    }

    function applyCode() {
      const turnstileTokenElement = commentComponent.querySelector('[name="cf-turnstile-response"]');

      if (!turnstileTokenElement || !turnstileTokenElement.value) {
        showNotification('请完成验证');
        return;
      }

      const turnstileToken = turnstileTokenElement.value;
      const url = window.location.origin;

      const data = {
        turnstile_token: turnstileToken,
        url: url,
      };

      fetch('/api/apply-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.site_id) {
            siteId = data.site_id;
            commentComponent.dataset.siteId = siteId;
            applyCodeSection.style.display = 'none';
            loadComments();
          } else {
            throw new Error(data.message || '申请代号失败');
          }
        })
        .catch((error) => {
          showNotification(error.message);
        });
    }

    submitButton.addEventListener('click', submitComment);
    notificationClose.addEventListener('click', hideNotification);
    applyCodeButton.addEventListener('click', applyCode);

    if (siteId) {
      loadComments();
    } else {
      applyCodeSection.style.display = 'block';
    }
  }

  window.onload = function () {
    initCommentComponent();
  };
})();
