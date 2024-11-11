// index.js

export default {
    async fetch(request, env, ctx) {
      return handleRequest(request, env);
    },
  };
  
  async function handleRequest(request, env) {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: getCorsHeaders(),
      });
    }
  
    const url = new URL(request.url);
    const { pathname } = url;
  
    // 路由请求
    if (pathname.startsWith('/api/')) {
      return handleApiRequest(request, env);
    } else if (pathname === '/comment.js') {
      return handleCommentJs(request, env);
    } else {
      return new Response('Not found', { status: 404 });
    }
  }
  
  function getCorsHeaders() {
    return {
      'Access-Control-Allow-Origin': '*', // 根据需要调整
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
  }
  
  async function handleApiRequest(request, env) {
    const url = new URL(request.url);
    const apiPath = url.pathname.slice(5); // 去除 '/api/'
  
    const method = request.method.toUpperCase();
  
    if (apiPath === 'auth' && method === 'POST') {
      return handleAuth(request, env);
    } else if (apiPath === 'sites' && method === 'POST') {
      return handleCreateSite(request, env);
    } else if (apiPath === 'sites' && method === 'GET') {
      return handleGetSites(request, env);
    } else if (apiPath.startsWith('sites/') && method === 'DELETE') {
      const siteId = apiPath.slice(6);
      return handleDeleteSite(request, env, siteId);
    } else if (apiPath === 'comments' && method === 'POST') {
      return handleSubmitComment(request, env);
    } else if (apiPath.startsWith('comments/') && method === 'GET') {
      const siteId = apiPath.slice(9);
      return handleGetComments(request, env, siteId);
    } else if (apiPath.startsWith('comments/') && method === 'DELETE') {
      const commentId = apiPath.slice(9);
      return handleDeleteComment(request, env, commentId);
    } else {
      return new Response('Not found', { status: 404 });
    }
  }
  
  async function handleAuth(request, env) {
    try {
      const data = await request.json();
      const password = data.password;
  
      if (password === env.ADMIN_PASSWORD) {
        const token = await generateToken(env);
        return new Response(JSON.stringify({ token }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(),
          },
        });
      } else {
        return new Response(JSON.stringify({ message: '密码错误' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(),
          },
        });
      }
    } catch (err) {
      return new Response(JSON.stringify({ message: '请求无效' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  }
  
  async function generateToken(env) {
    const token = cryptoRandomString(32);
    await env.SESSIONS.put(token, 'valid', { expirationTtl: 30 * 24 * 60 * 60 }); // 30天
    return token;
  }
  
  function cryptoRandomString(length) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => ('0' + byte.toString(16)).slice(-2)).join('');
  }
  
  async function verifyToken(request, env) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) return false;
    const token = authHeader.split(' ')[1];
    if (!token) return false;
    const valid = await env.SESSIONS.get(token);
    return valid === 'valid';
  }
  
  async function handleCreateSite(request, env) {
    const isAuthenticated = await verifyToken(request, env);
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: '未授权' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  
    try {
      const data = await request.json();
      const { id, url, turnstile_site_key } = data;
  
      if (!id || !url || !turnstile_site_key) {
        return new Response(JSON.stringify({ message: '参数缺失' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(),
          },
        });
      }
  
      const stmt = env.DB.prepare('INSERT INTO sites (id, url, turnstile_site_key) VALUES (?, ?, ?)');
      await stmt.bind(id, url, turnstile_site_key).run();
  
      return new Response(JSON.stringify({ message: '站点创建成功' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ message: '创建站点时出错' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  }
  
  async function handleGetSites(request, env) {
    const isAuthenticated = await verifyToken(request, env);
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: '未授权' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  
    try {
      const stmt = env.DB.prepare('SELECT id, url, turnstile_site_key FROM sites');
      const result = await stmt.all();
  
      return new Response(JSON.stringify(result.results), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ message: '获取站点列表时出错' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  }
  
  async function handleDeleteSite(request, env, siteId) {
    const isAuthenticated = await verifyToken(request, env);
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: '未授权' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  
    try {
      let stmt = env.DB.prepare('DELETE FROM sites WHERE id = ?');
      await stmt.bind(siteId).run();
  
      stmt = env.DB.prepare('DELETE FROM comments WHERE site_id = ?');
      await stmt.bind(siteId).run();
  
      return new Response(JSON.stringify({ message: '站点已删除' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ message: '删除站点时出错' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  }
  
  async function handleSubmitComment(request, env) {
    try {
      const data = await request.json();
      const { site_id, username, content, turnstile_token } = data;
  
      if (!site_id || !content || !turnstile_token) {
        return new Response(JSON.stringify({ message: '参数缺失' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(),
          },
        });
      }
  
      const turnstileValid = await verifyTurnstileToken(turnstile_token, request.headers.get('CF-Connecting-IP'), env);
      if (!turnstileValid) {
        return new Response(JSON.stringify({ message: '验证失败' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(),
          },
        });
      }
  
      let stmt = env.DB.prepare('SELECT * FROM sites WHERE id = ?');
      const site = await stmt.bind(site_id).first();
      if (!site) {
        return new Response(JSON.stringify({ message: '站点不存在' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(),
          },
        });
      }
  
      const user_ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const user_id = await hashUserId(user_ip);
  
      const username_final = username || user_id;
  
      stmt = env.DB.prepare('INSERT INTO comments (site_id, user_id, username, content) VALUES (?, ?, ?, ?)');
      await stmt.bind(site_id, user_id, username_final, content).run();
  
      return new Response(JSON.stringify({ message: '评论提交成功' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
  
    } catch (err) {
      return new Response(JSON.stringify({ message: '提交评论时出错' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  }
  
  async function verifyTurnstileToken(token, ip, env) {
    const formData = new URLSearchParams();
    formData.append('secret', env.TURNSTILE_SECRET_KEY);
    formData.append('response', token);
    if (ip) {
      formData.append('remoteip', ip);
    }
  
    const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
  
    const outcome = await resp.json();
  
    return outcome.success;
  }
  
  async function hashUserId(input) {
    const msgUint8 = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.slice(0, 8);
  }
  
  async function handleGetComments(request, env, siteId) {
    let stmt = env.DB.prepare('SELECT * FROM sites WHERE id = ?');
    const site = await stmt.bind(siteId).first();
    if (!site) {
      return new Response(JSON.stringify({ message: '站点不存在' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  
    try {
      stmt = env.DB.prepare('SELECT username, content, created_at FROM comments WHERE site_id = ? ORDER BY created_at DESC');
      const result = await stmt.bind(siteId).all();
  
      return new Response(JSON.stringify(result.results), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ message: '获取评论时出错' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  }
  
  async function handleDeleteComment(request, env, commentId) {
    const isAuthenticated = await verifyToken(request, env);
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: '未授权' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  
    try {
      const stmt = env.DB.prepare('DELETE FROM comments WHERE id = ?');
      await stmt.bind(commentId).run();
  
      return new Response(JSON.stringify({ message: '评论已删除' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ message: '删除评论时出错' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }
  }
  
  async function handleCommentJs(request, env) {
    const jsContent = `
    // 内容请参阅下面的更新后的 comment.js 文件
    `;
  
    return new Response(jsContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
      },
    });
  }  