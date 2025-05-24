#!/usr/bin/env node

/**
 * 简单的 MCP HTTP 服务器测试客户端
 * 用于验证服务器基本功能
 */

const BASE_URL = 'http://localhost:3000';

async function makeRequest(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    },
    ...options
  });

  const text = await response.text();
  
  try {
    return {
      status: response.status,
      data: JSON.parse(text),
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch {
    return {
      status: response.status,
      data: text,
      headers: Object.fromEntries(response.headers.entries())
    };
  }
}

async function testBasicEndpoints() {
  console.log('🧪 测试基本端点...\n');

  // 测试状态端点
  console.log('1. 测试状态端点:');
  try {
    const result = await makeRequest('/');
    console.log('✅ 状态端点正常');
    console.log('📄 响应:', JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.log('❌ 状态端点失败:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // 测试健康检查
  console.log('2. 测试健康检查:');
  try {
    const result = await makeRequest('/health');
    console.log('✅ 健康检查正常');
    console.log('📄 响应:', JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.log('❌ 健康检查失败:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');
}

async function testMCPProtocol() {
  console.log('🔗 测试 MCP 协议...\n');

  // 步骤 1: 初始化连接
  console.log('1. 初始化 MCP 连接:');
  let sessionId = null;

  try {
    const initRequest = {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {},
          resources: {}
        },
        clientInfo: {
          name: "test-client",
          version: "1.0.0"
        }
      }
    };

    const result = await makeRequest('/mcp', {
      method: 'POST',
      body: JSON.stringify(initRequest)
    });

    console.log('✅ 初始化成功');
    console.log('📄 状态码:', result.status);
    
    // 获取会话ID
    sessionId = result.headers['mcp-session-id'];
    if (sessionId) {
      console.log('🔑 会话ID:', sessionId);
    }
    
    console.log('📄 响应:', JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.log('❌ 初始化失败:', error.message);
    return;
  }

  if (!sessionId) {
    console.log('❌ 未获取到会话ID，无法继续测试');
    return;
  }

  console.log('\n' + '-'.repeat(30) + '\n');

  // 步骤 2: 列出工具
  console.log('2. 列出可用工具:');
  try {
    const listToolsRequest = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list"
    };

    const result = await makeRequest('/mcp', {
      method: 'POST',
      headers: {
        'mcp-session-id': sessionId
      },
      body: JSON.stringify(listToolsRequest)
    });

    console.log('✅ 工具列表获取成功');
    console.log('📄 响应:', JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.log('❌ 获取工具列表失败:', error.message);
  }

  console.log('\n' + '-'.repeat(30) + '\n');

  // 步骤 3: 调用工具
  console.log('3. 调用 add 工具:');
  try {
    const callToolRequest = {
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "add",
        arguments: {
          a: 10,
          b: 25
        }
      }
    };

    const result = await makeRequest('/mcp', {
      method: 'POST',
      headers: {
        'mcp-session-id': sessionId
      },
      body: JSON.stringify(callToolRequest)
    });

    console.log('✅ 工具调用成功');
    console.log('📄 响应:', JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.log('❌ 工具调用失败:', error.message);
  }

  console.log('\n' + '-'.repeat(30) + '\n');

  // 步骤 4: 列出资源
  console.log('4. 列出可用资源:');
  try {
    const listResourcesRequest = {
      jsonrpc: "2.0",
      id: 4,
      method: "resources/list"
    };

    const result = await makeRequest('/mcp', {
      method: 'POST',
      headers: {
        'mcp-session-id': sessionId
      },
      body: JSON.stringify(listResourcesRequest)
    });

    console.log('✅ 资源列表获取成功');
    console.log('📄 响应:', JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.log('❌ 获取资源列表失败:', error.message);
  }

  console.log('\n' + '-'.repeat(30) + '\n');

  // 步骤 5: 读取资源
  console.log('5. 读取服务器信息资源:');
  try {
    const readResourceRequest = {
      jsonrpc: "2.0",
      id: 5,
      method: "resources/read",
      params: {
        uri: "server://info"
      }
    };

    const result = await makeRequest('/mcp', {
      method: 'POST',
      headers: {
        'mcp-session-id': sessionId
      },
      body: JSON.stringify(readResourceRequest)
    });

    console.log('✅ 资源读取成功');
    console.log('📄 响应:', JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.log('❌ 资源读取失败:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');
}

async function main() {
  console.log('🚀 MCP HTTP 服务器测试客户端\n');
  console.log('📡 服务器地址:', BASE_URL);
  console.log('⏰ 测试时间:', new Date().toLocaleString());
  console.log('\n' + '='.repeat(50) + '\n');

  try {
    await testBasicEndpoints();
    await testMCPProtocol();
    
    console.log('🎉 所有测试完成!');
  } catch (error) {
    console.error('💥 测试过程中发生错误:', error);
  }
}

// 运行测试
if (typeof window === 'undefined') {
  // Node.js 环境
  if (!globalThis.fetch) {
    import('node-fetch').then(({ default: fetch }) => {
      globalThis.fetch = fetch;
      main();
    });
  } else {
    main();
  }
} else {
  // 浏览器环境
  main();
} 